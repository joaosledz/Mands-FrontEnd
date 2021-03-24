import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import { AddUser as AddUserIcon } from '@styled-icons/entypo';
import { Groups as TeamIcon } from '@styled-icons/material';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';
import useStyles from '../../styles';
import BoardContext from '../../../../../../contexts/board';
// import employeesData from '../../../../../../utils/data/employees';
import { TypeTeam } from '../../../../../../models/department';
// import { taskApi } from '../../../../../../services';
import AssignTeamModal from './assignResponsible.tsx';
import { TypeResponsible } from '../../../../../../models/boardTypes';
// import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';

type Props = {
    teamData: Array<TypeTeam>;
    setTeamData: any;
    taskId: string;
};

const ChipsList: React.FC<Props> = (props: Props) => {
    const { taskId } = props;
    const history = useHistory();
    const classes = useStyles();
    const { state /*setTaskFields*/ } = useContext(BoardContext);
    // const [showAddMember, setShowAddMember] = useState(false);
    // const [allEmployees] = useState(employeesData);
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
    //   const [editable, setEditable] = useState<boolean>(false);
    const handleDelete = async (index: number) => {
        console.info('You clicked the delete icon.');

        //         if (department && company && params.project) {
        // try {
        //     const { data: response } = await taskApi.deleteResponsible(
        //         params.project
        //     );
        //     console.log(response);
        //     }
        // } catch (error) {
        //     snackbarUtils.error(error.message);
        // }
        // }
    };
    return (
        <Grid container>
            <Grid item xs={1}>
                <TeamIcon className={classes.icon} />
            </Grid>
            <Grid
                item
                xs={7}
                component={Typography}
                className={classes.subtitle}
            >
                Responsáveis
            </Grid>
            <Grid
                container
                item
                xs={4}
                onClick={() => setShowTeamModal(true)}
                className={classes.button}
            >
                <Grid item xs={9}>
                    <Typography className={classes.subtitle}>
                        Novo responsável
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <AddIcon className={classes.icon} />
                </Grid>
            </Grid>
            {state.items[taskId].responsibles ? (
                <div className={classes.root}>
                    {state.items[taskId].responsibles.map(
                        (employee: TypeResponsible, index: number) => (
                            <Chip
                                key={index}
                                avatar={
                                    <Avatar
                                        alt={
                                            employee.name +
                                            ' ' +
                                            employee.surname
                                        }
                                        src={employee.image?.path || undefined}
                                    />
                                }
                                label={
                                    employee.name.split(' ', 1) +
                                    ' ' +
                                    employee.surname.split(' ', 1)
                                }
                                onClick={() => history.push('/perfil')}
                                onDelete={() => handleDelete(index)}
                                variant="outlined"
                            />
                        )
                    )}
                </div>
            ) : (
                <Grid container xs={12} justify="center">
                    <Grid
                        item
                        component={Typography}
                        className={classes.notFoundText}
                    >
                        Ainda não há responsáveis por este card
                    </Grid>
                </Grid>
            )}

            {/* <Box className={classes.addTeamIcon}>
                <AddUserIcon onClick={handleAssignTeamModal} size={20} />
            </Box> */}

            {/* {!disabled && category === 'team' && company && ( */}
            <AssignTeamModal
                isOpen={showTeamModal}
                setIsOpen={setShowTeamModal}
                selectedValues={state.items[taskId].responsibles || []}
                taskId={parseInt(taskId.replace('task_', ''))}
            />
            {/* )} */}
        </Grid>
    );
};

export default ChipsList;
