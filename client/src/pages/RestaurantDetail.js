import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, styled, Box, IconButton, Button, Popover } from "@mui/material";
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
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.grey[100]
}));

const ContentContainer = styled(Box)(() => ({
    width: "50%",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 700,
    fontFamily: "Open Sans",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
    borderBottom: `2px solid ${theme.palette.grey[300]}`
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

    const [openPopover, setOpenPopover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    const showPopover = e => {
        setAnchorEl(e.currentTarget);
        setOpenPopover(true);
    }

    const closePopover = () => {
        setAnchorEl(null);
        setOpenPopover(false);
    }

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
                <ContentContainer>
                    <SectionTitle>
                        Overview
                    </SectionTitle>
                    <Typography
                        color="text.secondary"
                        variant="body1"
                        sx={{ whiteSpace: 'pre-line' }}>
                        {restaurant.description}
                    </Typography>
                    <ReviewsList
                        restaurant={restaurant}
                        userId={user.userId} />
                    <Button
                        startIcon={<AddIcon />}
                        onClick={showModal}
                        variant="contained"
                        disabled={!user?.token}
                        disableRipple
                    // onPointerEnter={showPopover}
                    // aria-owns={anchorEl ? "simple-popover" : undefined}
                    // aria-haspopup={anchorEl ? true : undefined}
                    >
                        Add Review
                    </Button>
                    <Popover
                        id="simple-popover"
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={closePopover}
                        PaperProps={{ onMouseLeave: closePopover }}>
                        <Typography>Message</Typography>
                    </Popover>
                    <AddNewReview
                        open={openModal}
                        closeModal={closeModal}
                        restaurantId={restaurant.id} />
                </ContentContainer>
            </MainContainer>
        </>
    );
}

export default RestaurantDetail;