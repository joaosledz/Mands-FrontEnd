import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import GlobalCss from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
    return (
        <div className="App">
            <GlobalCss />
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </div>
    );
};

export default App;
