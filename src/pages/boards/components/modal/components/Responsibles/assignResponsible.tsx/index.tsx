import React, {
    useState,
    // useEffect,
    Dispatch,
    SetStateAction,
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
    TypeEmployee,
    taskApi,
    SubmitResponsible,
} from '../../../../../../../services';
import useCompany from '../../../../../../../hooks/useCompany';
import useDeparment from '../../../../../../../hooks/useDepartment';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';
import { useParams } from 'react-router-dom';
import TypeParams from '../../../../../../../models/params';

import SubmitButton from '../../../../../../../components/mainButton';
import UserItem from './userItem';
import Autocomplete from './autocomplete';
import useStyles from './styles';
// import project from '../../../../../../adminDashboard/components/assignTeamModal/project';
// import department from '../../../../../../adminDashboard/components/deleteModal/department';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedValues?: TypeEmployee[];
    taskId: number;
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department } = useDeparment();
    const params = useParams<TypeParams>();
    const { isOpen, setIsOpen, selectedValues = [], taskId } = props;

    const [submitting, setSubmitting] = useState(false);
    const [employees, setEmployees] = useState<TypeEmployee[]>([]);

    const handleCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleRemovePerson = useCallback(
        (index: number) => {
            const auxArray = [...employees];
            auxArray.splice(index, 1);
            setEmployees(auxArray);
        },
        [employees]
    );
    const getEmploeesIds = () => {
        let arrayIds: number[] = [];
        employees.forEach(employee => {
            arrayIds.push(employee.userId);
        });
        return arrayIds;
    };
    const handleSubmit = async () => {
        setSubmitting(true);
        if (department && params.project) {
            try {
                let data: SubmitResponsible = {
                    userIds: getEmploeesIds(),
                    departmentId: department.departmentId,
                    projectId: parseInt(params.project),
                };

                await taskApi.associateResponsible(
                    company!.companyId,
                    data,
                    taskId
                );
                setEmployees([]);
                snackbarUtils.success('Associação realizada com sucesso');
            } catch (error) {
                snackbarUtils.error(error.message);
            } finally {
                setSubmitting(false);
            }
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
                            Adicione responsáveis por este cartão
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
                                        item
                                        xs={12}
                                        style={{ textAlign: 'left' }}
                                    ></Grid>
                                    <Grid
                                        container
                                        justify="center"
                                        className={classes.submitButton}
                                    >
                                        <SubmitButton
                                            text="Associar"
                                            // disabled={roles.length === 0}
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
