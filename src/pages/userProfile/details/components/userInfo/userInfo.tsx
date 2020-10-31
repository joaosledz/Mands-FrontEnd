import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import avatar from '../../../../../assets/fakeDataImages/employees/anaTartari.png';
import DataTextGridItem from '../../../../../components/dataTextGridItem';
import useStyles from './styles';

type Props = {
    name: string;
    username: string;
    email: string;
    phone: string;
};
const User: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { name, username, email, phone } = props;

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
                <DataTextGridItem title="Usuário" data={`@${username}`} />
                <DataTextGridItem title="Email" data={email} />
                <DataTextGridItem title="Telefone" data={phone} />
            </Grid>
        </Grid>
    );
};

export default User;
