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
import MultableInput from '../../../multableInput/multableInput';
import { TypeSubTask } from '../../../../../../models/boardTypes';
import BoardContext from '../../../../../../contexts/board';

type Props = {
    subtasks: Array<{
        id: string;
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
    const { projectId, departmentId, companyId, taskId } = props;
    const classes = useStyles();
    const [subtasks, setSubTasks] = React.useState(props.subtasks);
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
        const newState = { ...state };
        newState.items[taskId].subtasks[index].completed = !newState.items[
            taskId
        ].subtasks[index].completed;

        setState(newState);
    };
    const handleChangeTitle = (title: string, id: string) => {
        let AuxTasks = [...subtasks];
        console.log(AuxTasks);
        setSubTasks(AuxTasks);
    };

    return (
        <List className={classes.root} dense={true}>
            {subtasks.map((subtask: TypeSubTask, index: number) => {
                const labelId = `checkbox-list-label-${subtask.id}`;

                return (
                    <ListItem key={subtask.id} role={undefined} button>
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
                            type="task"
                            value={subtask.description}
                            valueSet={handleChangeTitle}
                            id={subtask.id}
                            inputStyle={classes.taskTitle}
                            departmentId={departmentId}
                            projectId={projectId}
                            companyId={companyId}
                        />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <DeleteIcon className={classes.icon} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};
export default CheckBoxList;
