import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    // memo,
    // useContext,
} from 'react';
import { TextField, Paper, Modal, Grid } from '@material-ui/core';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';
// import { Text as TextIcon } from '@styled-icons/entypo';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
// import BoardContext from '../../../../contexts/board';
import { useForm } from 'react-hook-form';
import { SubmitTaskType, taskApi } from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';
import useCompany from '../../../../hooks/useCompany';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { register, errors, handleSubmit } = useForm<SubmitTaskType>({});
    const { company } = useCompany();

    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const onSubmit = (data: SubmitTaskType) => {
        console.log(data);
        taskApi
            .create(company!.companyId, data)
            .then(response => {
                console.log(response);
                snackbarUtils.success('Nova tarefa criada com sucesso');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar criar task');
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
                            spacing={3}
                            className={classes.formContainer}
                        >
                            <Grid container item xs={12} md={9}>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        className={classes.textFieldGrid}
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
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        className={classes.textFieldGrid}
                                        name="description"
                                        label="Descrição"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
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
