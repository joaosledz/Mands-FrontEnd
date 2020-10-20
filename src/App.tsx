import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './contexts/auth';
import theme from './styles/theme';
import GlobalCss from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Routes />
                    <GlobalCss />
                </AuthProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
