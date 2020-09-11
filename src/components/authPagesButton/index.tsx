import React, { ButtonHTMLAttributes } from 'react';
// import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';
import { LogIn as LogInIcon } from '@styled-icons/feather';
import { Email as EmailIcon } from '@styled-icons/material-outlined';
import useStyles from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    mt?: number;
    mw?: number;
    mwt?: number;
    text: string;
    icon?: string;
}

interface ButtonIcon {
    icon: string | undefined;
}

const ButtonIcon: React.FC<ButtonIcon> = ({ icon }) => {
    switch (icon) {
        case 'email':
            return <EmailIcon size="28" color="white" />;
        default:
            return <LogInIcon size="25" color="white" />;
    }
};

const ButtonComponent: React.FC<ButtonProps> = (
    props,
    { type, onClick /*, ...rest*/ }
) => {
    const { text, icon } = props;
    const classes = useStyles(props);

    return (
        <Button
            type={type}
            className={classes.button}
            onClick={onClick} /*{...rest}*/
        >
            <Box id="left-side">
                <ButtonIcon icon={icon} />
            </Box>
            <Box id="right-side">
                <Typography className={classes.logInText}>{text}</Typography>
            </Box>
        </Button>
    );
};

export default ButtonComponent;
