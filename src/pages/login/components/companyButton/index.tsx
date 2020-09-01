import React, { ButtonHTMLAttributes } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: any;
    company: string;
}

const ButtonComponent: React.FC<ButtonProps> = (
    props,
    { onClick, ...rest }
) => {
    const { company, icon } = props;
    const classes = useStyles(props);

    return (
        <Button className={classes.button} onClick={onClick} /*{...rest}*/>
            <img
                src={icon}
                alt="company logo"
                style={{ width: 30, height: 'auto' }}
            />
            <Typography className={classes.text}>
                Entrar com{` ${company}`}
            </Typography>
        </Button>
    );
};

const useStyles = makeStyles<Theme, ButtonProps>(theme =>
    createStyles({
        button: {
            width: 280,
            height: 60,
            padding: '10px 10%',
            borderRadius: 10,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            transition: 'all .3s',
            '&:hover': {
                boxShadow: '3px 5px 10px rgb(0,0,0, .2)',
            },
        },
        text: {
            marginLeft: 10,
            color: '#707070',
            font: '500 16px Roboto',
            textTransform: 'none',
        },
    })
);

export default ButtonComponent;
