import { randomBytes, createHash } from 'crypto';

export function generateSalt() {
  let salt = randomBytes(16).toString('base64');
  return salt;
}

export function encryptPassword(plainText, salt) {
  let encryptPassword = createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
  return encryptPassword;
}

