import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import avatar from '../../../../../assets/fakeDataImages/employees/anaTartari.png';
import DataTextGridItem from '../../../../../components/dataTextGridItem';
import useStyles from './styles';

type Props = {
    name: string;
    // role: string;
    email: string;
    phone: string;
};
const User: React.FC<Props> = ({ name, /* role ,*/ email, phone }) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" spacing={2}>
            <Grid container item justify="center" xs={12} sm={4}>
                <Avatar className={classes.avatar} src={avatar} />
            </Grid>
            <Grid
                container
                item
                xs={12}
                sm={8}
                className={classes.UserDescription}
            >
                <Typography variant="h6" color="primary">
                    {name}
                </Typography>
                {/* <DataTextGridItem title="Cargo" data={role} /> */}
                <DataTextGridItem title="Email" data={email} />
                <DataTextGridItem title="Telefone" data={phone} />
            </Grid>
        </Grid>
    );
};

export default User;
