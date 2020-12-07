import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#B03E9F',
            main: '#8D297E',
            dark: '#802270',
            contrastText: '#FFF',
        },
        // secondary: {
        //     //   light: '#ff7961',
        //     main: '#B03E9F',
        //     //   dark: '#ba000d',
        //     //   contrastText: '#000',
        // },
        text: {
            secondary: '#606060',
        },
        background: {
            default: '#F5F5F5',
        },
    },
    typography: {
        fontFamily: ['Roboto Slab, Roboto'].join(','),
    },
    props: {
        MuiTextField: {
            variant: 'outlined',
            fullWidth: true,
        },
        // MuiInput: {
        //     variant: 'standard',
        // },
    },
});

export default theme;
