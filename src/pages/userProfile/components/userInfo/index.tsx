import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import avatar from '../../../../assets/avatar.png';
import DataTextGridItem from '../../../../components/dataTextGridItem';
// import { Container } from './styles';

type Props = {
    name: string;
    role: string;
    email: string;
    telephone: string;
};
const User: React.FC<Props> = ({ name, role, email, telephone }) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center">
            <Grid item>
                <Avatar className={classes.largeAvatar} src={avatar} />
            </Grid>
            <Grid item className={classes.UserDescriptionDiv}>
                <Typography variant="h6" className={classes.subtitle2}>
                    {name}
                </Typography>
                <DataTextGridItem title="Cargo" data={role} />
                <DataTextGridItem title="Email" data={email} />
                <DataTextGridItem title="Telefone" data={telephone} />
            </Grid>
        </Grid>
    );
};

export default User;
