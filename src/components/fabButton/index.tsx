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
};

const FabButton: React.FC<Props> = (props: Props) => {
    const { title = 'Adicionar', icon, size = 'small' } = props;

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
                <Fab size={size} /*className={classes.FabButton}*/>
                    <Icon />
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default FabButton;
