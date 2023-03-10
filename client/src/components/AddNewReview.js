import { useState } from "react";
import {
    Typography, Box, Rating, TextField, Button,
    CircularProgress,
    Stack
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendReview } from "../store";

import { useInputState } from "../hooks/useInputState";
import { validateComment } from "../utils/validateReview";
import MyModal from "./MyModal";


function AddNewReview(props) {
    const dispatch = useDispatch();
    const { open, closeModal, restaurantId } = props;
    const { error, loading } = useSelector(state => state.restaurants);

    const [rating, setRating] = useState(1);

    const {
        enteredValue: comment,
        inputIsValid: commentIsValid,
        inputHasError: commentHasError,
        errorMessage: commentErrorMessage,
        handleChange: handleCommentChange,
        handleBlur: handleCommentBlur,
        reset: resetComment
    } = useInputState("", validateComment);

    const onRatingChanged = (e, newVal) => setRating(newVal);
    const resetRating = () => setRating(1);

    const closeMyModal = () => {
        resetComment();
        resetRating();
        closeModal();
    }

    const onSubmit = e => {
        e.preventDefault();

        handleCommentBlur();

        if (!commentIsValid) {
            console.log("Form is invalid");
        }

        dispatch(sendReview(
            restaurantId,
            {
                rating,
                comment: comment.trim()
            }
        ))
            .then(closeMyModal)
            .catch(err => console.log("ADDREVIEW Error:", err.message));

    }

    return (
        <MyModal
            open={open}
            closeModal={closeMyModal}
            title="Write Your Review">
            <form
                onSubmit={onSubmit}>
                <Stack
                    spacing={2}
                    sx={{ p: "0.5rem 2rem" }}>
                    <Box>
                        <Typography
                            component="label"
                            htmlFor="comment">
                            Comment
                        </Typography>
                        <TextField
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={handleCommentChange}
                            onBlur={handleCommentBlur}
                            error={commentHasError}
                            helperText={commentHasError && commentErrorMessage}
                            multiline
                            fullWidth />
                    </Box>
                    <Box>
                        <Typography
                            component="legend">
                            Rating
                        </Typography>
                        <Rating
                            value={rating}
                            onChange={onRatingChanged} />
                    </Box>
                    {!loading && <Button
                        type="submit"
                        variant="contained"
                        disabled={!commentIsValid}
                        disableRipple>
                        Submit
                    </Button>}
                    {loading &&
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <CircularProgress />
                        </Box>}
                </Stack>
            </form>
            {error &&
                <Typography
                    color="error"
                    sx={{ ml: "2rem" }}>
                    {error}
                </Typography>}
        </MyModal>
    );
}

export default AddNewReview;