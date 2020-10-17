import React, {
    // useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;

    useEffect(() => {
        console.log('Entrou');
    }, [isOpen]);

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
            <Grid
                container
                component={Paper}
                className={classes.paper}
                spacing={3}
            >
                <Grid item xs={12}>
                    <Typography variant="h2">
                        Atribua pessoas para esse departamento:
                    </Typography>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default memo(NewTaskModal);
