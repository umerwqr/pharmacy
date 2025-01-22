/**
 * File:    password.ts
 *
 * Author1:  Muhammad Ali Sipra
 * Date:     Feb 2024
 * Partner:  I worked alone
 * Course:   Vrda1
 *
 * Summary of File:
 *
 * This file contains code relating to encrypting and decrypting passwords. It uses the crypto-js library for both processes.
 *
 */

import dotenv from "dotenv";
import CryptoJS from "crypto-js";
dotenv.config();

const ENCRYPTIONKEY =
  process.env.ENCRYPTION_KEY || "vrda1!application.password";

/**
 * @function
 * @name decryptPassword
 * @param {string} encryptedPassword
 * @returns {string}
 * @description Simple function to decrypt the encrypted password.
 */
const decryptPassword = (encryptedPassword: string): string => {
  try {
    const decryptedPasswordBytes = CryptoJS.AES.decrypt(
      encryptedPassword,
      ENCRYPTIONKEY
    );
    const decryptedPassword = decryptedPasswordBytes.toString(
      CryptoJS.enc.Utf8
    );

    // If decryption fails, decryptedPassword will be an empty string
    if (!decryptedPassword) {
      throw new Error("Decryption failed");
    }

    return decryptedPassword;
  } catch (error) {
    throw new Error("Invalid encrypted password");
  }
};

/**
 * @function
 * @name encryptPassword
 * @param {string} password
 * @returns {string}
 * @description Simple function to encrypt a password.
 */
const encryptPassword = (password: string): string => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    ENCRYPTIONKEY
  ).toString();
  return encryptedPassword;
};

export { decryptPassword, encryptPassword };
