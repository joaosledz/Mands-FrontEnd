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
import MultableInput from '../../multableInput/multableInput';

type Props = {
        tasks: any;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    //   maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
            color: 'gray',
            borderRadius: '20%',
            marginRight: '4px',
            width: '20px',
           
        },
  }),
);

const CheckBoxList: React.FC<Props> = (props: Props) => {
  
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [tasks, setTasks] = React.useState(props.tasks);

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
  const handleChangeTitle = (title:string, id:string) => {
    let AuxTasks = {...tasks};  
    setTasks(AuxTasks)
  }

  return (
    <List className={classes.root} >
      {tasks.map((task: any) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
          <ListItem key={task.id} role={undefined} button >
            <ListItemIcon onClick={handleToggle(task.id)}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(task.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <MultableInput
                        value={task.title}
                        valueSet={handleChangeTitle}
                        id={task.id}
                    />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon className={classes.icon}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
export default CheckBoxList;