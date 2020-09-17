import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@styled-icons/evaicons-solid';
import useStyles from './styles';
// import { Container } from './styles';

interface BackButtonProps {
    message: string;
}

const BackButton: React.FC<BackButtonProps> = ({ message }) => {
    const classes = useStyles();
    return (
        <Link to={'/'} className={classes.backButton}>
            <ArrowBackIcon size="25" />
            {message}
        </Link>
    );
};

export default BackButton;
