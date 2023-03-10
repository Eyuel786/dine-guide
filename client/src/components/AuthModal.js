import { useEffect, useState } from "react";
import {
    Box,
    Button, CircularProgress, IconButton, InputAdornment, Modal, Paper,
    Stack,
    styled, TextField, Typography, useTheme
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
    validateUsername,
    validateEmail,
    validatePassword
} from "../utils/validateUser";
import { useInputState } from "../hooks/useInputState";
import {
    sendRegisterRequest,
    sendLoginRequest
} from "../store";
import ImageUpload from "./ImageUpload";
import { useImgState } from "../hooks/useImgState";
import MyModal from "./MyModal";


const MyPaper = styled(Paper)(({ height, theme }) => ({
    width: "22rem",
    height,
    padding: "1rem 2rem 2rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
        width: "75%",
        height: "70%",
        padding: "1rem 2rem"
    }
}));

const MyLabel = styled(Typography)(() => ({
    marginTop: "0.5rem"
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
    marginTop: "2rem",
    ...theme.typography.tab
}));

const ChangeAuthText = styled(Typography)(() => ({
    marginTop: "1rem"
}));

const ChangeAuthBtn = styled(Button)(() => ({
    padding: 0
}));

function AuthModal(props) {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.auth);
    const { openModal, closeModal } = props;

    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const {
        enteredValue: username,
        inputIsValid: usernameIsValid,
        inputHasError: usernameHasError,
        errorMessage: usernameErrorMessage,
        handleChange: handleUsernameChange,
        handleBlur: handleUsernameBlur,
        reset: resetUsername
    } = useInputState("", validateUsername);

    const {
        enteredValue: email,
        inputIsValid: emailIsValid,
        inputHasError: emailHasError,
        errorMessage: emailErrorMessage,
        handleChange: handleEmailChange,
        handleBlur: handleEmailBlur,
        reset: resetEmail
    } = useInputState("", validateEmail);

    const {
        enteredValue: password,
        inputIsValid: passwordIsValid,
        inputHasError: passwordHasError,
        errorMessage: passwordErrorMessage,
        handleChange: handlePasswordChange,
        handleBlur: handlePasswordBlur,
        reset: resetPassword
    } = useInputState("", validatePassword);

    const [imgState, handleImgFileChange, resetImg] = useImgState();

    const { imgFile, imgPreviewUrl, imgIsValid } = imgState;

    let formIsValid = usernameIsValid && passwordIsValid;

    if (!isLoggingIn) {
        formIsValid = formIsValid && emailIsValid && imgIsValid;
    }

    const closeAuthModal = () => {
        resetUsername();
        resetEmail();
        resetPassword();
        resetImg();
        setIsLoggingIn(true);
        closeModal();
    }

    const onSubmit = e => {
        e.preventDefault();

        handleUsernameBlur();
        handleEmailBlur();
        handlePasswordBlur();

        if (!formIsValid) {
            console.log("Form is not valid");
        }

        let userData = {
            username: username.trim(),
            password: password.trim()
        }

        if (!isLoggingIn) {
            userData.email = email.trim();
            userData.image = imgFile;
            dispatch(sendRegisterRequest(userData))
                .then(closeAuthModal)
                .catch(err => console.log("Error:", err.message));
        } else {
            dispatch(sendLoginRequest(userData))
                .then(closeAuthModal)
                .catch(err => console.log("Error:", err.message));
        }
    }

    return (
        <MyModal
            open={openModal}
            closeModal={closeAuthModal}
            title={isLoggingIn ? "Welcome back" : "Join DineGuide"}>
            <form
                onSubmit={onSubmit}>
                <Stack
                    spacing={2}
                    sx={{ p: "0.5rem 2rem" }}>
                    <Box>
                        <MyLabel
                            component="label"
                            htmlFor="username">
                            Username
                        </MyLabel>
                        <TextField
                            id="username"
                            size="small"
                            value={username}
                            onChange={handleUsernameChange}
                            onBlur={handleUsernameBlur}
                            error={usernameHasError}
                            helperText={usernameHasError && usernameErrorMessage}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                            }}
                            fullWidth />
                    </Box>
                    {!isLoggingIn &&
                        <Box>
                            <MyLabel
                                component="label"
                                htmlFor="email">
                                Email
                            </MyLabel>
                            <TextField
                                id="email"
                                size="small"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                error={emailHasError}
                                helperText={emailHasError && emailErrorMessage}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                }}
                                fullWidth />
                        </Box>}
                    <Box>
                        <MyLabel
                            component="label"
                            htmlFor="password">
                            Password
                        </MyLabel>
                        <TextField
                            id="password"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            error={passwordHasError}
                            autoComplete="new-password"
                            helperText={passwordHasError && passwordErrorMessage}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>,
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            disableRipple
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ?
                                                <VisibilityIcon /> :
                                                <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            fullWidth />
                    </Box>
                    {!isLoggingIn &&
                        <ImageUpload
                            imgPreviewUrl={imgPreviewUrl}
                            handleImgFileChange={handleImgFileChange} />}
                    {!loading && error &&
                        <Typography
                            color="error"
                            variant="subtitle2"
                            sx={{ mt: 1, mb: 0 }}>
                            {error}
                        </Typography>}
                    {!loading &&
                        <SubmitBtn
                            variant="contained"
                            type="submit"
                            disableRipple
                            disabled={!formIsValid}>
                            {isLoggingIn ? "Login" : "Register"}
                        </SubmitBtn>}
                    {loading &&
                        <Box
                            sx={{
                                marginTop: "2rem",
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <CircularProgress />
                        </Box>}
                </Stack>
                <ChangeAuthText
                    align="center">
                    {isLoggingIn ?
                        "Don't have an account?" :
                        "Already have an account?"}
                    <ChangeAuthBtn
                        disableRipple
                        onClick={() => setIsLoggingIn(!isLoggingIn)}>
                        {isLoggingIn ? "Sign up" : "Sign in"}
                    </ChangeAuthBtn>
                </ChangeAuthText>
            </form>
        </MyModal >
    );
}

export default AuthModal;