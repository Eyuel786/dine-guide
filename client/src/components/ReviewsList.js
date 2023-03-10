import moment from "moment";
import { Typography, styled, Grid, Avatar, Rating, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeReviewFromDB } from "../store";


const MyTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    fontSize: "1.5rem",
    padding: "2rem 0 1rem",
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
    marginBottom: "1rem"
}));

const MyReviewContainer = styled(Grid)(({ theme }) => ({
    marginBottom: "1rem",
    paddingBottom: "0.5rem"
}));

function ReviewsList(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { restaurant, userId } = props;

    const deleteReview = reviewId =>
    (dispatch(removeReviewFromDB(restaurant.id, reviewId))
        .then(() => console.log("Review deleted"))
        .catch(err => console.log("Error:", err.message)));

    return (
        <>
            <MyTitle
                gutterBottom>
                Reviews
            </MyTitle>
            {!restaurant.reviews?.length &&
                <Typography
                    color="text.secondary"
                    gutterBottom>
                    No reviews yet
                </Typography>}
            {!!restaurant.reviews?.length &&
                restaurant.reviews?.map((r, index) =>
                (<MyReviewContainer
                    container
                    key={r.id}
                    spacing={2}
                    sx={index < restaurant.reviews.length - 1 &&
                        { borderBottom: `2px solid ${theme.palette.grey[300]}` }}>
                    <Grid
                        item
                        sm={3}
                        sx={{ textAlign: "center" }}>
                        <Avatar
                            src={`http://127.0.0.1:9000/api/${r.creator.image}`}
                            sx={{ mx: "auto", mb: 1 }}>
                            {r.creator.username.slice(0, 1)}
                        </Avatar>
                        <Typography
                            gutterBottom>
                            {r.creator.username}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sm={9}>
                        <Rating
                            value={r.rating}
                            readOnly
                            sx={{ mb: 1 }} />
                        <Typography
                            color="text.secondary"
                            gutterBottom>
                            {r.comment}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="subtitle2"
                            gutterBottom>
                            {moment(r.createdAt).format("MMMM d, YYYY")}
                        </Typography>
                        {r.creator.id === userId &&
                            <Button
                                color="error"
                                variant="contained"
                                size="small"
                                disableRipple
                                onClick={() => deleteReview(r.id)}>
                                Delete
                            </Button>}
                    </Grid>
                </MyReviewContainer>))}
        </>
    );
}

export default ReviewsList;