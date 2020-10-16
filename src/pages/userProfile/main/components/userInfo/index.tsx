import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import avatar from '../../../../../assets/fakeDataImages/employees/anaTartari.png';
import DataTextGridItem from '../../../../../components/dataTextGridItem';
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
        <Grid container direction="row" justify="center" spacing={2}>
            <Grid container item justify="center" xs={12} sm={4}>
                <Avatar className={classes.largeAvatar} src={avatar} />
            </Grid>
            <Grid
                container
                item
                className={classes.UserDescriptionDiv}
                spacing={1}
                xs={12}
                sm={8}
            >
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
