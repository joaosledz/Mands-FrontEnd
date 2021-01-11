import React from 'react';
import useStyles from './styles';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage } from '@hookform/error-message';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

type Props = {
    Name: string;
    defaultValue?: string;
    register: () => void;
    errors: Object;
};
const User: React.FC<Props> = ({
    Name,
    defaultValue,
    /*register,*/ errors,
}) => {
    const classes = useStyles();

    return (
        <Grid>
            <TextField
                name={Name}
                label={Name}
                color="primary"
                defaultValue={defaultValue}
                // inputRef={register({
                //     required: 'Esse campo é obrigatório',
                // })}
            />
            <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => (
                    <Typography className={classes.ErrorMessage}>
                        {message}
                    </Typography>
                )}
            />
        </Grid>
    );
};

export default User;
