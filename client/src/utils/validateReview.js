import { checkLength, checkRequired } from "./checks";

export const validateComment = value => {
    let errorMessage = checkRequired("Comment", value);
    if (errorMessage) return errorMessage;

    errorMessage = checkLength("Comment", value, 40, 500);
    return errorMessage;
}