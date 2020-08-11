const crypto = require('crypto');

function generateSalt() {
  let salt = crypto.randomBytes(16).toString('base64');
  return salt;
}

function encryptPassword(plainText, salt) {
  let encryptPassword = crypto.createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
  return encryptPassword;
}

module.exports.generateSalt = generateSalt;
module.exports.encryptPassword = encryptPassword;
