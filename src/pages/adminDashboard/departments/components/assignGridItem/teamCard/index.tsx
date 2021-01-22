import React, { useState, useCallback, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';

import { TypeMember, departmentApi } from '../../../../../../services';
import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import Backdrop from '../../../../../../components/backdrop';
import useStyles from './styles';
import useCompany from '../../../../../../hooks/useCompany';
import useDepartment from '../../../../../../hooks/useDepartment';

type Props = {
    teammate: TypeMember;
};

const TeamCard: React.FC<Props> = ({ teammate }) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department, updateDepartment } = useDepartment();
    const { name, image, username, surname, userId } = teammate;

    const [submmiting, setSubmmiting] = useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleOpen = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            setOpen(!open);
        },
        [open]
    );

    const showRemoveButton = useCallback(() => setShow(true), []);
    const hideRemoveButton = useCallback(() => setShow(false), []);

    const handleRemove = useCallback(
        async (company_id: number, department_id: number, user_id: number) => {
            setSubmmiting(true);
            try {
                await departmentApi.dissociate(
                    company_id,
                    department_id,
                    user_id
                );
                updateDepartment({ ...department! }); // forçar re-renderização do AssignGridItem
                snackbarUtils.success('Usuário desassociado com sucesso');
                setOpen(false);
            } catch (error) {
                snackbarUtils.error(error.message);
            } finally {
                setSubmmiting(false);
            }
        },
        [department, updateDepartment]
    );

    return (
        <Fragment>
            <Backdrop loading={submmiting} />
            <Grid
                container
                item
                xs={12}
                sm
                className={classes.user}
                component={Button}
                onClick={() => {}}
                onMouseOver={showRemoveButton}
                onMouseLeave={hideRemoveButton}
            >
                <Avatar src={image} />
                <Typography>
                    {name} {surname}
                </Typography>
                <Zoom in={show}>
                    <IconButton
                        aria-label="delete"
                        className={classes.removeButton}
                        onClick={handleOpen}
                    >
                        <CloseIcon style={{ fontSize: '1rem' }} />
                    </IconButton>
                </Zoom>
            </Grid>
            <Dialog
                open={open}
                onClose={handleOpen}
                aria-labelledby="dialogo-de-confirmação-de-exclusão"
                aria-describedby="confirme-a-exclusão-desse-usuário-do-departamento"
            >
                <DialogTitle>
                    Deseja realmente retirar @{username} deste departamento?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A retirada deste usuário do departamento irá
                        dessassocia-lo dos projetos e tarefas atrelados a ele.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() =>
                            handleRemove(
                                company!.companyId,
                                department!.departmentId,
                                userId
                            )
                        }
                        color="primary"
                        autoFocus
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default TeamCard;
