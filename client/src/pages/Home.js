import { useNavigate } from "react-router-dom";
import { Box, Button, styled, Typography, useTheme } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


import homeBackground from "../resources/images/home-background.jpg";

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 6rem",
    backgroundImage: `url(${homeBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    position: "relative"
}));

const MyOverlay = styled(Box)(() => ({
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));

const ContentContainer = styled(Box)(() => ({
    width: "30rem",
    position: "absolute",
    zIndex: 10,
    top: "50%",
    left: "50%",
    transform: `translate(-50%,-50%)`
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: "2rem",
    color: "#fff"
}));

const Title = styled(Typography)(() => ({
    fontFamily: "Open Sans",
    fontSize: "3.2rem",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "0.6rem"
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: "1.2rem",
    color: "#fff"
}));

const MyButton = styled(Button)(() => ({
    marginTop: "2rem",
    fontSize: "1rem"
}));

function Home() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <MainContainer>
            <MyOverlay />
            <ContentContainer>
                <WelcomeText>
                    Welcome to
                </WelcomeText>
                <Title
                >
                    <span
                        style={{ color: theme.palette.common.yellow }}>
                        Dine
                    </span>
                    Guide
                </Title>
                <DescriptionText>
                    A website that gives you restaurant recommendations
                </DescriptionText>
                <MyButton
                    size="large"
                    variant="contained"
                    onClick={() => navigate("/restaurants")}
                    endIcon={<ArrowOutwardIcon />}
                    disableRipple>
                    View Restaurants
                </MyButton>
            </ContentContainer>
        </MainContainer>
    );
}

export default Home;