import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { Plus as PlusIcon } from '@styled-icons/entypo';

import useStyles from './styles';

type Props = {
    title?: string;
    icon?: 'plus';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void | ((path: string) => void);
};

const FabButton: React.FC<Props> = (props: Props) => {
    const { title = 'Adicionar', icon, size = 'small', onClick } = props;

    const classes = useStyles();

    const Icon = () => {
        switch (icon) {
            case 'plus':
                return <PlusIcon color="#B03E9F" style={{ width: 35 }} />;
            default:
                return <PlusIcon color="#B03E9F" style={{ width: 35 }} />;
        }
    };

    return (
        <Box className={classes.fabButtonContainer}>
            <Tooltip title={title} arrow>
                <Fab size={size} onClick={onClick}>
                    <Icon />
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default FabButton;
