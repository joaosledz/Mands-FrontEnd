import React, { useState, useCallback, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';

import { TypeMember, departmentApi } from '../../../../../../services';
import useCompany from '../../../../../../hooks/useCompany';
import useDepartment from '../../../../../../hooks/useDepartment';
import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import Backdrop from '../../../../../../components/backdrop';
import DeleteDialog from './deleteDialog';
import PermissionModal from './permissionModal';
import useStyles from './styles';

type Props = {
    teammate: TypeMember;
};

const TeamCard: React.FC<Props> = ({ teammate }) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department, updateDepartment } = useDepartment();
    const { name, image, surname, userId } = teammate;

    const [submmiting, setSubmmiting] = useState(false);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleOpenDialog = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            setDialogIsOpen(!dialogIsOpen);
        },
        [dialogIsOpen]
    );

    const handleOpenModal = useCallback(() => {
        setModalIsOpen(!modalIsOpen);
    }, [modalIsOpen]);

    const showRemoveButton = useCallback(() => setShow(true), []);
    const hideRemoveButton = useCallback(() => setShow(false), []);

    const handleRemove = useCallback(async () => {
        setSubmmiting(true);
        try {
            await departmentApi.dissociate(
                company!.companyId,
                department!.departmentId,
                userId
            );
            updateDepartment({ ...department! }); // forçar re-renderização do AssignGridItem
            snackbarUtils.success('Usuário desassociado com sucesso');
            setDialogIsOpen(false);
        } catch (error) {
            snackbarUtils.error(error.message);
        } finally {
            setSubmmiting(false);
        }
    }, [company, department, updateDepartment, userId]);

    return (
        <Fragment>
            <Backdrop loading={submmiting} />
            <Grid
                data-cy="user-card-button"
                container
                item
                xs={12}
                sm
                className={classes.user}
                component={Button}
                onClick={handleOpenModal}
                onMouseOver={showRemoveButton}
                onMouseLeave={hideRemoveButton}
            >
                <Avatar src={image?.path || undefined} />
                <Typography>
                    {name} {surname}
                </Typography>
                <Zoom in={show}>
                    <IconButton
                        data-cy="disassociate-button"
                        aria-label="delete"
                        className={classes.removeButton}
                        onClick={handleOpenDialog}
                    >
                        <CloseIcon style={{ fontSize: '1rem' }} />
                    </IconButton>
                </Zoom>
            </Grid>
            <PermissionModal
                isOpen={modalIsOpen}
                user={teammate}
                handleOpen={handleOpenModal}
            />
            <DeleteDialog
                open={dialogIsOpen}
                user={teammate}
                handleOpen={handleOpenDialog}
                handleRemove={handleRemove}
            />
        </Fragment>
    );
};

export default TeamCard;
