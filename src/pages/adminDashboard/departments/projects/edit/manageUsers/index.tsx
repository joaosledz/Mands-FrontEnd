import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TypeMember } from '../../../../../../services';
import AssignButton from '../../../components/assignButton';
import TeamCard from './teamCard';
import useStyles from './styles';
import AddUserModal from './addUser';

type Props = {
    team: TypeMember[];
};
const ManageUsersCard: React.FC<Props> = ({ team }) => {
    const classes = useStyles();

    const [addModal, setAddModal] = useState(false);

    return (
        <Fragment>
            <Grid
                container
                className={classes.assignContainer}
                alignItems="flex-start"
            >
                <Grid item xs={12} className={classes.header}>
                    <Typography variant="h2">Membros</Typography>
                    <AssignButton
                        icon="team"
                        actionIcon="add"
                        onClick={() => setAddModal(true)}
                    />
                </Grid>

                {team.map(teammate => (
                    <TeamCard teammate={teammate} />
                ))}
            </Grid>
            <AddUserModal isOpen={addModal} setIsOpen={setAddModal} />
        </Fragment>
    );
};

export default ManageUsersCard;
