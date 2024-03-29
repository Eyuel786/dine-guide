import { useReducer } from "react";


export function imgReducer(state, action) {

    switch (action.type) {
        case "CHANGE": {
            const pickedImg = action.event.target.files[0];
            if (pickedImg) {
                return {
                    imgFile: pickedImg,
                    imgPreviewUrl: URL.createObjectURL(pickedImg),
                    imgIsValid: true
                }
            } else {
                return state;
            }
        }
        case "RESET":
            return {
                imgFile: null,
                imgPreviewUrl: null,
                imgIsValid: false
            }
        default:
            return state;
    }
}

export function useImgState(initImgUrl = null) {

    const [state, dispatch] = useReducer(
        imgReducer,
        { imgFile: null, imgPreviewUrl: initImgUrl, imgIsValid: !!initImgUrl });

    const onChange = e => dispatch({ type: "CHANGE", event: e });
    const reset = () => dispatch({ type: "RESET" });

    return [state, onChange, reset];
}