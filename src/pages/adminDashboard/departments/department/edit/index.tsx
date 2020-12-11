import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import {
    TypeDepartment,
    DepartmentModel,
    departmentApi,
} from '../../../../../services';
import TypeParams from '../../../../../models/params';
import useDepartment from '../../../../../hooks/useDepartment';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { validateDeparmentName } from '../validators/validateDepartmentName';
import AdminLayout from '../../../layout/departmentLayout';
import SubmitButton from '../../../../../components/mainButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import ErrorContent from '../../../../../components/errorContent/errorContent';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<TypeDepartment>();
    const history = useHistory();
    const params = useParams<TypeParams>();
    const { register, errors, handleSubmit, formState } = useForm<
        DepartmentModel
    >();
    const { company } = useCompany();
    const { department: departmentData, updateDepartment } = useDepartment();

    const handleDepartmentData = () => {
        console.log(location.state ? 'location' : 'dep');
        return location.state ? location.state : departmentData;
    };

    const departmentState = handleDepartmentData();
    const [department] = useState(departmentState);
    const [departmentChanged, setDepartmentChanged] = useState<boolean>(false);
    const [image, setImage] = useState<string | undefined>(
        departmentState?.image
    );

    useEffect(() => {
        if (departmentState) document.title = `${departmentState.name}/edição`;
    }, [departmentState]);

    useEffect(() => {
        const checkDepartmentChanged = () => {
            setDepartmentChanged(formState.isDirty);
        };
        checkDepartmentChanged();
    }, [formState]);

    const formSubmit = async (data: DepartmentModel) => {
        try {
            const response = await departmentApi.update(
                department!.departmentId,
                company!.companyId,
                data
            );
            updateDepartment(response.data);
            snackbarUtils.success('Departamento editado com sucesso');
            history.push(
                `/admin/${params.company}/departamentos/${params.department!}`
            );
        } catch (error) {
            snackbarUtils.error(error.message);
        }
    };

    return (
        <AdminLayout>
            {department && (
                <Paper className={classes.container}>
                    <Header
                        departmentName={departmentState!.name}
                        message="Cancelar edição"
                        page="edit"
                    />
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
                                <TextField
                                    data-cy="department-name"
                                    name="name"
                                    label="Nome"
                                    defaultValue={department.name}
                                    inputRef={register({
                                        required: 'Este campo é obrigatório',
                                        validate: AwesomeDebouncePromise(
                                            async value => {
                                                return (
                                                    (await validateDeparmentName(
                                                        company!.companyId,
                                                        value
                                                    )) ||
                                                    'Nome de departamento indisponível'
                                                );
                                            },
                                            500
                                        ),
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <ErrorContent message={message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputMask
                                    mask={'(99) 99999-9999'}
                                    maskChar="_"
                                >
                                    {() => (
                                        <TextField
                                            data-cy="department-phone"
                                            name="phone"
                                            label="Telefone"
                                            defaultValue={department.phone}
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
                                    defaultValue={department.email}
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
                                defaultValue={department.objective}
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
                                disabled={!departmentChanged}
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
