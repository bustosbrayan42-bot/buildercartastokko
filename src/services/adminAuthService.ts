import { supabaseAuth } from '../utils/authSupabaseClient';

export interface AdminUser {
  id: string;
  email: string;
  role?: string;
}

/**
 * Check if an email is in the authorized_admins whitelist table
 */
export const isEmailAuthorized = async (email: string): Promise<boolean> => {
  if (!email) return false;
  try {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabaseAuth
      .from('authorized_admins')
      .select('email')
      .ilike('email', cleanEmail)
      .maybeSingle();

    if (error) {
      console.warn('Error checking authorized_admins table:', error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error('Failed to check admin authorization:', err);
    return false;
  }
};

/**
 * Sign in admin with Email & Password
 */
export const signInAdminWithPassword = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check if authorized in SQL table FIRST
  const isAuthorized = await isEmailAuthorized(cleanEmail);
  if (!isAuthorized) {
    return {
      success: false,
      error: `El correo "${cleanEmail}" no está autorizado en la tabla de administradores (authorized_admins).`,
    };
  }

  // 2. Sign in with Supabase Auth
  const signInRes = await supabaseAuth.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  let user = signInRes.data.user;
  let authError = signInRes.error;

  // If user doesn't exist yet in auth.users, try auto-signing them up since they are pre-authorized in the whitelist!
  if (authError && (authError.message.includes('Invalid login credentials') || authError.message.includes('User not found'))) {
    const signUpRes = await supabaseAuth.auth.signUp({
      email: cleanEmail,
      password,
    });

    if (signUpRes.error) {
      return {
        success: false,
        error: 'Contraseña incorrecta o error al autenticar. Por favor verifica tus credenciales.',
      };
    }

    user = signUpRes.data.user;
    authError = null;
  }

  if (authError || !user) {
    return {
      success: false,
      error: authError?.message || 'Error al iniciar sesión.',
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email || cleanEmail,
    },
  };
};

/**
 * Sign in with Magic Link / OTP Email
 */
export const sendAdminMagicLink = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  const isAuthorized = await isEmailAuthorized(cleanEmail);
  if (!isAuthorized) {
    return {
      success: false,
      error: `El correo "${cleanEmail}" no está autorizado en la tabla authorized_admins.`,
    };
  }

  const { error } = await supabaseAuth.auth.signInWithOtp({
    email: cleanEmail,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};

/**
 * Sign out admin
 */
export const signOutAdmin = async (): Promise<void> => {
  await supabaseAuth.auth.signOut();
  localStorage.removeItem('tokkii_admin_session');
};

/**
 * Check current logged in admin session
 */
export const getCurrentAdmin = async (): Promise<AdminUser | null> => {
  try {
    const { data } = await supabaseAuth.auth.getSession();
    if (!data.session?.user?.email) return null;

    const email = data.session.user.email.toLowerCase();
    const isAuth = await isEmailAuthorized(email);
    if (!isAuth) {
      await signOutAdmin();
      return null;
    }

    return {
      id: data.session.user.id,
      email: email,
    };
  } catch {
    return null;
  }
};
