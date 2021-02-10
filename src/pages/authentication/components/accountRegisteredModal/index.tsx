import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import MandsLogo from '../../../../assets/logo/mands.png';
import useStyles from './styles';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

const AccountRegisteredModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, handleClose } = props;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={3}
                >
                    <Grid container alignItems="center" component="header">
                        <Grid item xs={2} />
                        <Grid
                            container
                            item
                            xs={8}
                            justify="center"
                            alignItems="center"
                        >
                            <img src={MandsLogo} alt="logo do mands" />
                        </Grid>
                        <Grid container item xs={2} justify="flex-end">
                            <IconButton onClick={handleClose}>
                                <TimesIcon size={20} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container component={Typography} variant="h1">
                        Seja bem-vindo ao Mands.
                    </Grid>

                    <Grid container component={Typography}>
                        Sua conta foi criada com sucesso. Agora, basta fazer o
                        login e começar a utilizar.
                    </Grid>
                </Grid>
            </Slide>
        </Modal>
    );
};

export default memo(AccountRegisteredModal);
