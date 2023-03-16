import { Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";


const MyGridContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    bottom: 0,
    padding: "1rem 1.5rem"
}));

const MyGridItem = styled(Grid)(({ theme, color }) => ({
    ...theme.typography.tab,
    color: color || theme.palette.grey[400],
    textDecoration: "none",
    "&:hover": {
        cursor: "pointer"
    }
}));

const MyLogo = styled(Grid)(({ theme }) => ({
    ...theme.typography.h4,
    color: "#fff"
}));

function Footer() {
    const theme = useTheme();
    const location = useLocation();
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    const user = useSelector(state => state.auth.user);

    const [openedRoute, setOpenedRoute] = useState(false);
    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        setOpenedRoute(location.pathname);
        if (location.pathname === "/home" || matchesMd) {
            setShowFooter(false)
        } else {
            setShowFooter(true);
        }
    }, [location, matchesMd]);

    if (!showFooter)
        return <></>;

    return (
        <MyGridContainer
            container
            columnSpacing={30}
            alignItems="center">
            <MyLogo item>
                <span
                    style={{ color: theme.palette.secondary.main }}>
                    Dine
                </span>
                Guide
            </MyLogo>
            <Grid item>
                <Grid
                    container
                    columnSpacing={8}>
                    <MyGridItem
                        item
                        color={"/home" === openedRoute && "#fff"}
                        component={Link}
                        to="/home">
                        Home
                    </MyGridItem>
                    <Grid item>
                        <Grid container
                            direction="column"
                            rowSpacing={2}>
                            <MyGridItem
                                item
                                color={"/restaurants" === openedRoute && "#fff"}
                                component={Link}
                                to="/restaurants">
                                Restaurants
                            </MyGridItem>
                            {!!user?.token && <MyGridItem
                                item
                                color={"/restaurants/new" === openedRoute && "#fff"}
                                component={Link}
                                to="/restaurants/new">
                                Add Restaurant
                            </MyGridItem>}
                        </Grid>
                    </Grid>
                    <MyGridItem
                        item
                        color={"/about" === openedRoute && "#fff"}
                        component={Link}
                        to="/about">
                        About us
                    </MyGridItem>
                    <MyGridItem
                        item
                        color={"/contact" === openedRoute && "#fff"}
                        component={Link}
                        to="/contact">
                        Contact us
                    </MyGridItem>
                </Grid>
            </Grid>
        </MyGridContainer>
    );
}

export default Footer;