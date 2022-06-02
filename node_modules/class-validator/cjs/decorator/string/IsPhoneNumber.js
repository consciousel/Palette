"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumber = exports.isPhoneNumber = exports.IS_PHONE_NUMBER = void 0;
const ValidateBy_1 = require("../common/ValidateBy");
const libphonenumber_js_1 = require("libphonenumber-js");
exports.IS_PHONE_NUMBER = 'isPhoneNumber';
/**
 * Checks if the string is a valid phone number.
 * @param value the potential phone number string to test
 * @param {string} region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
function isPhoneNumber(value, region) {
    try {
        const phoneNum = libphonenumber_js_1.parsePhoneNumberFromString(value, region);
        const result = phoneNum === null || phoneNum === void 0 ? void 0 : phoneNum.isValid();
        return !!result;
    }
    catch (error) {
        // logging?
        return false;
    }
}
exports.isPhoneNumber = isPhoneNumber;
/**
 * Checks if the string is a valid phone number.
 * @param region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
function IsPhoneNumber(region, validationOptions) {
    return ValidateBy_1.ValidateBy({
        name: exports.IS_PHONE_NUMBER,
        constraints: [region],
        validator: {
            validate: (value, args) => isPhoneNumber(value, args.constraints[0]),
            defaultMessage: ValidateBy_1.buildMessage(eachPrefix => eachPrefix + '$property must be a valid phone number', validationOptions),
        },
    }, validationOptions);
}
exports.IsPhoneNumber = IsPhoneNumber;
//# sourceMappingURL=IsPhoneNumber.js.map