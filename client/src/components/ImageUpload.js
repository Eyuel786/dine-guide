import { Box, Button, styled, Typography } from "@mui/material";


const MainContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center"
}));

const ImgContainer = styled(Box)(({ theme }) => ({
    width: "7rem",
    height: "7rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[500],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1rem"
}));

const MyImage = styled("img")(() => ({
    height: "100%",
    width: "100%",
    objectFit: "cover"
}));

const MyBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 700
}));

function ImageUpload(props) {
    const { imgPreviewUrl, handleImgFileChange } = props;

    return (
        <MainContainer>
            <ImgContainer>
                {!imgPreviewUrl &&
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        align="center"
                        sx={{ margin: "0.5rem" }}>
                        Please upload an image
                    </Typography>}
                {imgPreviewUrl &&
                    <MyImage
                        src={imgPreviewUrl}
                        alt="Profile" />}
            </ImgContainer>
            <MyBtn
                variant="outlined"
                color="secondary"
                component="label"
                disableRipple>
                Pick image
                <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={handleImgFileChange}
                    hidden />
            </MyBtn>
        </MainContainer>
    );
}

export default ImageUpload;