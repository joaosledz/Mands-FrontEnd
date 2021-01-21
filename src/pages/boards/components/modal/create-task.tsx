import React, {
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
import { SubmitTaskType, taskApi, TypeDepartment } from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';
import useCompany from '../../../../hooks/useCompany';
import { useParams } from 'react-router-dom';
import TypeParams from '../../../../models/params';
import useDepartment from '../../../../hooks/useDepartment';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { register, errors, handleSubmit } = useForm<SubmitTaskType>({});
    const { company } = useCompany();
    const params = useParams<TypeParams>();
    const { getDepartmentData, department } = useDepartment();

    useEffect(() => {
        const handleDepartment = async () => {
            if (!department)
                await getDepartmentData(params.company, params.department!);
        };
        handleDepartment();
    }, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const onSubmit = (data: SubmitTaskType) => {
        data.departmentId = department!.departmentId;
        data.projectId = parseInt(params.project!);
        console.log(data);
        taskApi
            .create(company!.companyId, data)
            .then(response => {
                // console.log(response);
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
                                        rows={5}
                                        // className={classes.textFieldGrid}
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
