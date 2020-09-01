import { withStyles } from '@material-ui/core/styles';

const GlobalCss = withStyles({
    '@global': {
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
    },
})(() => null);

export default GlobalCss;
