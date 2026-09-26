import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export interface R2Config {
  accountId: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicDomain: string;
}

export const DEFAULT_R2_CONFIG: R2Config = {
  accountId: '9464150f1460753b2fea2697cd7c71f1',
  bucketName: 'imagenes-web',
  accessKeyId: '13e89e9e0cc4aeed6e61792c4064df72',
  secretAccessKey: 'f29e63ae3c1a56ea9ced45d21deb639d1ed8e4ae5f7acfdfcc5b3017fce74612',
  publicDomain: 'https://pub-0bf9a87cec964ff49bfd058873c948c3.r2.dev',
};

// Retrieve config from localStorage or fallback to default
export const getR2Config = (): R2Config => {
  try {
    const saved = localStorage.getItem('tokkii_r2_config');
    if (saved) {
      return { ...DEFAULT_R2_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading R2 config:', e);
  }
  return DEFAULT_R2_CONFIG;
};

export const saveR2Config = (config: R2Config) => {
  try {
    localStorage.setItem('tokkii_r2_config', JSON.stringify(config));
  } catch (e) {
    console.error('Error saving R2 config:', e);
  }
};

export const createR2Client = (config: R2Config = getR2Config()): S3Client => {
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
