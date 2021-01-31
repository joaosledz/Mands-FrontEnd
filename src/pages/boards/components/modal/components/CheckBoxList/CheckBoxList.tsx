import React from 'react';
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

type Props = {
    subtasks: Array<{
        id: string;
        completed: boolean;
        description: string;
    }>;
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
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [subtasks, setSubTasks] = React.useState(props.subtasks);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const handleChangeTitle = (title: string, id: string) => {
        let AuxTasks = [...subtasks];
        console.log(AuxTasks);
        setSubTasks(AuxTasks);
    };

    return (
        <List className={classes.root} dense={true}>
            {subtasks.map((task: TypeSubTask, index: number) => {
                const labelId = `checkbox-list-label-${task.id}`;

                return (
                    <ListItem key={task.id} role={undefined} button>
                        <ListItemIcon onClick={handleToggle(index)}>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        {/* <MultableInput
                            type="task"
                            value={task.description}
                            valueSet={handleChangeTitle}
                            id={task.id}
                            inputStyle={classes.taskTitle}
                            departmentId={departmentId}
                                            projectId={projectId}
                                            companyId={companyId}
                        /> */}

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
