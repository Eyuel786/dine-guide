import { checkLength, checkRequired } from "./checks"

export const validateName = value => {
    let errorMessage = checkRequired("Name", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength("Name", value, 3, 50);
    return errorMessage;
}

export const validateType = value => {
    let errorMessage = checkRequired("Type", value);
    return errorMessage;
}

export const validateLocation = value => {
    let errorMessage = checkRequired("Location", value);
    return errorMessage;
}

export const validateWebsite = value => {
    let errorMessage = checkRequired("Website", value);
    if (errorMessage) return errorMessage;

    const websiteIsValid =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
            .test(value.trim());
    if (!websiteIsValid) return "Website is invalid";

    return null;
}

export const validateDescription = value => {
    let errorMessage = checkRequired("Description", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength("Description", value, 40, 1000);
    return errorMessage;
}

