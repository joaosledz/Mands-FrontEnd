import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    memo,
    useCallback,
    Fragment,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { MailSend as MailSendIcon } from '@styled-icons/boxicons-regular';

import {
    TypeMember,
    TypeUser,
    companyApi,
    companyPermApi,
    TypeCompanyPermission,
    TypeCompAssociateModel,
} from '../../../../../services';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import SubmitButton from '../../../../../components/mainButton';
import UserItem from './userItem';
import Autocomplete from './autocomplete';
import ChooseRole from './roles';
import useStyles from '../styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedValues?: TypeMember[];
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { isOpen, setIsOpen, selectedValues = [] } = props;

    const [submitting, setSubmitting] = useState(false);
    const [employee, setEmployee] = useState<TypeUser | null>(null);
    const [roles, setRoles] = useState<TypeCompanyPermission[]>([]);
    const [selectedValue, setSelectedValue] = useState(0);

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
        if (roles.length !== 0) setSelectedValue(roles[0].compPermissionId);
    }, [roles]);

    const handleCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleRemovePerson = useCallback(() => setEmployee(null), []);

    const handleChangeRole = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            setSelectedValue(Number(event.target.value)),
        []
    );

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const data = [] as TypeCompAssociateModel[];
            data.push({
                permissionId: selectedValue,
                userId: employee!.userId,
            });
            await companyApi.associate(company!.companyId, data);
            snackbarUtils.success('Convite enviado');
        } catch (error) {
            snackbarUtils.error(error.message);
        } finally {
            setSubmitting(false);
        }
        handleCloseModal();
    };

    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={submitting}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                className={classes.modal}
                open={isOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-de-associação-de-um-usuário-a-uma-empresa"
                aria-describedby="realiza-o-convite-para-uma-empresa"
            >
                <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
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
                        <MailSendIcon className={classes.iconMain} />
                        <Grid
                            item
                            xs={12}
                            className={classes.title}
                            component={Typography}
                        >
                            Convide alguém para esta empresa
                        </Grid>

                        <Autocomplete
                            value={employee}
                            setValue={setEmployee}
                            selectedValues={selectedValues}
                        />
                        {employee && (
                            <Grow in={!!employee} timeout={600}>
                                <Grid container>
                                    <Grid
                                        container
                                        className={classes.scrollPerson}
                                        spacing={3}
                                    >
                                        <UserItem
                                            key={employee.userId}
                                            person={employee}
                                            handleRemove={handleRemovePerson}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{ textAlign: 'left' }}
                                    >
                                        <ChooseRole
                                            roles={roles}
                                            roleValue={selectedValue}
                                            handleChangeRole={handleChangeRole}
                                        />
                                    </Grid>
                                    <Grid
                                        container
                                        justify="center"
                                        className={classes.submitButton}
                                    >
                                        <SubmitButton
                                            text="Associar"
                                            disabled={roles.length === 0}
                                            onClick={handleSubmit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grow>
                        )}
                    </Grid>
                </Slide>
            </Modal>
        </Fragment>
    );
};

export default memo(HiringModal);
