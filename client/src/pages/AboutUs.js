import { Box, Button, Grid, styled, Typography, useTheme } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { useNavigate } from "react-router-dom";


const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    margin: "0.5rem 0"
}));

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    padding: "2rem 7rem",
    backgroundColor: theme.palette.grey[100]
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.sectionTitle,
    borderBottom: `2px solid ${theme.palette.grey[300]}`
}));


function AboutUs() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Title
                align="center">
                About Us
            </Title>
            <MainContainer>
                <Grid container
                    spacing={8}>
                    <Grid item
                        md={6}
                        spacing={8}>
                        <SectionTitle>
                            Welcome to {" "}
                            <span
                                style={{ color: theme.palette.common.yellow }}>
                                Dine
                            </span>
                            Guide
                        </SectionTitle>
                        <Typography
                            color="text.secondary"
                            sx={{ whiteSpace: 'pre-line' }}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci id, quae dolorem fuga officiis
                            voluptates vero dolor minima qui autem numquam dolore neque?
                            Veniam adipisci accusantium assumenda commodi sed quia totam beatae repellat,
                            autem iste saepe laudantium iusto a.
                            {"\n\n"}
                            Doloribus aut voluptatibus odio temporibus, et quis animi minus saepe eaque ut nulla distinctio
                            fuga dolor sequi voluptas tempora aperiam, atque placeat ad qui. Molestiae aliquid et voluptatem
                            accusamus, ipsam at, laboriosam ea sunt minus nostrum ducimus sequi debitis dolor velit,
                            illo blanditiis quibusdam vero excepturi unde.
                            {"\n\n"}
                            Ad vel, quod neque corrupti ex libero, maxime voluptas,
                            pariatur reiciendis ullam aperiam at? Alias nostrum eum, enim vero
                            quam incidunt pariatur odio sed similique delectus?
                            Odit ipsa reiciendis, mollitia sequi repellat magnam exercitationem.
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<ArrowOutwardIcon />}
                            sx={{ m: "2rem 0" }}
                            onClick={() => navigate("/contact")}>
                            Contact us
                        </Button>
                    </Grid>
                </Grid>
            </MainContainer>
        </>
    );
}

export default AboutUs;