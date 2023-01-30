import AES256 from 'aes-everywhere'

export const decrypt = (value, passphrase) => {
  return AES256.decrypt(value, passphrase)
}

export const encrypt = (value, passphrase) => {
  return AES256.encrypt(value, passphrase)
}
