import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const EmptyCompanies = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box>
                <Typography
                    style={{
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 300,
                    }}
                >
                    Você não possui nenhuma empresa{' '}
                    <span role="img" aria-label="Crying Face">
                        😢
                    </span>
                </Typography>
                <Typography
                    style={{
                        color: 'white',
                        marginTop: 10,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                    }}
                >
                    Seja convidado para uma empresa ou crie a sua própria.
                </Typography>
            </Box>
        </Box>
    );
};

export default EmptyCompanies;
