import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    List, ListItemButton, SwipeableDrawer,
    Toolbar, styled, ListItemText, ListItemIcon
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { makeLogoutRequest } from "../store";


const MyDrawer = styled(SwipeableDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        backgroundColor: theme.palette.primary.main
    }
}));

const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.grey[500],
    "&.Mui-selected": {
        color: '#fff'
    }
}));

const MyListItemIcon = styled(ListItemIcon)(() => ({
    color: "inherit"
}));

const MyListItemText = styled(ListItemText)(({ theme }) => ({
    ...theme.typography.tab,
    color: "inherit"
}));

const MyAuthBtn = styled(ListItemButton)(({ theme }) => ({
    color: "#fff",
    backgroundColor: theme.palette.common.yellow,
    "&:hover": {
        backgroundColor: theme.palette.common.yellow
    }
}));

function AppDrawer(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const {
        openDrawer, closeDrawer, showDrawer,
        tabs, showAuthModal, user
    } = props;

    const iOS =
        typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openedRoute, setopenedRoute] = useState(false);

    const MyIcon = ({ name }) => {
        let icon;

        switch (name) {
            case "Home":
                icon = <HomeIcon />
                break;
            case "Restaurants":
                icon = <RestaurantIcon />
                break;
            case "Add Restaurant":
                icon = <CreateIcon />
                break;
            case "About us":
                icon = <InfoIcon />
                break;
            case "Contact us":
                icon = <PhoneIcon />
                break;
            default:
                icon = <></>
        }

        return icon;
    }

    useEffect(() => {
        setopenedRoute(location.pathname);
    }, [location]);

    return (
        <MyDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={openDrawer}
            onOpen={showDrawer}
            onClose={closeDrawer}>
            <Toolbar />
            <List
                disablePadding>
                {tabs.map(t =>
                (<MyListItemButton
                    dense
                    divider
                    disableRipple
                    key={t.name}
                    component={Link}
                    to={t.route}
                    onClick={closeDrawer}
                    selected={t.route === openedRoute}>
                    <MyListItemIcon>
                        <MyIcon name={t.name} />
                    </MyListItemIcon>
                    <MyListItemText
                        primary={t.name}
                        disableTypography />
                </MyListItemButton>))}
                {!user?.token &&
                    <MyAuthBtn
                        dense
                        disableRipple
                        onClick={() => {
                            closeDrawer();
                            showAuthModal();
                        }}>
                        <MyListItemIcon>
                            <LoginIcon />
                        </MyListItemIcon>
                        <MyListItemText
                            primary="Sign in"
                            disableTypography />
                    </MyAuthBtn>}
                {!!user?.token &&
                    <MyAuthBtn
                        dense
                        disableRipple
                        onClick={() => {
                            closeDrawer();
                            dispatch(makeLogoutRequest());
                        }}>
                        <MyListItemIcon>
                            <LogoutIcon />
                        </MyListItemIcon>
                        <MyListItemText
                            primary="Sign out"
                            disableTypography />
                    </MyAuthBtn>}
            </List>
        </MyDrawer>
    );
}

export default AppDrawer;