import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { AddUser as AddUserIcon } from '@styled-icons/entypo';
import { Groups as TeamIcon } from '@styled-icons/material';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';
import useStyles from './styles';

// import employeesData from '../../../../../../utils/data/employees';
import { TypeTeam } from '../../../../../../models/department';
import AssignTeamModal from '../../../../../adminDashboard/components/assignTeamModal/project';

type Props = {
    teamData: Array<TypeTeam>;
    setTeamData: any;
};

const ChipsList: React.FC<Props> = (props: Props) => {
    const { teamData } = props;
    const history = useHistory();
    const classes = useStyles();
    // const [showAddMember, setShowAddMember] = useState(false);
    // const [allEmployees] = useState(employeesData);
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
    //   const [editable, setEditable] = useState<boolean>(false);
    const handleAssignTeamModal = () => {
        setShowTeamModal(true);
    };
    const handleDelete = (index: number) => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Grid container>
            <Grid item xs={1}>
                <TeamIcon className={classes.icon} />
            </Grid>
            <Grid
                item
                xs={11}
                component={Typography}
                className={classes.subtitle}
            >
                Responsáveis
            </Grid>
            <Grid
                container
                item
                xs={3}
                onClick={() => setShowTeamModal(true)}
                className={classes.button}
            >
                <Grid item xs={9}>
                    <Typography className={classes.subtitle}>
                        Nova tarefa
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <AddIcon className={classes.icon} />
                </Grid>
            </Grid>
            <div className={classes.root}>
                {teamData.map((employee, index) => (
                    <Chip
                        key={index}
                        avatar={
                            <Avatar alt={employee.name} src={employee.image} />
                        }
                        label={employee.name.split(' ', 1)}
                        onClick={() => history.push('/perfil')}
                        onDelete={() => handleDelete(index)}
                    />
                ))}

                <Box className={classes.addTeamIcon}>
                    <AddUserIcon onClick={handleAssignTeamModal} size={20} />
                </Box>
            </div>

            {/* {!disabled && category === 'team' && company && ( */}
            <AssignTeamModal
                isOpen={showTeamModal}
                setIsOpen={setShowTeamModal}
                selectedValues={[]}
            />
            {/* )} */}
        </Grid>
    );
};

export default ChipsList;
