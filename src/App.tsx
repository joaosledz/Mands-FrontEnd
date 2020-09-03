import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import GlobalCss from './styles/global';

import Routes from './routes';
import Layout from './layout';

const App: React.FC = () => {
    return (
        <div className="App">
            <GlobalCss />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Routes />
                </Layout>
            </ThemeProvider>
        </div>
    );
};

export default App;
