import {
    Box, Button, Card, CardActions, CardContent, CardMedia,
    CircularProgress, Grid, styled, Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";



const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 6rem",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    justifyContent: "center"
}));

const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    margin: "0.5rem 0"
}));

const MyLink = styled(Link)(() => ({
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline"
    }
}));

const CardsContainer = styled(Box)(({ theme }) => ({
    width: "50%",
    [theme.breakpoints.down("xl")]: {
        width: "70%"
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%"
    }
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    fontSize: "1.4rem"
}));

const CardSubtitle = styled(Typography)(({ theme }) => ({
    fontFamily: "Open Sans",
    margin: "0.3rem 0",
}));

const CtaBtn = styled(Button)(({ theme }) => ({
    fontSize: "0.95rem",
    marginLeft: "0.5rem"
}));

function RestaurantsList() {
    const navigate = useNavigate();
    const { restaurants, loading } = useSelector(state => state.restaurants);
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Title
                align="center">
                All Restaurants
            </Title>
            <MainContainer>
                {loading && <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <CircularProgress />
                </Box>}
                {!loading && !restaurants.length &&
                    <Typography>
                        No restaurants found {" "}
                        {user?.token && <MyLink
                            to="/restaurants/new">
                            Add Restaurant
                        </MyLink>}
                    </Typography>}
                {!loading && !!restaurants.length &&
                    <CardsContainer>
                        {restaurants.map(r =>
                        (<Card
                            key={r.name}
                            elevation={0}
                            sx={{ mb: 3 }}>
                            <Grid container>
                                <Grid item
                                    xs={12}
                                    md={5}>
                                    <CardMedia
                                        height="100%"
                                        component="img"
                                        src={`http://127.0.0.1:9000/api/${r.image}`} />
                                </Grid>
                                <Grid item
                                    xs={12}
                                    md={7}>
                                    <CardContent>
                                        <CardTitle>
                                            {r.name}
                                        </CardTitle>
                                        <CardSubtitle
                                            variant="subtitle1">
                                            {r.type}
                                        </CardSubtitle>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary">
                                            {r.description.split("\r")[0]}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <CtaBtn
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigate(`/restaurants/${r.id}`, { state: r })}
                                            disableRipple>
                                            View {r.name}
                                        </CtaBtn>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>))}
                    </CardsContainer>}
            </MainContainer>
        </>
    );
}

export default RestaurantsList;