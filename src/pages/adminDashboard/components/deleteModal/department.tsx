import React, {
    useState,
    Dispatch,
    SetStateAction,
    memo,
    ChangeEvent,
    Fragment,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import {
    TypeCompany,
    TypeDepartment,
    departmentApi,
} from '../../../../services';
import TypeParams from '../../../../models/params';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';
import useStyles from './styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    company: TypeCompany;
    department: TypeDepartment;
};

const DepartmentDeleteModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const history = useHistory();
    const { isOpen, setIsOpen, company, department } = props;

    const [submitting, setSubmitting] = useState(false);

    const [securityWord, setSecurityWord] = useState('');
    const correctWord = `${company.username}/${department.name}`;

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSecurityWord(event.currentTarget.value);
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            await departmentApi.delete(
                department!.departmentId,
                company!.companyId
            );
            snackbarUtils.success('Departamento deletado com sucesso');
            history.replace(`/admin/${params.company}/departamentos`);
        } catch (error) {
            console.log(error);
            snackbarUtils.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Fragment>
                <Backdrop className={classes.backdrop} open={submitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                    <Grid
                        container
                        component={Paper}
                        className={classes.paper}
                        spacing={3}
                    >
                        <Grid container alignItems="center">
                            <Grid
                                container
                                item
                                xs={10}
                                component={Typography}
                                variant="h1"
                            >
                                Você tem certeza?
                            </Grid>
                            <Grid container item xs={2} justify="flex-end">
                                <IconButton onClick={handleCloseModal}>
                                    <TimesIcon size={20} />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            component={Divider}
                            variant="fullWidth"
                            light
                        />

                        <Grid
                            container
                            className={classes.descriptionContainer}
                        >
                            <Typography>
                                Essa ação não pode ser desfeita. Essa ação vai
                                permanentemente deletar o departamento{' '}
                                <strong>{correctWord}</strong> e os projetos
                                contidos nele.
                            </Typography>

                            <Typography>
                                Por favor, digite abaixo{' '}
                                <strong>{correctWord}</strong> para confirmar a
                                exclusão.
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            component={TextField}
                            placeholder="Palavra de segurança"
                            size="small"
                            onChange={handleChange}
                            inputProps={{
                                'data-cy': 'security-word-input',
                            }}
                            className={classes.textField}
                        />

                        <Grid
                            data-cy="department-delete-button"
                            container
                            justify="center"
                            component={Button}
                            variant="outlined"
                            disabled={correctWord !== securityWord}
                            onClick={handleDelete}
                            // inputProps={{
                            //     'data-cy': 'department-email',
                            // }}
                            className={
                                correctWord === securityWord
                                    ? classes.button
                                    : [
                                          classes.button,
                                          classes.disabledButton,
                                      ].join(' ')
                            }
                        >
                            Deletar Departamento
                        </Grid>
                    </Grid>
                </Slide>
            </Fragment>
        </Modal>
    );
};

export default memo(DepartmentDeleteModal);
