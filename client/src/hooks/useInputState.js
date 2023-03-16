import { useReducer } from "react";


export function inputReducer(state, action) {

    switch (action.type) {
        case "CHANGE":
            return {
                enteredValue: action.value,
                inputIsBlurred: state.inputIsBlurred
            }
        case "BLUR":
            return {
                enteredValue: state.enteredValue,
                inputIsBlurred: true
            }
        case "RESET":
            return {
                enteredValue: "",
                inputIsBlurred: false
            }
        default:
            return state;
    }
}

export function useInputState(initVal = '', validator) {

    const [state, dispatch] = useReducer(inputReducer,
        { enteredValue: initVal, inputIsBlurred: false });

    const { enteredValue, inputIsBlurred } = state;

    const errorMessage = validator(enteredValue);
    const inputIsValid = !errorMessage;
    const inputHasError = inputIsBlurred && !inputIsValid;

    const handleChange = e => dispatch({ type: "CHANGE", value: e.target.value });
    const handleBlur = () => dispatch({ type: "BLUR" });
    const reset = () => dispatch({ type: "RESET" });

    return {
        enteredValue,
        inputIsValid,
        inputHasError,
        errorMessage,
        handleChange,
        handleBlur,
        reset
    }
}