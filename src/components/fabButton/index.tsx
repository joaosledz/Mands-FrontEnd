import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { Plus as PlusIcon } from '@styled-icons/entypo';
import { Edit as EditIcon } from '@styled-icons/material';
import { Settings as SettingsIcon } from '@styled-icons/material';

import useStyles from './styles';

type Props = {
    title?: string;
    icon?: 'plus' | 'edit' | 'settings';
    size?: 'small' | 'medium' | 'large';
    style?: string;
    onClick?: () => void;
};

const FabButton: React.FC<Props> = (props: Props) => {
    const { title = 'Adicionar', icon, size = 'small', style, onClick } = props;

    const classes = useStyles();

    const Icon = () => {
        switch (icon) {
            case 'plus':
                return <PlusIcon color="#B03E9F" size={35} />;
            case 'edit':
                return <EditIcon color="#B03E9F" size={30} />;
            case 'settings':
                return <SettingsIcon color="#B03E9F" size={30} />;
            default:
                return <PlusIcon color="#B03E9F" size={35} />;
        }
    };

    return (
        <Box
            className={
                style
                    ? [style, classes.fabButtonContainer].join(' ')
                    : classes.fabButtonContainer
            }
        >
            <Tooltip title={title} arrow>
                <Fab size={size} onClick={onClick}>
                    <Icon />
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default FabButton;
