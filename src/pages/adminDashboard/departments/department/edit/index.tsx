import React, { useEffect, useState } from 'react';
import { /*useLocation,*/ useHistory, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Paper, Tooltip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { withStyles } from '@material-ui/core/styles';
import {
    // TypeDepartment,
    DepartmentModel,
    departmentApi,
} from '../../../../../services';
import TypeParams from '../../../../../models/params';
import useDepartment from '../../../../../hooks/useDepartment';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
// import AwesomeDebouncePromise from 'awesome-debounce-promise';
// import { validateDeparmentName } from '../validators/validateDepartmentName';
import AdminLayout from '../../../layout/departmentLayout';
import SubmitButton from '../../../../../components/mainButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import ErrorContent from '../../../../../components/errorContent/errorContent';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    // const location = useLocation<TypeDepartment>();
    const history = useHistory();
    const params = useParams<TypeParams>();
    const { company } = useCompany();
    const { department, updateDepartment } = useDepartment();

    const [image, setImage] = useState<string | undefined>(department?.image);

    const { register, errors, handleSubmit, formState } = useForm<
        DepartmentModel
    >({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            name: department?.name || '',
            email: department?.email || '',
            objective: department?.objective || '',
            phone: department?.phone || '',
        },
        // resolver: undefined,
        // context: undefined,
        // criteriaMode: 'firstError',
        // shouldFocusError: true,
        // shouldUnregister: true,
    });

    //Validação de nome de Departamento
    // const [departmentName, setDepartmentName] = useState(department!.name);
    // const [open, setOpen] = React.useState(true);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const SuccessTooltip = withStyles(() => ({
        tooltip: {
            backgroundColor: 'rgba(0, 160, 85, 0.884)',
            color: 'rgba(255, 255, 255, 0.87)',
            fontSize: 11,
        },
        arrow: {
            color: 'rgba(0, 160, 85, 0.884)',
        },
    }))(Tooltip);
    useEffect(() => {
        if (department) document.title = `${department.name}/edição`;
    }, [department]);

    const formSubmit = async (data: DepartmentModel) => {
        try {
            const response = await departmentApi.update(
                department!.departmentId,
                company!.companyId,
                data
            );
            console.log(response.data);
            updateDepartment(response.data);
            snackbarUtils.success('Departamento editado com sucesso');
            if (data.name != department!.name)
                history.replace(
                    `/admin/${params.company}/departamentos/${data.name}/edicao`
                );

            // reset();
            // history.push(
            //     `/admin/${params.company}/departamentos/${params.department!}`
            // );
        } catch (error) {
            snackbarUtils.error(error.message);
        }
    };

    return (
        <AdminLayout>
            {department && (
                <Paper className={classes.container}>
                    <Header
                        departmentName={department!.name}
                        message="Cancelar edição"
                        page="edit"
                    />
                    {/* <button
                        type="button"
                        onClick={() => {
                            trigger('name');
                        }}
                    >
                        Trigger
                    </button> */}
                    <Grid
                        component="form"
                        container
                        spacing={3}
                        className={classes.formContainer}
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <Grid item xs={12} md={2}>
                            <IconSelectionInput
                                image={image}
                                setImage={setImage}
                            />
                        </Grid>
                        <Grid container item xs={12} md={6} spacing={3}>
                            <Grid item xs={12} md={6}>
                                {/* <SuccessTooltip
                                    arrow
                                    open={!errors.name && formState.isDirty}
                                    title="dadasdas está disponível"
                                    placement="top"
                                > */}
                                <TextField
                                    data-cy="department-name"
                                    name="name"
                                    label="Nome"
                                    // onChange={() => trigger('name')}
                                    inputRef={register({
                                        required: 'Este campo é obrigatório',
                                        // validate: AwesomeDebouncePromise(
                                        //     async value => {
                                        //         return (
                                        //             (await validateDeparmentName(
                                        //                 company!.companyId,
                                        //                 value
                                        //             )) ||
                                        //             'Nome de departamento indisponível'
                                        //         );
                                        //     },
                                        //     5
                                        // ),
                                    })}
                                />
                                {/* </SuccessTooltip> */}
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <ErrorContent message={message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputMask mask={'(99) 99999-9999'} maskChar="">
                                    {() => (
                                        <TextField
                                            data-cy="department-phone"
                                            name="phone"
                                            label="Telefone"
                                            inputRef={register({
                                                minLength: {
                                                    value: 15,
                                                    message:
                                                        'O número está incompleto',
                                                },
                                            })}
                                        />
                                    )}
                                </InputMask>

                                <ErrorMessage
                                    errors={errors}
                                    name="phone"
                                    render={({ message }) => (
                                        <ErrorContent message={message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    data-cy="department-email"
                                    name="email"
                                    label="Email"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                        pattern: {
                                            // eslint-disable-next-line
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message:
                                                'Deve seguir o formato nome@email.com',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => (
                                        <ErrorContent message={message} />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                multiline
                                rows={6}
                                name="objective"
                                label="Descrição"
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                            />
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            className={classes.submitButtonContainer}
                        >
                            <SubmitButton
                                type="submit"
                                disabled={!formState.isDirty}
                                text="Salvar alterações"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </AdminLayout>
    );
};

export default Edit;
