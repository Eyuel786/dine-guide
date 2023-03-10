import {
    Modal, styled, IconButton, Grid, Typography,
    Box, useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";

import modalBackground from "../resources/images/modal-background.jpg";


const MyContainer = styled(Box)(({ theme, height }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    height: "66%",
    overflow: "scroll",
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
        width: "70%"
    }
}));

const MyGridContainer = styled(Grid)(() => ({
    height: "100%",
    width: "100%",
}));

const MyHeader = styled(Grid)(() => ({
    background: `url(${modalBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative"
}));

const MyOverlay = styled(Box)(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(20,20,5,0.6)"
}));

const MyHeaderTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    position: "absolute",
    color: "#fff",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}));

const MyBody = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

const MyTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    fontSize: "1.8rem",
    paddingLeft: "2rem"
}));


function MyModal(props) {
    const theme = useTheme();
    const { open, closeModal, children, title } = props;

    return (
        <Modal
            open={open}
            onClose={closeModal}
            sx={{ zIndex: theme.zIndex.modal + 10 }}>
            <MyContainer>
                <MyGridContainer container>
                    <MyHeader
                        item
                        xs={4}>
                        <MyOverlay />
                        <MyHeaderTitle>
                            <span
                                style={{ color: theme.palette.secondary.main }}>
                                Dine
                            </span>
                            Guide
                        </MyHeaderTitle>
                    </MyHeader>
                    <MyBody item xs={8}>
                        <IconButton
                            disableRipple
                            onClick={closeModal}
                            sx={{
                                display: "block",
                                ml: "auto"
                            }} >
                            <CloseIcon
                                fontSize="large" />
                        </IconButton>
                        <MyTitle
                            gutterBottom>
                            {title}
                        </MyTitle>
                        {children}
                    </MyBody>
                </MyGridContainer>
            </MyContainer>
        </Modal>
    );
}

export default MyModal;