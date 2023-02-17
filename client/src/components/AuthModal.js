import { useState } from "react";
import {
    Button, IconButton, Modal, Paper,
    styled, TextField, Typography, useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
    validateUsername,
    validateEmail,
    validatePassword
} from "../utils/validateUser";
import { useInputState } from "../hooks/useInputState";


const MyPaper = styled(Paper)(() => ({
    width: "22rem",
    padding: "1rem 2rem 2rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
}));

const CloseBtn = styled(IconButton)(() => ({
    padding: 0,
    alignSelf: "flex-end"
}));

const MyTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    fontSize: "1.6rem",
    margin: "1rem 0"
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
    const theme = useTheme();
    const { openModal, closeModal } = props;

    const [isLoggingIn, setIsLoggingIn] = useState(true);

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

    let formIsValid = usernameIsValid && passwordIsValid;

    if (!isLoggingIn) {
        formIsValid = formIsValid && emailIsValid;
    }

    const onSubmit = e => {
        e.preventDefault();

        handleUsernameBlur();
        handleEmailBlur();
        handlePasswordBlur();

        if (!formIsValid) {
            console.log("Form is not valid");
        }

        console.log(username, email, password);

        resetUsername();
        resetEmail();
        resetPassword();
    }

    const closeAuthModal = () => {
        closeModal();
        resetUsername();
        resetEmail();
        resetPassword();
    }

    return (
        <Modal
            open={openModal}
            onClose={closeAuthModal}>
            <form
                onSubmit={onSubmit}>
                <MyPaper>
                    <CloseBtn
                        disableRipple
                        onClick={closeAuthModal}>
                        <CloseIcon />
                    </CloseBtn>
                    {isLoggingIn &&
                        <MyTitle>
                            Welcome back
                        </MyTitle>}
                    {!isLoggingIn &&
                        <MyTitle>
                            Join {" "}
                            <span
                                style={{ color: theme.palette.common.yellow }}>
                                Dine
                            </span>
                            Guide
                        </MyTitle>}
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
                        fullWidth />
                    {!isLoggingIn &&
                        <MyLabel
                            component="label"
                            htmlFor="email">
                            Email
                        </MyLabel>}
                    {!isLoggingIn &&
                        <TextField
                            id="email"
                            size="small"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            error={emailHasError}
                            helperText={emailHasError && emailErrorMessage}
                            fullWidth />}
                    <MyLabel
                        component="label"
                        htmlFor="password">
                        Password
                    </MyLabel>
                    <TextField
                        id="password"
                        size="small"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        error={passwordHasError}
                        helperText={passwordHasError && passwordErrorMessage}
                        fullWidth />
                    <SubmitBtn
                        variant="contained"
                        type="submit"
                        disableRipple
                        disabled={!formIsValid}>
                        {isLoggingIn ? "Login" : "Register"}
                    </SubmitBtn>
                    <ChangeAuthText>
                        {isLoggingIn ?
                            "Don't have an account?" :
                            "Already have an account?"}
                        <ChangeAuthBtn
                            disableRipple
                            onClick={() => setIsLoggingIn(!isLoggingIn)}>
                            {isLoggingIn ? "Sign up" : "Sign in"}
                        </ChangeAuthBtn>
                    </ChangeAuthText>
                </MyPaper>
            </form>
        </Modal>
    );
}

export default AuthModal;