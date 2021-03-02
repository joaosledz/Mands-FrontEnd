import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon } from '@styled-icons/material';
import MultableInput from '../../../multableInput/inputSubtask';
import { UpdateSubtaskType } from '../../../../../../services/models/task';
import { TypeSubTask } from '../../../../../../models/boardTypes';
import BoardContext from '../../../../../../contexts/board';
import { taskApi } from '../../../../../../services';
import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import company from '../../../../../company/selection/companySelection/company';

type Props = {
    subtasks: Array<{
        subtaskId: string;
        completed: boolean;
        description: string;
    }>;
    departmentId: number;
    projectId: number;
    companyId: number;
    taskId: string;
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            //   maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        taskTitle: {
            [theme.breakpoints.down('md')]: {
                fontSize: '0.7rem',
            },
        },
        icon: {
            color: 'gray',
            borderRadius: '20%',
            marginRight: '4px',
            width: '20px',
        },
    })
);

const CheckBoxList: React.FC<Props> = (props: Props) => {
    const { projectId, departmentId, companyId, taskId, subtasks } = props;
    const classes = useStyles();
    // const [subtasks, setSubTasks] = React.useState(props.subtasks);
    // const [checked, setChecked] = React.useState([0]);
    const { state, setState } = useContext(BoardContext);
    // const handleToggle = (value: number) => () => {
    //     console.log(value);
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };
    const handleToggle = (
        // value: number,
        index: number
    ) => {
        let newState = { ...state };
        newState.items[taskId].subtasks[index].completed = !newState.items[
            taskId
        ].subtasks[index].completed;

        setState(newState);
        updateSubtaskAPI(index);
    };
    const handleChangeDescription = (description: string, index: number) => {
        const newState = { ...state };
        newState.items[taskId].subtasks[index].description = description;

        setState(newState);
    };
    const deleteSubtask = (index: number) => {
        const newState = { ...state };
        deleteSubtaskAPI(state.items[taskId].subtasks[index].subtaskId);
        delete newState.items[taskId].subtasks[index];
        setState(newState);
    };
    const updateSubtaskAPI = (index: number) => {
        let data: UpdateSubtaskType = {
            departmentId,
            projectId,
            companyId,
            description: state.items[taskId].subtasks[index].description,
            completed: state.items[taskId].subtasks[index].completed,
            // [fieldName]: fieldContent,
        };
        taskApi
            .updateSubtask(state.items[taskId].subtasks[index].subtaskId, data)
            .then(response => {
                // console.log(response);
                snackbarUtils.success('Subtask editada com sucesso');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar editar subtask');
            });
    };
    const deleteSubtaskAPI = (subtaskId: string) => {
        taskApi
            .deleteSubtask(subtaskId, companyId, departmentId, projectId)
            .then(response => {
                // console.log(response);
                snackbarUtils.success('Subtask deletada com sucesso');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar deletar a subtask');
            });
    };

    return (
        <List className={classes.root} dense={true}>
            {subtasks.map((subtask: TypeSubTask, index: number) => {
                const labelId = `checkbox-list-label-${subtask.subtaskId}`;

                return (
                    <ListItem key={subtask.subtaskId} role={undefined} button>
                        <ListItemIcon onClick={() => handleToggle(index)}>
                            <Checkbox
                                edge="start"
                                // checked={checked.indexOf(index) !== -1}
                                checked={
                                    state.items[taskId].subtasks[index]
                                        .completed
                                }
                                // defaultChecked={subtask.completed}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <MultableInput
                            index={index}
                            value={
                                state.items[taskId].subtasks[index].description
                            }
                            valueSet={handleChangeDescription}
                            updateSubtaskAPI={updateSubtaskAPI}
                            id={subtask.subtaskId}
                            inputStyle={classes.taskTitle}
                            departmentId={departmentId}
                            projectId={projectId}
                            companyId={companyId}
                        />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <DeleteIcon
                                    className={classes.icon}
                                    onClick={() => deleteSubtask(index)}
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};
export default CheckBoxList;
