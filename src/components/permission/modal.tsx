import React, {
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useState,
    useCallback,
    Fragment,
} from 'react';

import { Paper, Modal, Grid, Typography, Avatar } from '@material-ui/core';
import SubmitButton from '../mainButton';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import snackbarUtils from '../../utils/functions/snackbarUtils';

import userIcon from '../../assets/icons/usericon.svg';
import {
    TypeMember,
    companyPermApi,
    TypeCompanyPermission,
} from '../../services';
import ChooseRole from './components/role/radio';
import RegisterPermissionModal from './components/register';
import useCompany from '../../hooks/useCompany';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    employee: TypeMember;
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, employee } = props;
    const { company, updateCompany } = useCompany();
    // const history = useHistory();

    const [roles, setRoles] = useState<TypeCompanyPermission[]>([]);
    const [permIsOpen, setPermIsOpen] = useState(false);
    const [roleValue, setRoleValue] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await companyPermApi.editUserPerm(
                company!.companyId,
                employee.userId,
                roleValue
            );

            updateCompany({ ...company! });
            snackbarUtils.success('Cargo Atualizado com sucesso');
        } catch (err) {
            if (err.response.status === 400) {
                snackbarUtils.error(err.response.data);
            } else {
                snackbarUtils.error('Erro ao atualizar cargo');
            }
        } finally {
            setLoading(false);
            handleCloseModal();
        }
    };

    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleValue(Number(event.target.value));
    };

    const handleOpenPermModal = useCallback(() => setPermIsOpen(true), []);
    const handleClosePermModal = useCallback(() => setPermIsOpen(false), []);

    useEffect(() => {
        const fetchRoles = async (company_id: number) => {
            try {
                const response = await companyPermApi.list(company_id);
                setRoles(response.data);
            } catch (error) {}
        };
        if (company) fetchRoles(company.companyId);
    }, [company]);

    useEffect(() => {
        if (employee && roles.length !== 0) {
            setRoleValue(
                employee.permissionId
                    ? employee.permissionId
                    : roles[0].compPermissionId
            );
        }
    }, [roles, employee]);

    return (
        <Fragment>
            <Modal
                className={classes.modal}
                open={isOpen}
                onClose={handleCloseModal}
                // style={{ paddingTop: '5%', minHeight: '400px' }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {employee && (
                    <>
                        <Grid
                            container
                            component={Paper}
                            className={classes.paper}
                            spacing={4}
                        >
                            <CloseIcon
                                className={classes.iconClose}
                                onClick={handleCloseModal}
                            />

                            <Grid
                                item
                                xs={12}
                                className={classes.title}
                                component={Typography}
                            >
                                Permissões de {employee.name}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.title}
                                component={Typography}
                            >
                                <Avatar
                                    variant="rounded"
                                    src={employee.image?.path || userIcon}
                                    className={classes.largeAvatar}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'left' }}>
                                <ChooseRole
                                    roleValue={roleValue}
                                    handleChangeRole={handleChangeRole}
                                    handleOpen={handleOpenPermModal}
                                    roles={roles}
                                />
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                className={classes.submitButton}
                            >
                                <SubmitButton
                                    text="Salvar"
                                    disabled={
                                        employee.permissionId === roleValue ||
                                        loading
                                    }
                                    onClick={handleSubmit}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Modal>
            <RegisterPermissionModal
                isOpen={permIsOpen}
                handleClose={handleClosePermModal}
            />
        </Fragment>
    );
};

export default memo(HiringModal);
