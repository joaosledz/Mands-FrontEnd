import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { Plus as PlusIcon } from '@styled-icons/entypo';

import useStyles from './styles';

const AddButton: React.FC = () => {
    const classes = useStyles();
    return (
        <Box className={classes.addButtonContainer}>
            <Tooltip title="Adicionar" arrow>
                <Fab size="small" /*className={classes.addButton}*/>
                    <PlusIcon color="#B03E9F" style={{ width: 35 }} />
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default AddButton;
