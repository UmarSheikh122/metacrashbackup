let CryptoJS = require("crypto-js");
export const EncryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_ENCRYPTIONKEY).toString();
};

export const DecryptData = (data) => {
    let bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPTIONKEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
