import { buildMessage, ValidateBy } from '../common/ValidateBy';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
export const IS_PHONE_NUMBER = 'isPhoneNumber';
/**
 * Checks if the string is a valid phone number.
 * @param value the potential phone number string to test
 * @param {string} region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
export function isPhoneNumber(value, region) {
    try {
        const phoneNum = parsePhoneNumberFromString(value, region);
        const result = phoneNum === null || phoneNum === void 0 ? void 0 : phoneNum.isValid();
        return !!result;
    }
    catch (error) {
        // logging?
        return false;
    }
}
/**
 * Checks if the string is a valid phone number.
 * @param region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
export function IsPhoneNumber(region, validationOptions) {
    return ValidateBy({
        name: IS_PHONE_NUMBER,
        constraints: [region],
        validator: {
            validate: (value, args) => isPhoneNumber(value, args.constraints[0]),
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be a valid phone number', validationOptions),
        },
    }, validationOptions);
}
//# sourceMappingURL=IsPhoneNumber.js.map