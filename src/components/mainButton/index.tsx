import React, { ButtonHTMLAttributes } from 'react';
// import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    mt?: number;
    mw?: number;
    mwt?: number;
    text: string;
    icon?: string;
}

const ButtonComponent: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { text, disabled, onClick } = props;
    const classes = useStyles(props);

    return (
        <Button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            className={
                disabled
                    ? [classes.buttonDisabled, classes.baseButton].join(' ')
                    : [classes.button, classes.baseButton].join(' ')
            }
        >
            <Typography className={classes.buttonText}>{text}</Typography>
        </Button>
    );
};

export default ButtonComponent;
