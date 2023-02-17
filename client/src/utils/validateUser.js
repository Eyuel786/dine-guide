import { checkRequired, checkEmail, checkPassword, checkLength } from "./checks";

export const validateUsername = value => {
    let errorMessage = checkRequired("Username", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength("Username", value, 3, 40);
    return errorMessage;
}

export const validateEmail = value => {
    let errorMessage = checkRequired("Email", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkEmail(value);
    return errorMessage;
}

export const validatePassword = value => {
    let errorMessage = checkRequired("Password", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkPassword(value);
    return errorMessage;
}
