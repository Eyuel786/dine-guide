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
            beige: '#e9d8a6',
            red: '#ef233c',
            yellow: '#ffbd00'
        }
    },
    typography: {
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
        }
    }
});