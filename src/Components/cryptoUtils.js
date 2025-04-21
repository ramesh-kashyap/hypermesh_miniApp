import CryptoJS from "crypto-js";


const secretKey = "Rameshk"; // Use the same key in both projects

export const encryptID = (id) => {
    const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
    return CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);
};