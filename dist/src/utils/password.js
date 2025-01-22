"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = exports.decryptPassword = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_js_1 = __importDefault(require("crypto-js"));
dotenv_1.default.config();
const ENCRYPTIONKEY = process.env.ENCRYPTION_KEY || "vrda1!application.password";
/**
 * @function
 * @name decryptPassword
 * @param {string} encryptedPassword
 * @returns {string}
 * @description Simple function to decrypt the encrypted password.
 */
const decryptPassword = (encryptedPassword) => {
    try {
        const decryptedPasswordBytes = crypto_js_1.default.AES.decrypt(encryptedPassword, ENCRYPTIONKEY);
        const decryptedPassword = decryptedPasswordBytes.toString(crypto_js_1.default.enc.Utf8);
        // If decryption fails, decryptedPassword will be an empty string
        if (!decryptedPassword) {
            throw new Error("Decryption failed");
        }
        return decryptedPassword;
    }
    catch (error) {
        throw new Error("Invalid encrypted password");
    }
};
exports.decryptPassword = decryptPassword;
/**
 * @function
 * @name encryptPassword
 * @param {string} password
 * @returns {string}
 * @description Simple function to encrypt a password.
 */
const encryptPassword = (password) => {
    const encryptedPassword = crypto_js_1.default.AES.encrypt(password, ENCRYPTIONKEY).toString();
    return encryptedPassword;
};
exports.encryptPassword = encryptPassword;
