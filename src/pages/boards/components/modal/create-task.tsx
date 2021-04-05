import React, { Dispatch, SetStateAction } from 'react';
import { TextField, Paper, Modal, Grid } from '@material-ui/core';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { useForm } from 'react-hook-form';
import { SubmitTaskType, taskApi } from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    departmentId: number;
    projectId: number;
    companyId: number;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, departmentId, projectId, companyId } = props;
    const { register, errors, handleSubmit } = useForm<SubmitTaskType>({});

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const onSubmit = (data: SubmitTaskType) => {
        data.departmentId = departmentId;
        data.projectId = projectId;
        console.log(data);
        taskApi
            .create(companyId, data)
            .then(response => {
                // console.log(response);
                handleCloseModal();
                snackbarUtils.success('Nova tarefa criada com sucesso');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar criar tarefa');
            });
    };

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleCloseModal}
            // style={{ paddingTop: '5%', minHeight: '400px' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            className={classes.formContainer}
                            spacing={3}
                        >
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        // className={classes.textFieldGrid}
                                        name="title"
                                        label="Título"
                                        error={errors.title !== undefined}
                                        helperText={
                                            errors.title
                                                ? '⚠' + errors?.title?.message
                                                : ''
                                        }
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={2}
                                        rowsMax={5}
                                        // className={classes.textFieldGrid}
                                        name="description"
                                        label="Descrição"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                justify="center"
                                className={classes.submitButtonContainer}
                            >
                                <SubmitButton text="Criar Tarefa" />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </>
        </Modal>
    );
};

export default NewTaskModal;
