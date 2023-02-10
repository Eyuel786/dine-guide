import {
    List, ListItemButton, SwipeableDrawer,
    Toolbar, styled, ListItemText, ListItemIcon
} from "@mui/material";
import { Link, useLocation } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login";


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

const MyListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: "inherit"
}));

const MyListItemText = styled(ListItemText)(({ theme }) => ({
    ...theme.typography.tab,
    color: "inherit"
}));

const SignInBtn = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: theme.palette.common.yellow,
    color: theme.palette.grey[600],
    "&:hover": {
        backgroundColor: theme.palette.common.yellow
    },
    "&.Mui-selected": {
        color: '#fff',
        backgroundColor: theme.palette.common.yellow,
        "&:hover": {
            backgroundColor: theme.palette.common.yellow
        }
    }
}));

function AppDrawer(props) {
    const location = useLocation();
    const { openDrawer, closeDrawer, showDrawer, tabs } = props;
    const iOS =
        typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

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

    return (
        <MyDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={openDrawer}
            onOpen={showDrawer}
            onClose={closeDrawer} >
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
                    selected={t.route === location.pathname}>
                    <MyListItemIcon>
                        <MyIcon name={t.name} />
                    </MyListItemIcon>
                    <MyListItemText
                        primary={t.name}
                        disableTypography />
                </MyListItemButton>))}
                <SignInBtn
                    dense
                    disableRipple
                    component={Link}
                    to='/signin'
                    onClick={closeDrawer}
                    selected={location.pathname === '/signin'}>
                    <MyListItemIcon>
                        <LoginIcon />
                    </MyListItemIcon>
                    <MyListItemText
                        primary="Sign in"
                        disableTypography />
                </SignInBtn>
            </List>
        </MyDrawer>
    );
}

export default AppDrawer;