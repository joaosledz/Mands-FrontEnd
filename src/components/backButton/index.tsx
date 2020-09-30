import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { ArrowBack as ArrowBackIcon } from '@styled-icons/evaicons-solid';

import useStyles from './styles';

type Props = {
    message: string;
    redirect?: string;
};

const BackButton: React.FC<Props> = ({ message, redirect = '' }) => {
    const classes = useStyles();
    return (
        <Link to={`/${redirect}`} className={classes.backButton}>
            <ArrowBackIcon size="25" />
            <Hidden mdDown>
                <Typography id="custom-message">{message}</Typography>
            </Hidden>
            <Hidden lgUp>
                <Typography id="default-message">Voltar</Typography>
            </Hidden>
        </Link>
    );
};

export default BackButton;
