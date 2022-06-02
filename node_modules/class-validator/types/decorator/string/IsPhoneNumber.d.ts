import { ValidationOptions } from '../ValidationOptions';
import { CountryCode } from 'libphonenumber-js';
export declare const IS_PHONE_NUMBER = "isPhoneNumber";
/**
 * Checks if the string is a valid phone number.
 * @param value the potential phone number string to test
 * @param {string} region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
export declare function isPhoneNumber(value: string, region: CountryCode | undefined): boolean;
/**
 * Checks if the string is a valid phone number.
 * @param region 2 characters uppercase country code (e.g. DE, US, CH).
 * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
 */
export declare function IsPhoneNumber(region: CountryCode | undefined, validationOptions?: ValidationOptions): PropertyDecorator;
