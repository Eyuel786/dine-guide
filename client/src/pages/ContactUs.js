import { Link } from "react-router-dom";
import { Box, Grid, styled, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import CallIcon from "@mui/icons-material/CallOutlined";
import WebIcon from "@mui/icons-material/WebOutlined";


const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    margin: "0.5rem 0"
}));

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 7rem",
    backgroundColor: theme.palette.grey[100]
}));

const MySectionTitle = styled(Typography)(() => ({
    fontWeight: 700,
    fontSize: "1.2rem",
    textTransform: "uppercase",
    margin: "0.5rem 0"
}));

const MyText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    whiteSpace: "pre-line"
}));

const MyLink = styled(Link)(() => ({
    textDecoration: "none",
    marginLeft: "0.1rem",
    "&:hover": {
        textDecoration: "underline"
    }
}));

function ContactUs() {

    return (
        <>
            <Title
                align="center">
                Contact Us
            </Title>
            <MainContainer>
                <Grid container>
                    <Grid container
                        spacing={4}
                        direction="column">
                        <Grid item>
                            <LocationOnIcon
                                fontSize="large" />
                            <MySectionTitle>
                                Address
                            </MySectionTitle>
                            <MyText>
                                123 Main Street, Suite 180{"\n"}
                                Farmington Hills, USA
                            </MyText>
                        </Grid>
                        <Grid item>
                            <CallIcon
                                fontSize="large" />
                            <MySectionTitle>
                                Contact Info
                            </MySectionTitle>
                            <MyText>
                                Phone: 01 234874 965478{"\n"}
                                Mobile: 01 654874 965478{"\n"}
                                Email: info@dineguide.com
                            </MyText>
                        </Grid>
                        <Grid item>
                            <WebIcon
                                fontSize="large" />
                            <MySectionTitle>
                                Website
                            </MySectionTitle>
                            <MyText>
                                Website: <MyLink to="#">www.dineguide.com</MyLink>{"\n"}
                                Facebook: <MyLink to="#">www.facebook.com/dineguide</MyLink>{"\n"}
                            </MyText>
                        </Grid>
                    </Grid>
                    <Grid item />
                </Grid>
            </MainContainer>
        </>
    );
}

export default ContactUs;