import React from 'react';
// import Container from '@material-ui/core/Container';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

interface Props extends ButtonProps {
    mt?: number;
    mw?: number;
    mwt?: number;
    hg?: number;
    text: string;
    dataCy?: string;
}

const ButtonComponent: React.FC<Props> = (props: Props) => {
    const { text, disabled, onClick, dataCy = 'submit-button' } = props;
    const classes = useStyles(props);

    return (
        <Button
            data-cy={dataCy}
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
