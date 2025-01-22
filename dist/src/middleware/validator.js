"use strict";
/**
 * File:    Validator.ts
 *
 * Author1:  Muhammad Umer Waqar
 * Date:     Dec 2023
 * Partner:  I worked alone
 * Course:   Vrda1
 *
 * Summary of File:
 *
 *   This file contains code relating to parameter validations for the api using express validator package. it validates value with string and
 *   number type. it also validates username and password.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../utils/password");
const { check, body } = require("express-validator");
/**
 * @function
 * @name validateSingleStringParams
 * @param {string} param
 * @returns {}
 * @description this function validates input string value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and should match the Regex value and it can be a single word. Spaces are not allowed
 */
const validateSingleStringParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isString()
        .withMessage(`${param} should be a string.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .matches(/^\S+$/)
        .withMessage(`${param} should be a single word with no spaces.`);
};
/**
 * @function
 * @name validateStringParams
 * @param {string} param
 * @returns {}
 * @description this function validates input string value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and should match the Regex value
 */
const validateStringParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exists.`)
        .isString()
        .withMessage(`${param} should only be String Value.`)
        .notEmpty()
        .withMessage(`${param} should not Empty.`);
};
/**
 * @function
 * @name validateAlphanumericParams
 * @param {string} param
 * @returns {}
 * @description this function validates input alphanumeric value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and should match the Regex value
 */
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const validateAlphanumericParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isString()
        .withMessage(`${param} should only be a string value.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .matches(alphanumericRegex)
        .withMessage(`${param} should only contain alphanumeric characters.`);
};
/**
 * @function
 * @name validateOptionalStringParams
 * @param {string} param
 * @returns {}
 * @description this function validates input string (which are options) value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and should match the Regex value
 */
const validateOptionalStringParams = (param) => {
    return check(param)
        .optional()
        .notEmpty()
        .withMessage(`${param} should not Empty.`)
        .isString()
        .withMessage(`${param} should only be String Value.`);
};
/**
 * @function
 * @name validateNumberParams
 * @param {number} param
 * @returns {}
 * @description this function validates input number value with first check attribute needs to be present and their type needs to be number,
 * it should not empty and should match the Regex value
 */
const validateNumberParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exists.`)
        .isNumeric()
        .withMessage(`${param} should only be Numbers.`)
        .notEmpty()
        .withMessage(`${param} should not Empty.`)
        .matches(/^[0-9]+$/)
        .withMessage(`${param} can only contain Numbers `);
};
/**
 * @function
 * @name validateOptionalNumberParams
 * @param {number} param
 * @returns {}
 * @description this function validates optional input number value with first check attribute needs to be present and their type needs to be number,
 * it should not empty and should match the Regex value
 */
const validateOptionalNumberParams = (param) => {
    return check(param)
        .optional()
        .isNumeric()
        .withMessage(`${param} should only be Numbers.`)
        .notEmpty()
        .withMessage(`${param} should not Empty.`)
        .matches(/^[0-9]+$/)
        .withMessage(`${param} can only contain Numbers `);
};
/**
 * @function
 * @name validateDecimalParams
 * @param {number} param
 * @returns {}
 * @description this function validates input decimal value with first check attribute needs to be present and their type needs to be number,
 * it should not empty and should match the Regex value
 */
const validateDecimalParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isNumeric()
        .withMessage(`${param} should only be a Number.`)
        .notEmpty()
        .withMessage(`${param} should not be Empty.`)
        .matches(/^\d+(\.\d+)?$/)
        .withMessage(`${param} can only contain Decimal Numbers.`);
};
/**
 * @function
 * @name validateFloatParams
 * @param {number} param
 * @returns {}
 * @description this function validates input float value with first check attribute needs to be present and their type needs to be float,
 *  it should not empty and should match the Regex value
 */
const validateFloatParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isNumeric()
        .withMessage(`${param} should only be a number.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .matches(/^\d+(\.\d+)?$/)
        .withMessage(`${param} should be a valid floating-point number.`);
};
/**
 * @function
 * @name validateEmail
 * @param {string} param
 * @returns {}
 * @description This function validates an email value. It checks if the email exists, is a string,
 * and is not empty. It also ensures that the email matches the email format.
 */
const validateEmail = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isString()
        .withMessage(`${param} should be a String.`)
        .notEmpty()
        .withMessage(`${param} should not be Empty.`)
        .isEmail()
        .withMessage(`${param} should be a valid email address.`);
};
/**
 * @function
 * @name validateUsername
 * @param {string} param - The username to validate.
 * @returns {} - No return value.
 * @description Validates the input username value. The username must:
 *   - Exist
 *   - Be a string
 *   - Not be empty
 *   - Contain only alphabets, digits, periods, underscores, and hyphens
 *   - Have a length between min and max characters
 */
const validateUsername = (param) => {
    const minChars = 5; // Minimum username length
    const maxChars = 20; // Maximum username length
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isString()
        .withMessage(`${param} should be a String.`)
        .notEmpty()
        .withMessage(`${param} should not be Empty.`)
        .isLength({ min: minChars, max: maxChars })
        .withMessage(`${param} should be between ${minChars} and ${maxChars} characters.`)
        .matches(/^[A-Za-z0-9_.-]+$/)
        .withMessage(`${param} can only contain Alphabets, Numbers, '_', '.', '-' characters.`);
};
/**
 * @function
 * @name validatePassword
 * @param {number} param
 * @returns {}
 * @description this function validates input password value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and should match the Regex value
 */
const validatePassword = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isString()
        .withMessage(`${param} should be a string.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .custom((value) => {
        try {
            const decryptedPassword = (0, password_1.decryptPassword)(value);
            // Apply the regex to the decrypted password
            const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(decryptedPassword);
            if (!isStrongPassword) {
                throw new Error("Password should be a strong password containing at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and any special character.");
            }
            return true;
        }
        catch (error) {
            throw new Error("Password is not correctly encrypted or does not meet strength requirements");
        }
    });
};
/**
 * @function
 * @name validateBooleanParam
 * @param {boolean} param - The boolean parameter to validate.
 * @returns {ValidationChain} - The validation chain for the boolean parameter.
 * @description This function validates an input boolean parameter. It checks if the parameter exists
 * and is a boolean value.
 */
const validateBooleanParam = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isBoolean()
        .withMessage(`${param} should be a Boolean.`);
};
/**
 * @function
 * @name validateDateParam
 * @param {string} param - The date parameter to validate.
 * @returns {ValidationChain} - The validation chain for the boolean parameter.
 * @description This function validates an input date parameter. It checks if the parameter exists
 * and is a date value.
 */
const validateDateParam = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage(`${param} should be in the format YYYY-MM-DD.`);
};
/**
 * @function
 * @name validateDatetime
 * @param {string} param - The datetime value to validate.
 * @returns {} - No return value.
 * @description Validates the input datetime value. The datetime must:
 *   - Exist
 *   - Be a string
 *   - Not be empty
 *   - Be a valid date and time format
 */
const validateDatetime = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exist.`)
        .isString()
        .withMessage(`${param} should be a String.`)
        .notEmpty()
        .withMessage(`${param} should not be Empty.`)
        .isISO8601()
        .withMessage(`${param} should be a valid ISO 8601 date and time format.`);
};
/**
 * @function
 * @name validateOptionalDateParam
 * @param {string} param - The date parameter to validate.
 * @returns {ValidationChain} - The validation chain for the boolean parameter.
 * @description This function validates an optional input date parameter. It checks if the parameter exists
 * and is a date value.
 */
const validateOptionalDateParam = (param) => {
    return check(param)
        .optional()
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage(`${param} should be in the format YYYY-MM-DD.`);
};
/**
 * @function
 * @name validateStringArrayParams
 * @param {string} param
 * @returns {}
 * @description this function validates input string value with first check attribute needs to be present and their type needs to be string,
 * it should be present in the array value.
 */
const validateStringArrayParams = (param, arrValue) => {
    return check(param)
        .exists()
        .withMessage(`${param} should Exists.`)
        .isString()
        .withMessage(`${param} should only be String Value.`)
        .isIn(arrValue)
        .withMessage(`${param} should be from the following values : '${arrValue}'`);
};
/**
 * @function
 * @name validateOptionalStringArrayParams
 * @param {string} param
 * @returns {}
 * @description this function validates input string value with first check attribute needs to be present and their type needs to be string,
 * it should be present in the array value.
 */
const validateOptionalStringArrayParams = (param, arrValue) => {
    return check(param)
        .optional()
        .withMessage(`${param} should Exists.`)
        .isString()
        .withMessage(`${param} should only be String Value.`)
        .isIn(arrValue)
        .withMessage(`${param} should be from the following values : '${arrValue}'`);
};
/**
 * @function
 * @name validateOptionalStringArrayParams
 * @param {string} param
 * @returns {}
 * @description this function validates input array value with first check attribute needs to be present and their type needs to be numbers of each values
 * inside array, it should be present in the array value.
 */
const validateNumberArrayParams = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isArray()
        .withMessage(`${param} should be an array.`)
        .custom((value) => {
        if (!Array.isArray(value)) {
            throw new Error(`${param} should be an array.`);
        }
        value.forEach((num) => {
            if (typeof num !== "number") {
                throw new Error(`${param} should only contain numbers.`);
            }
        });
        return true;
    });
};
/**
 * @function
 * @name validateImageFileName
 * @param {string} param
 * @returns {}
 * @description this function validates input file name for the image. it will check either image filename is passed or not and then either it
 * from allowed image extensions or not
 */
const validateImageFileName = (param) => {
    const allowedTypes = ["jpg", "jpeg", "png", "pdf"];
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isString()
        .withMessage(`${param} should be a string.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .custom((value) => {
        // Check the file extension
        const fileExtension = value.split(".").pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            throw new Error(`${param} should be one of the following types: ${allowedTypes.join(", ")}.`);
        }
        return true;
    });
};
/**
 * @function
 * @name validatePasswordEncryption
 * @param {number} param
 * @returns {}
 * @description this function validates input password value with first check attribute needs to be present and their type needs to be string,
 * it should not empty and encrypted
 */
const validatePasswordEncryption = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isString()
        .withMessage(`${param} should be a string.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`)
        .custom((value) => {
        try {
            (0, password_1.decryptPassword)(value);
            return true;
        }
        catch (error) {
            throw new Error("Password is not correctly encrypted.");
        }
    });
};
/**
 * @function
 * @name validatePercentage
 * @param {string} param - The name of the parameter to validate.
 * @returns {}
 * @description Validates a percentage value, ensuring it exists, is numeric, is not empty,
 * and falls between 0 and 100.
 */
const validatePercentage = (param) => {
    return check(param)
        .exists()
        .withMessage(`${param} should exist.`)
        .isFloat({ min: 0, max: 100 })
        .withMessage(`${param} should be a number between 0 and 100.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`);
};
/**
 * @function
 * @name validatePercentage
 * @param {string} param - The name of the parameter to validate.
 * @returns {}
 * @description Validates a percentage value, ensuring it exists, is numeric, is not empty,
 * and falls between 0 and 100.
 */
const validateOptionalPercentage = (param) => {
    return check(param)
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage(`${param} should be a number between 0 and 100.`)
        .notEmpty()
        .withMessage(`${param} should not be empty.`);
};
/**
 * @function
 * @name validateSplitPayment
 * @param {number} param
 * @returns {}
 * @description this function validates the split payment method, it will first validate that payments should be an array with contains all the payment
 * method user is currently using to buy a package, for type bank,card,usdt, amount and filename are required along their type. For wallet and vreit only
 * amount is required along their paymentType
 */
const validateSplitPayment = () => {
    return body("payments")
        .isArray({ min: 2 })
        .withMessage("payments must be an array with at least 2 items")
        .custom((payments) => {
        payments.forEach((payment, index) => {
            // Check if amount is present and a number
            if (!payment.amount) {
                throw new Error(`${payments[index].amount} is required`);
            }
            if (isNaN(payment.amount)) {
                throw new Error(`${payments[index].amount} must be a number`);
            }
            // Check if paymentType is valid
            if (!payment.paymentType) {
                throw new Error(`payments[${index}].paymentType is required`);
            }
            if (!["bank", "usdt", "wallet", "vreit"].includes(payment.paymentType)) {
                throw new Error(`${payments[index].paymentType} must be one of "bank", "usdt", "wallet", or "vreit"`);
            }
            // Conditionally check filename based on paymentType
            if (["bank", "usdt"].includes(payment.paymentType)) {
                if (!payment.filename) {
                    throw new Error(`${payments[index].filename} is required when paymentType is "bank" or "usdt"`);
                }
                // Validate filename extension
                const allowedTypes = ["jpg", "jpeg", "png", "pdf"];
                const fileExtension = payment.filename.split(".").pop().toLowerCase();
                if (!allowedTypes.includes(fileExtension)) {
                    throw new Error(`${payments[index].filename} should be one of the following types: ${allowedTypes.join(", ")}`);
                }
            }
        });
        return true;
    });
};
module.exports = {
    validateAlphanumericParams,
    validateSingleStringParams,
    validateStringParams,
    validateNumberParams,
    validateDecimalParams,
    validateFloatParams,
    validateEmail,
    validatePassword,
    validateBooleanParam,
    validateUsername,
    validateDateParam,
    validateOptionalStringParams,
    validateDatetime,
    validateOptionalNumberParams,
    validateOptionalDateParam,
    validateStringArrayParams,
    validateOptionalStringArrayParams,
    validateImageFileName,
    validateNumberArrayParams,
    validatePasswordEncryption,
    validateSplitPayment,
    validatePercentage,
    validateOptionalPercentage,
};
