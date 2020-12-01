import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import AppProviders from './contexts/providers';
import theme from './styles/theme';
import GlobalCss from './styles/global';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import Routes from './routes';
import { SnackbarUtilsConfigurator } from './utils/functions/snackbarUtils';

const snackBarOptions: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={4} anchorOrigin={snackBarOptions}>
                    <SnackbarUtilsConfigurator />
                    <AppProviders>
                        <Routes />
                        <GlobalCss />
                    </AppProviders>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
