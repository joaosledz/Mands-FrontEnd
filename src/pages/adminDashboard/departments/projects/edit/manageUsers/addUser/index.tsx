import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useCallback,
    Fragment,
    ChangeEvent,
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
    projectApi,
    TypeMember,
    TypeUserPerm,
    TypeProjectPermission,
    projectPermApi,
} from '../../../../../../../services';
import useCompany from '../../../../../../../hooks/useCompany';
import useDepartment from '../../../../../../../hooks/useDepartment';
import useProject from '../../../../../../../hooks/useProject';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';

import SubmitButton from '../../../../../../../components/mainButton';
import UserItem from './userItem';
import Autocomplete from './autocomplete';
import useStyles from './styles';
import ChooseRole from '../teamCard/permissionModal/roles';
import RegisterPermissionModal from '../teamCard/permissionModal/register';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedValues?: TypeMember[];
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department } = useDepartment();
    const { project, getEmployees } = useProject();
    const { isOpen, setIsOpen, selectedValues = [] } = props;

    const [permIsOpen, setPermIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [employees, setEmployees] = useState<TypeMember[]>([]);
    const [roles, setRoles] = useState<TypeProjectPermission[]>([]);
    const [selectedValue, setSelectedValue] = useState(0);

    const handleCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);
    const handleOpenPermModal = useCallback(() => setPermIsOpen(true), []);
    const handleClosePermModal = useCallback(() => setPermIsOpen(false), []);

    useEffect(() => {
        const fetchRoles = async (
            company_id: number,
            department_id: number,
            peroject_id: number
        ) => {
            try {
                const response = await projectPermApi.list(
                    company_id,
                    department_id,
                    peroject_id
                );
                setRoles(response.data);
            } catch (error) {}
        };
        if (company && department && project)
            fetchRoles(
                company.companyId,
                department.departmentId,
                project.projectId
            );
    }, [company, department, project]);

    useEffect(() => {
        if (roles.length !== 0) setSelectedValue(roles[0].projPermissionId);
    }, [roles]);

    const handleRemovePerson = useCallback(
        (index: number) => {
            const auxArray = [...employees];
            auxArray.splice(index, 1);
            setEmployees(auxArray);
        },
        [employees]
    );

    const handleChangeRole = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            setSelectedValue(Number(event.target.value)),
        []
    );

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const data: Array<TypeUserPerm> = [];
            employees.forEach(employee => {
                data.push({
                    permissionId: selectedValue,
                    userId: employee.userId,
                });
            });

            await projectApi.associateEmployees(
                project!.projectId,
                company!.companyId,
                department!.departmentId,
                data
            );

            await getEmployees(project!.projectId);
            snackbarUtils.success('Associação realizada com sucesso');
        } catch (error) {
            snackbarUtils.error(error.message);
        } finally {
            setSubmitting(false);
            handleCloseModal();
        }
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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
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
                            Associe alguém para este departamento
                        </Grid>

                        <Autocomplete
                            value={employees}
                            setValue={setEmployees}
                            selectedValues={selectedValues}
                        />
                        {employees.length !== 0 && (
                            <Grow in={employees.length !== 0} timeout={600}>
                                <Grid container>
                                    <Grid
                                        container
                                        className={classes.scrollPerson}
                                        spacing={3}
                                    >
                                        {employees.map((person, index) => (
                                            <UserItem
                                                key={person.userId}
                                                person={person}
                                                index={index}
                                                handleRemove={
                                                    handleRemovePerson
                                                }
                                            />
                                        ))}
                                    </Grid>
                                    <Grid
                                        container
                                        item
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
                                            dataCy="submit-button"
                                            text="Associar"
                                            disabled={employees.length === 0}
                                            onClick={handleSubmit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grow>
                        )}
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

export default memo(HiringModal);
