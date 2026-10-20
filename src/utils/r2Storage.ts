import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export interface R2Config {
  accountId: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicDomain: string;
}

export const DEFAULT_R2_CONFIG: R2Config = {
  accountId: import.meta.env.VITE_R2_ACCOUNT_ID || '',
  bucketName: import.meta.env.VITE_R2_BUCKET_NAME || '',
  accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || '',
  secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '',
  publicDomain: import.meta.env.VITE_R2_PUBLIC_DOMAIN || '',
};

// Retrieve config from localStorage (with fallback to env variables)
export const getR2Config = (): R2Config => {
  const config: R2Config = { ...DEFAULT_R2_CONFIG };
  try {
    const saved = localStorage.getItem('tokkii_r2_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.accountId?.trim()) config.accountId = parsed.accountId.trim();
      if (parsed.bucketName?.trim()) config.bucketName = parsed.bucketName.trim();
      if (parsed.accessKeyId?.trim()) config.accessKeyId = parsed.accessKeyId.trim();
      if (parsed.secretAccessKey?.trim()) config.secretAccessKey = parsed.secretAccessKey.trim();
      if (parsed.publicDomain?.trim()) config.publicDomain = parsed.publicDomain.trim();
    }
  } catch (e) {
    console.error('Error loading R2 config:', e);
  }
  return config;
};

export const saveR2Config = (config: R2Config) => {
  try {
    localStorage.setItem('tokkii_r2_config', JSON.stringify(config));
  } catch (e) {
    console.error('Error saving R2 config:', e);
  }
};

export const createR2Client = (config: R2Config = getR2Config()): S3Client => {
  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey) {
    throw new Error('Credenciales de Cloudflare R2 no configuradas. Configura tus variables .env o ajustes.');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
};

/**
 * Uploads a file to Cloudflare R2 and returns its public URL.
 */
export const uploadImageToR2 = async (
  file: File,
  folder: string = 'cards',
  config: R2Config = getR2Config()
): Promise<string> => {
  const s3 = createR2Client(config);

  // Generate clean filename
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueKey = `${folder}/${Date.now()}_${cleanName}`;

  const arrayBuffer = await file.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: uniqueKey,
    Body: new Uint8Array(arrayBuffer),
    ContentType: file.type || 'image/png',
  });

  await s3.send(command);

  // Normalize public domain base (strip trailing slash)
  const baseDomain = config.publicDomain.replace(/\/+$/, '');
  return `${baseDomain}/${uniqueKey}`;
};

/**
 * Uploads a pre-rendered card PNG to Cloudflare R2 with a deterministic filename based on cardNumber.
 * This ensures updating a card cleanly overwrites the previous rendered image without duplicate files.
 */
export const uploadRenderedCardToR2 = async (
  cardNumber: string,
  dataUrl: string,
  config: R2Config = getR2Config()
): Promise<string> => {
  const s3 = createR2Client(config);
  const cleanDigits = String(cardNumber || '1').replace(/\D/g, '') || '1';
  const numStr = cleanDigits.padStart(3, '0');
  const uniqueKey = `cartas_renderizadas/carta_${numStr}.png`;

  // Convert base64 dataUrl directly to Uint8Array safely without network fetch
  const base64Index = dataUrl.indexOf(',');
  const base64 = base64Index !== -1 ? dataUrl.slice(base64Index + 1) : dataUrl;
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: uniqueKey,
    Body: bytes,
    ContentType: 'image/png',
    CacheControl: 'no-cache, no-store, must-revalidate',
  });

  await s3.send(command);

  const baseDomain = config.publicDomain.replace(/\/+$/, '');
  return `${baseDomain}/${uniqueKey}`;
};
