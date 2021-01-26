import React, {
    useState,
    useEffect,
    memo,
    useCallback,
    Fragment,
    ChangeEvent,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Slide from '@material-ui/core/Slide';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';

import {
    TypeMember,
    departmentPermApi,
    TypeDepartmentPermission,
} from '../../../../../../../services';
import useCompany from '../../../../../../../hooks/useCompany';
import useDepartment from '../../../../../../../hooks/useDepartment';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';

import SubmitButton from '../../../../../../../components/mainButton';
import Backdrop from '../../../../../../../components/backdrop';
import RegisterPermissionModal from '../../../../../permissions/register';
import ChooseRole from './roles';
import useStyles from './styles';

type Props = {
    isOpen: boolean;
    handleOpen: () => void;
    selectedValues?: TypeMember[];
    user: TypeMember;
};

const PermissionModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department } = useDepartment();
    const { isOpen, handleOpen, user } = props;

    const [permIsOpen, setPermIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [roles, setRoles] = useState<TypeDepartmentPermission[]>([]);
    const [selectedValueState, setSelectedValueState] = useState(
        user.permissionId
    );
    const [selectedValue, setSelectedValue] = useState(user.permissionId);

    useEffect(() => {
        const fetchRoles = async (
            company_id: number,
            department_id: number
        ) => {
            try {
                const response = await departmentPermApi.list(
                    company_id,
                    department_id
                );
                setRoles(response.data);
            } catch (error) {}
        };
        if (company && department)
            fetchRoles(company.companyId, department.departmentId);
    }, [company, department]);

    const handleOpenPermModal = useCallback(() => setPermIsOpen(true), []);
    const handleClosePermModal = useCallback(() => setPermIsOpen(false), []);

    const handleChangeRole = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            setSelectedValue(Number(event.target.value)),
        []
    );

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await departmentPermApi.changeUserPermission(
                company!.companyId,
                department!.departmentId,
                user.userId,
                selectedValue
            );
            setSelectedValueState(selectedValue);
            snackbarUtils.success('Associação realizada com sucesso');
        } catch (error) {
            snackbarUtils.error(error.message);
        } finally {
            setSubmitting(false);
            handleOpen();
        }
    };

    return (
        <Fragment>
            <Backdrop loading={submitting} />
            <Modal
                open={isOpen}
                onClose={handleOpen}
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
                        <Grid container alignItems="center">
                            <Grid item xs={2} />
                            <Grid container item xs={8} justify="center">
                                <Typography variant="h1">
                                    Permissões de {user.name}
                                </Typography>
                            </Grid>
                            <Grid container item xs={2} justify="flex-end">
                                <CloseIcon
                                    className={classes.iconClose}
                                    onClick={handleOpen}
                                />
                            </Grid>
                        </Grid>

                        <Grid id="avatar-container" container justify="center">
                            <Avatar
                                src={user.image}
                                variant="rounded"
                                alt={user.name}
                                className={classes.avatar}
                            />
                        </Grid>

                        <Grid
                            container
                            justify="center"
                            style={{ textAlign: 'left' }}
                        >
                            <ChooseRole
                                roles={roles}
                                roleValue={selectedValue}
                                handleChangeRole={handleChangeRole}
                                handleOpen={handleOpenPermModal}
                            />
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            className={classes.submitButton}
                        >
                            <SubmitButton
                                text="Associar"
                                disabled={selectedValue === selectedValueState}
                                onClick={handleSubmit}
                            />
                        </Grid>
                    </Grid>
                </Slide>
            </Modal>
            <RegisterPermissionModal
                isOpen={permIsOpen}
                handleClose={handleClosePermModal}
            />
        </Fragment>
    );
};

export default memo(PermissionModal);
