import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './contexts/auth';
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
                    <AuthProvider>
                        <Routes />
                        <GlobalCss />
                    </AuthProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
