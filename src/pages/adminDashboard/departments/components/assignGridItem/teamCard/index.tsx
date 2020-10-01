import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { TypeTeam } from '../../../../../../components/departments/models/department';

import useStyles from './styles';

type Props = {
    teammate: TypeTeam;
};

const TeamCard: React.FC<Props> = ({ teammate }) => {
    const classes = useStyles();
    const { name, image } = teammate;

    return (
        <Grid
            component={Link}
            to="/perfil/GuilhermeSimoes"
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
        >
            <Avatar src={image} />
            <Typography className={classes.name}>{name}</Typography>
        </Grid>
    );
};

export default TeamCard;
