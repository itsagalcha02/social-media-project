import { createTheme } from "@mui/material";

export const darkTheme = (mode = 'light') => createTheme({
    palette: {
        mode, // 'light' or 'dark'
        primary: {
            main: '#1976d2', // Facebook-like blue (adjust to your brand)
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#ff4081', // Instagram-like pink/accent
            light: '#ff79b0',
            dark: '#c60055',
        },
        background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
        text: {
            primary: mode === 'light' ? '#333333' : '#ffffff',
            secondary: mode === 'light' ? '#555555' : '#e0e0e0',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 600 },
        h3: { fontSize: '1.75rem', fontWeight: 500 },
        body1: { fontSize: '1rem', lineHeight: 1.5 },
        button: { textTransform: 'none', fontWeight: 500 }, // Disable ALL-CAPS buttons
    },
    spacing: 8, // Default spacing unit (8px grid)
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: '8px', padding: '8px 16px' }, // Rounded buttons
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }, // Softer shadows
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }, // Subtle header
            },
        },
    },
});