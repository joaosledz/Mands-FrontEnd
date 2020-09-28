import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { UserGroup as UserGroupIcon } from '@styled-icons/heroicons-solid';
import { Plus as PlusIcon } from '@styled-icons/entypo';
import useStyles from './styles';

type Props = {
    icon: 'team' | 'document';
    actionIcon: 'add' | 'manage';
};

const AssignButton: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { icon, actionIcon } = props;

    const Icon = () => {
        switch (icon) {
            case 'team':
                return <UserGroupIcon color="#B03E9F" size={30} />;
            default:
                return <PlusIcon color="#B03E9F" style={{ width: 35 }} />;
        }
    };

    const ActionIcon = () => {
        switch (actionIcon) {
            case 'add':
                return <PlusIcon color="#B03E9F" size={20} />;
            default:
                return <PlusIcon color="#B03E9F" style={{ width: 35 }} />;
        }
    };

    return (
        <Button className={classes.button}>
            <Icon />
            <Paper id="paper">
                <ActionIcon />
            </Paper>
        </Button>
    );
};

export default AssignButton;
