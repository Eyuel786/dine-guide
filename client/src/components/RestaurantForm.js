import {
    Box, Paper, TextField, Typography,
    styled, Button, MenuItem, Select, CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useImgState } from "../hooks/useImgState";
import { useInputState } from "../hooks/useInputState";
import { sendNewRestaurant, sendUpdatedRestaurant } from "../store";
import {
    validateDescription,
    validateLocation,
    validateName,
    validateType,
    validateWebsite
} from "../utils/validateRestaurant";
import ImageUpload from "./ImageUpload";


const MyTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    margin: "0.5rem 0"
}));

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 0",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    justifyContent: "center"
}));

const MyPaper = styled(Paper)(() => ({
    padding: "2rem",
    width: "28rem"
}));


function RestaurantForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.restaurants);

    const {
        isEditing,
        restaurant
    } = props;

    const {
        enteredValue: name,
        inputIsValid: nameIsValid,
        inputHasError: nameHasError,
        errorMessage: nameErrorMessage,
        handleChange: handleNameChange,
        handleBlur: handleNameBlur,
        reset: resetName
    } = useInputState(restaurant?.name, validateName);

    const {
        enteredValue: type,
        inputIsValid: typeIsValid,
        inputHasError: typeHasError,
        handleChange: handleTypeChange,
        handleBlur: handleTypeBlur,
        reset: resetType
    } = useInputState(restaurant?.type, validateType);

    const {
        enteredValue: location,
        inputIsValid: locationIsValid,
        inputHasError: locationHasError,
        errorMessage: locationErrorMessage,
        handleChange: handleLocationChange,
        handleBlur: handleLocationBlur,
        reset: resetLocation
    } = useInputState(restaurant?.location, validateLocation);

    const {
        enteredValue: website,
        inputIsValid: websiteIsValid,
        inputHasError: websiteHasError,
        errorMessage: websiteErrorMessage,
        handleChange: handleWebsiteChange,
        handleBlur: handleWebsiteBlur,
        reset: resetWebsite
    } = useInputState(restaurant?.website, validateWebsite);

    const {
        enteredValue: description,
        inputIsValid: descriptionIsValid,
        inputHasError: descriptionHasError,
        errorMessage: descriptionErrorMessage,
        handleChange: handleDescriptionChange,
        handleBlur: handleDescriptionBlur,
        reset: resetDescription
    } = useInputState(restaurant?.description, validateDescription);

    const [imgState, handleImgChange, resetImg] = useImgState(
        restaurant?.image &&
        `http://127.0.0.1:9000/api/${restaurant.image.replace(/\\/g, "/")}`
    );

    const { imgFile, imgPreviewUrl, imgIsValid } = imgState;

    const formIsValid = nameIsValid && typeIsValid && locationIsValid
        && websiteIsValid && descriptionIsValid && imgIsValid;

    const clearForm = () => {
        resetName();
        resetType();
        resetImg();
        resetWebsite();
        resetLocation();
        resetDescription();
    }

    const onSubmit = e => {
        e.preventDefault();

        handleNameBlur();
        handleTypeBlur();
        handleLocationBlur();
        handleWebsiteBlur();
        handleDescriptionBlur();

        if (!formIsValid) {
            console.log("Form is invalid");
            return;
        }

        const restaurantData = {
            name: name.trim(),
            type: type.trim(),
            location: location.trim(),
            website: website.trim(),
            description: description.trim(),
            image: imgFile
        }

        if (isEditing) {
            dispatch(sendUpdatedRestaurant(restaurant.id, restaurantData))
                .then(() => {
                    clearForm();
                    navigate("/restaurants")
                })
                .catch(err => console.log("Error:", err.message));
        } else {
            dispatch(sendNewRestaurant(restaurantData))
                .then(() => {
                    clearForm();
                    navigate("/restaurants")
                })
                .catch(err => console.log("Error:", err.message))
        }
    }

    return (
        <>
            <MyTitle
                align="center">
                {isEditing ? "Edit" : "Add"} Restaurant
            </MyTitle>
            <MainContainer>
                <form
                    onSubmit={onSubmit}>
                    <MyPaper
                        elevation={0}>
                        <Typography
                            component="label"
                            htmlFor="name">
                            Name
                        </Typography>
                        <TextField
                            id="name"
                            size="small"
                            sx={{ mb: 2 }}
                            value={name}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            error={nameHasError}
                            helperText={nameHasError && nameErrorMessage}
                            fullWidth />
                        <Typography
                            component="label"
                            htmlFor="type">
                            Type
                        </Typography>
                        <Select
                            id="type"
                            size="small"
                            sx={{ mb: 2 }}
                            value={type}
                            onChange={handleTypeChange}
                            onBlur={handleTypeBlur}
                            error={typeHasError}
                            fullWidth>
                            <MenuItem
                                value="Fast food">
                                Fast food
                            </MenuItem>
                            <MenuItem
                                value="Sushi">
                                Sushi
                            </MenuItem>
                            <MenuItem
                                value="Casual Dining">
                                Casual Dining
                            </MenuItem>
                            <MenuItem
                                value="Italian">
                                Italian
                            </MenuItem>
                        </Select>
                        <Typography
                            component="label"
                            htmlFor="location">
                            Location
                        </Typography>
                        <TextField
                            size="small"
                            id="location"
                            sx={{ mb: 2 }}
                            value={location}
                            onChange={handleLocationChange}
                            onBlur={handleLocationBlur}
                            error={locationHasError}
                            helperText={locationHasError && locationErrorMessage}
                            fullWidth />
                        <Typography
                            component="label"
                            htmlFor="website">
                            Website
                        </Typography>
                        <TextField
                            size="small"
                            id="website"
                            sx={{ mb: 2 }}
                            value={website}
                            onChange={handleWebsiteChange}
                            onBlur={handleWebsiteBlur}
                            error={websiteHasError}
                            helperText={websiteHasError && websiteErrorMessage}
                            fullWidth />
                        <Typography
                            component="label"
                            htmlFor="description">
                            Description
                        </Typography>
                        <TextField
                            size="small"
                            id="description"
                            rows={4}
                            sx={{ mb: 2 }}
                            value={description}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                            error={descriptionHasError}
                            helperText={descriptionHasError && descriptionErrorMessage}
                            fullWidth
                            multiline />
                        <Typography>
                            Image
                        </Typography>
                        <ImageUpload
                            handleImgFileChange={handleImgChange}
                            imgPreviewUrl={imgPreviewUrl} />
                        {!loading && <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 4 }}
                            disabled={!formIsValid}
                            disableRipple
                            fullWidth>
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
                        {error &&
                            <Typography
                                color="error"
                                sx={{ mt: 2 }}>
                                {error}
                            </Typography>}
                    </MyPaper>
                </form>
            </MainContainer>
        </>
    );
}

export default RestaurantForm;