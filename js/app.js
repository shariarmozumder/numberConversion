/**
 * Title: Nano Converter
 * Description: Convert number and text to binary, decimal, octal & vice versa
 * Author: Samin Yasar
 * Date: 16/August/2021
 */

// DOM Select
const numberFormContainer = document.getElementById("numberFormContainer");
const textFormContainer = document.getElementById("textFormContainer");
const numberInputFields = [
    document.getElementById("decimalField"),
    document.getElementById("binaryField"),
    document.getElementById("octalField"),
    document.getElementById("hexadecimalField"),
];
const textInputFields = [
    document.getElementById("textField"),
    document.getElementById("binaryTextField"),
];

// Global Variables
const convertedNumbers = {
    decimal: null,
    binary: null,
    octal: null,
    hexadecimal: null,
};

// Functionalities
/**
 * Check if value is valid to corresponding value type.
 *
 * @param {string} valueType - The base of given value.
 * @param {string} value - The actual value.
 * @return {string} -
 */
function numberInputAuthorizer(valueType, value) {
    let validateValue;
    switch (valueType) {
        case "decimal":
            validateValue = !isNaN(parseInt(value))
                ? parseInt(value).toString()
                : "0";
            break;
        case "binary":
            validateValue = value.toString().replace(/[^01]/g, "");
            break;
        case "octal":
            validateValue = value.toString().replace(/[^01234567]/g, "");
            break;
        case "hexadecimal":
            validateValue = value
                .toString()
                .replace(/[^0123456789ABCDEF]/gi, "");
            break;
    }
    return validateValue ? validateValue : "0";
}

/**
 * Convert the number into given valueType.
 *
 * @param {string} fromType - The base of given value.
 * @param {string} toType - The base of convert value.
 * @param {string} value - The actual value.
 * @return {string} -
 */
function getConvertedNumber(fromType, toType, value) {
    const convertBase = {
        decimal: 10,
        binary: 2,
        octal: 8,
        hexadecimal: 16,
    };
    switch (toType) {
        case "decimal":
            return parseInt(value, convertBase[fromType]);
        case "binary":
            return parseInt(value, convertBase[fromType]).toString(2);
        case "octal":
            return parseInt(value, convertBase[fromType]).toString(8);
        case "hexadecimal":
            return parseInt(value, convertBase[fromType]).toString(16);
        default:
            return value;
    }
}

/**
 * Get the converted values and store and it on `convertedValues` object.
 *
 * @param {string} valueType - The base of given value.
 * @param {string} value - The actual value.
 * @return {string} -
 */
function storeNumberValue(valueType, value) {
    for (const prop in convertedNumbers) {
        if (valueType !== prop) {
            convertedNumbers[prop] = getConvertedNumber(valueType, prop, value);
        } else if (valueType === prop) {
            convertedNumbers[prop] = value;
        }
    }
}

/**
 * Convert the value according to all number base & store them into an object.
 *
 * @param {Event} e - The key event.
 */
function convertNumber(e) {
    const valueType = e.target.dataset.numberBase;
    const value = numberInputAuthorizer(valueType, e.target.value);
    storeNumberValue(valueType, value);
    numberInputFields
        .filter((field) => field.dataset.numberBase !== valueType)
        .forEach((field) => {
            for (const prop in convertedNumbers) {
                if (field.dataset.numberBase === prop) {
                    field.value = convertedNumbers[prop];
                }
            }
        });
}

/**
 * Convert string to binary or binary to string.
 *
 * @param {Event} e - The key event.
 */
function convertText(e) {
    const valueType = e.target.dataset.textBase;
    const value = e.target.value.trim();
    if (valueType === "string") {
        const binaryCharCode = value
            .split("")
            .map((el) => el.charCodeAt(0))
            .map((el) => {
                return parseInt(el, 10).toString(2);
            });
        textInputFields[1].value = binaryCharCode.join(" ");
    } else if (valueType === "binary") {
        const stringChar = value
            .split(" ")
            .map((el) => parseInt(el, 2))
            .map((el) => String.fromCharCode(el));
        textInputFields[0].value = stringChar.join("");
    }
}

// Listening Event
numberFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    numberInputFields.forEach((field) => (field.value = ""));
});

numberInputFields.forEach((field) => {
    field.addEventListener("keyup", convertNumber);
});

textFormContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    textInputFields.forEach((field) => (field.value = ""));
});

textInputFields.forEach((field) => {
    field.addEventListener("keyup", convertText);
});
