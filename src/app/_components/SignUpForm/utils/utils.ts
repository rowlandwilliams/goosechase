/**
 * Checks password is
 * 1. Minimum of 8 char
 * 2. Contains one uppercase letter
 * 3. Contains one lowercase letter
 * 4. Contains one number
 */
export const validatePassword = (password: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
