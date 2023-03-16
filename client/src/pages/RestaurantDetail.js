import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, styled, Box, IconButton, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { removeRestaurantFromDB } from "../store";
import ReviewsList from "../components/ReviewsList";
import AddNewReview from "../components/AddNewReview";


const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    margin: "0.5rem 0"
}));

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 7rem",
    backgroundColor: theme.palette.grey[100]
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.sectionTitle,
    borderBottom: `2px solid ${theme.palette.grey[300]}`
}));

const MyInfoBox = styled(Box)(({ theme }) => ({
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: "2rem",
    marginTop: "2rem"
}));

const MySpanText = styled("span")(({ theme }) => ({
    marginLeft: "0.5rem",
    color: theme.palette.text.secondary
}));

const MyLink = styled(Link)(() => ({
    textDecoration: "none",
    marginLeft: "0.5rem",
    "&:hover": {
        textDecoration: "underline"
    }
}));


function RestaurantDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const restaurants = useSelector(state => state.restaurants.restaurants);
    const restaurant = restaurants.find(r => r.id === id);
    const isRestaurantAuthor = user?.userId === restaurant?.creator.id;

    const [openModal, setOpenModal] = useState(false);

    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    if (!restaurant)
        return <></>

    return (
        <>
            <Title align="center">
                {restaurant.name}
                {isRestaurantAuthor &&
                    <IconButton
                        onClick={() =>
                        (navigate(
                            `/restaurants/${restaurant.id}/edit`,
                            { state: restaurant }
                        ))}>
                        <EditIcon />
                    </IconButton>}
                {isRestaurantAuthor &&
                    <IconButton
                        onClick={() => {
                            dispatch(removeRestaurantFromDB(restaurant.id))
                            navigate("/restaurants");
                        }}>
                        <DeleteIcon />
                    </IconButton>}
            </Title>
            <MainContainer>
                <Grid container
                    spacing={16}>
                    <Grid item
                        md={6}>
                        <SectionTitle>
                            Overview
                        </SectionTitle>
                        <Typography
                            color="text.secondary"
                            variant="body1"
                            sx={{ whiteSpace: 'pre-line' }}>
                            {restaurant.description}
                        </Typography>
                        <MyInfoBox>
                            <Typography>
                                Type: <MySpanText>
                                    {restaurant.type}
                                </MySpanText>
                            </Typography>
                            <Typography>
                                Website:
                                <MyLink
                                    to="#">
                                    {restaurant.website}
                                </MyLink>
                            </Typography>
                            <Typography>
                                Location:
                                <MySpanText>
                                    {restaurant.location}
                                </MySpanText>
                            </Typography>
                            <Typography>
                                Uploaded by:
                                <MySpanText>
                                    {restaurant.creator.username}
                                </MySpanText>
                            </Typography>
                        </MyInfoBox>
                    </Grid>
                    <Grid item
                        md={6}>
                        <ReviewsList
                            restaurant={restaurant}
                            userId={user.userId} />
                        <Button
                            startIcon={<AddIcon />}
                            onClick={showModal}
                            variant="contained"
                            disabled={!user?.token}
                            disableRipple>
                            Add Review
                        </Button>
                        <AddNewReview
                            open={openModal}
                            closeModal={closeModal}
                            restaurantId={restaurant.id} />
                    </Grid>
                </Grid>
            </MainContainer>
        </>
    );
}

export default RestaurantDetail;