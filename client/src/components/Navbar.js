import { useEffect, useState, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AppBar, Toolbar, styled, Button, Tabs, Tab,
    useTheme, useMediaQuery, IconButton
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import AppDrawer from "./AppDrawer";


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

const SignInBtn = styled(Button)(({ theme, mycolor }) => ({
    color: mycolor || theme.palette.grey[600],
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

function Navbar() {
    const theme = useTheme();
    const location = useLocation();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const tabs = useMemo(() => {
        return [
            { name: 'Home', route: '/home' },
            { name: 'Restaurants', route: '/restaurants' },
            { name: 'Add Restaurant', route: '/restaurants/new' },
            { name: 'Contact us', route: '/contact' },
            { name: 'About us', route: '/about' }
        ];
    }, []);

    const [tabIndex, setTabIndex] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleTabChange = (e, newVal) => setTabIndex(newVal);
    const showDrawer = () => setOpenDrawer(true);
    const closeDrawer = () => setOpenDrawer(false);

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
                    {!matchesMd &&
                        <SignInBtn
                            disableRipple
                            component={Link}
                            to='/signin'
                            mycolor={
                                location.pathname === '/signin' ?
                                    "#fff" :
                                    undefined}>
                            Sign in
                        </SignInBtn>}
                    {matchesMd &&
                        <>
                            <AppDrawer
                                openDrawer={openDrawer}
                                showDrawer={showDrawer}
                                closeDrawer={closeDrawer}
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