export const checkRequired = (fieldName, value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue)
        return `${fieldName} is required`;

    return null;
}

export const checkLength = (fieldName, value, min, max) => {
    const trimmedValue = value.trim();

    let errorMessage;

    if (trimmedValue.length < min) {
        errorMessage = `${fieldName} must be greater than ${min} characters`;
    } else if (trimmedValue.length > max) {
        errorMessage = `${fieldName} must be less than ${max} characters`;
    } else {
        errorMessage = null;
    }

    return errorMessage;
}

export const checkEmail = value => {
    const trimmedValue = value.trim();

    const emailIsValid = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(trimmedValue);
    if (!emailIsValid) return "Email is not valid";

    return null;
}

export const checkPassword = value => {
    const trimmedValue = value.trim();

    const passwordIsValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,16}$/.test(trimmedValue);
    if (!passwordIsValid)
        return "Password is not valid";
}

