import { createTheme } from "@mui/material";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#2f3e46'
        },
        secondary: {
            main: '#ffbd00'
        },
        common: {
            red: '#ef233c',
            yellow: '#ffbd00'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'Open Sans',
                    fontWeight: 700
                }
            }
        }
    },
    typography: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        allVariants: {
            textTransform: 'none'
        },
        h4: {
            fontFamily: 'Open Sans',
            fontWeight: 700
        },
        tab: {
            fontFamily: 'Open Sans',
            fontSize: '1rem',
            fontWeight: 700
        },
        sectionTitle: {
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: "Open Sans",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
        }
    }
});