import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AppBar, Toolbar, styled, Button, Tabs, Tab,
    useTheme, useMediaQuery, IconButton, Avatar, Menu, MenuItem
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import AppDrawer from "./AppDrawer";
import AuthModal from "./AuthModal";
import { makeLogoutRequest } from "../store";


const MyAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.modal + 1
}));

const Title = styled(Button)(({ theme }) => ({
    ...theme.typography.h4,
    color: "#fff",
    padding: 0
}));

const MyTab = styled(Tab)(({ theme }) => ({
    ...theme.typography.tab
}));

const SignInBtn = styled(Button)(({ theme }) => ({
    color: "#fff",
    fontSize: '1rem',
    fontFamily: 'Open Sans',
    fontWeight: 700,
    padding: '0.4rem 1rem',
    backgroundColor: theme.palette.common.yellow,
    border: '0.5px solid #fff',
    '&:hover': {
        backgroundColor: theme.palette.common.yellow
    }
}));

const MyMenu = styled(Menu)(({ theme }) => ({
    zIndex: theme.zIndex.modal + 2,
    "& .MuiMenu-paper": {
        backgroundColor: theme.palette.primary.main
    }
}));

const MyMenuItem = styled(MenuItem)(({ theme }) => ({
    color: "#fff",
    "&:hover": {
        backgroundColor: theme.palette.primary.light
    }
}));

function Navbar() {
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector(state => state.auth.user);

    const tabs = useMemo(() => {
        const myTabs = [
            { name: 'Home', route: '/home' },
            { name: 'Restaurants', route: '/restaurants' },
            { name: 'About us', route: '/about' },
            { name: 'Contact us', route: '/contact' }
        ];

        if (user?.token) {
            myTabs.splice(
                2, 0, { name: 'Add Restaurant', route: '/restaurants/new' });
        }

        return myTabs;
    }, [user]);

    const [tabIndex, setTabIndex] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);

    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleTabChange = (e, newVal) => setTabIndex(newVal);

    const showDrawer = () => setOpenDrawer(true);
    const closeDrawer = () => setOpenDrawer(false);

    const showAuthModal = () => setOpenAuthModal(true);
    const closeAuthModal = () => setOpenAuthModal(false);

    const showMenu = e => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const closeMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    useEffect(() => {
        const index = tabs.findIndex(t => t.route === location.pathname);
        if (index >= 0) {
            setTabIndex(index)
        } else {
            setTabIndex(false);
        }
    }, [location, tabs]);

    return (
        <>
            <MyAppBar>
                <Toolbar
                    variant={matchesMd ? "dense" : "regular"}>
                    <Title
                        component={Link}
                        to='/home'
                        disableRipple>
                        <span
                            style={{ color: theme.palette.common.yellow }}>
                            Dine
                        </span>
                        Guide
                    </Title>
                    {!matchesMd &&
                        <Tabs
                            sx={{ ml: 'auto' }}
                            textColor="inherit"
                            indicatorColor="primary"
                            value={tabIndex}
                            onChange={handleTabChange}>
                            {tabs.map(t =>
                            (<MyTab
                                key={t.name}
                                label={t.name}
                                component={Link}
                                to={t.route}
                                disableRipple />))}
                        </Tabs>}
                    {!matchesMd && !user?.token &&
                        <SignInBtn
                            disableRipple
                            onClick={showAuthModal}>
                            Sign in
                        </SignInBtn>}
                    {!matchesMd && !!user?.token &&
                        <>
                            <Button
                                disableRipple
                                onClick={showMenu}
                                aria-owns={anchorEl ? "simple-menu" : undefined}
                                aria-haspopup={anchorEl ? true : undefined}>
                                <Avatar
                                    src={`http://127.0.0.1:9000/api/${user?.image.replace(/\\/g, "/")}`}>
                                    {user?.username.slice(0, 1)}
                                </Avatar>
                            </Button>
                            <MyMenu
                                id="simple-menu"
                                open={openMenu}
                                anchorEl={anchorEl}
                                onClose={closeMenu}
                                MenuListProps={{ onMouseLeave: closeMenu }}>
                                <MyMenuItem>
                                    <PersonIcon
                                        sx={{ mr: 2 }} />
                                    Profile
                                </MyMenuItem>
                                <MyMenuItem
                                    onClick={() => {
                                        closeMenu();
                                        dispatch(makeLogoutRequest());
                                    }}>
                                    <LogoutIcon
                                        sx={{ mr: 2 }} />
                                    Logout
                                </MyMenuItem>
                            </MyMenu>
                        </>}
                    <AuthModal
                        openModal={openAuthModal}
                        closeModal={closeAuthModal} />
                    {matchesMd &&
                        <>
                            <AppDrawer
                                openDrawer={openDrawer}
                                showDrawer={showDrawer}
                                closeDrawer={closeDrawer}
                                showAuthModal={showAuthModal}
                                user={user}
                                tabs={tabs} />
                            <IconButton
                                disableRipple
                                sx={{ ml: 'auto' }}
                                onClick={() => setOpenDrawer(!openDrawer)}>
                                <MenuIcon
                                    fontSize="large"
                                    sx={{ color: '#fff' }} />
                            </IconButton>
                        </>}
                </Toolbar>
            </MyAppBar>
            <Toolbar
                variant={matchesMd ? "dense" : "regular"} />
        </>
    );
}

export default Navbar;