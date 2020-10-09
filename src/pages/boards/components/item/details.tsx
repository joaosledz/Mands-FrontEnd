import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import 'react-image-crop/dist/ReactCrop.css';

import useStyles from './styles';

/**
 * Abre um modal que permite visualizar os detalhes de uma task.
 * @param {boolean} isOpen Boolean que indica a visibilidade do modal.
 * @param {object} setIsOpen Função que fecha o modal.
 **/
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
};
const ItemDetails: React.FC<Props> = props => {
    const { isOpen, setIsOpen, item } = props;

    const classes = useStyles();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '5%' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper className={classes.paper}>
                <Typography>{item.title}</Typography>
            </Paper>
        </Modal>
    );
};
export default ItemDetails;
