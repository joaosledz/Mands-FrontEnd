import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { DepartmentModel, departmentApi } from '../../../../../services';
import TypeParams from '../../../../../models/params';
import useDepartment from '../../../../../hooks/useDepartment';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import { validateDeparmentName } from '../validators/validateDepartmentName';
import formatName from '../functions/formatName';

import AdminLayout from '../../../layout/departmentLayout';
import SubmitButton from '../../../../../components/mainButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import DangerZone from '../../../components/dangerZone/dangerZone';
import DeleteModal from '../../../components/deleteModal/department';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    // const location = useLocation<TypeDepartment>();
    const history = useHistory();
    const params = useParams<TypeParams>();
    const { company } = useCompany();
    const { department, updateDepartment, setLoading } = useDepartment();

    const [image, setImage] = useState<string | undefined>(department?.image);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const {
        register,
        errors,
        handleSubmit,
        formState,
        setValue,
        watch,
    } = useForm<DepartmentModel>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    useEffect(() => {
        if (department) document.title = `${department.name}/edição`;
    }, [department]);

    useEffect(() => {
        const fillDefaultValues = () => {
            const data: Array<{
                name: keyof DepartmentModel;
                value: string | undefined;
            }> = [
                {
                    name: 'name',
                    value: department?.name,
                },
                {
                    name: 'email',
                    value: department?.email,
                },
                {
                    name: 'objective',
                    value: department?.objective,
                },
                {
                    name: 'phone',
                    value: department?.phone,
                },
            ];

            data.forEach(({ name, value }) => setValue(name, value));
        };

        if (department) fillDefaultValues();
    }, [department, setValue]);

    const watchName = watch('name');

    const formSubmit = async (data: DepartmentModel) => {
        setLoading(true);
        try {
            const auxData = { ...data, name: formatName(data.name) };
            const response = await departmentApi.update(
                department!.departmentId,
                company!.companyId,
                auxData
            );
            if (data.name !== department!.name)
                history.replace(
                    `/admin/${params.company}/departamentos/${data.name}/edicao`
                );
            // console.log(response.data);
            updateDepartment(response.data);
            snackbarUtils.success('Departamento editado com sucesso');
        } catch (error) {
            snackbarUtils.error(error.message);
        } finally {
            setLoading(false);
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
                    <Grid
                        component="form"
                        container
                        spacing={3}
                        className={classes.formContainer}
                        onSubmit={handleSubmit(formSubmit)}
                    >
                        <Grid container item xs={12} md={7} spacing={3}>
                            <Grid item xs={12} md={4}>
                                <IconSelectionInput
                                    image={image}
                                    setImage={setImage}
                                />
                            </Grid>

                            <Grid container item xs={12} md={8} spacing={3}>
                                <Grid item xs={12}>
                                    <Tooltip
                                        title={`Este departamento será criado como ${
                                            watchName
                                                ? formatName(watchName!)
                                                : null
                                        }`}
                                        open={
                                            watchName
                                                ? watchName.includes(' ')
                                                : false
                                        }
                                        arrow
                                        placement="top-start"
                                    >
                                        <TextField
                                            name="name"
                                            label="Nome"
                                            error={errors.name !== undefined}
                                            helperText={
                                                errors.name
                                                    ? '⚠' +
                                                      errors?.name?.message
                                                    : ''
                                            }
                                            inputProps={{
                                                'data-cy': 'department-name',
                                            }}
                                            inputRef={register({
                                                required:
                                                    'Este campo é obrigatório',
                                                validate: AwesomeDebouncePromise(
                                                    async value => {
                                                        return (
                                                            (await validateDeparmentName(
                                                                company!
                                                                    .companyId,
                                                                value
                                                            )) ||
                                                            'Nome de departamento indisponível'
                                                        );
                                                    },
                                                    500
                                                ),
                                            })}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputMask
                                        mask={'(99) 99999-9999'}
                                        maskChar="_"
                                        defaultValue={department.phone}
                                    >
                                        {() => (
                                            <TextField
                                                name="phone"
                                                label="Telefone"
                                                error={
                                                    errors.phone !== undefined
                                                }
                                                helperText={
                                                    errors.phone
                                                        ? '⚠' +
                                                          errors?.phone?.message
                                                        : ''
                                                }
                                                inputProps={{
                                                    'data-cy':
                                                        'department-phone',
                                                }}
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
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        error={errors.email !== undefined}
                                        helperText={
                                            errors.email
                                                ? '⚠' + errors?.email?.message
                                                : ''
                                        }
                                        inputProps={{
                                            'data-cy': 'department-email',
                                        }}
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                            pattern: {
                                                // eslint-disable-next-line
                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message:
                                                    'Deve seguir o formato nome@email.com',
                                            },
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={6}
                                        name="objective"
                                        label="Descrição"
                                        error={errors.objective !== undefined}
                                        helperText={
                                            errors.objective
                                                ? '⚠' +
                                                  errors?.objective?.message
                                                : ''
                                        }
                                        inputProps={{
                                            'data-cy': 'department-objective',
                                        }}
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                </Grid>
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
                        <Grid container item xs={12} md={5}>
                            <DangerZone
                                type="department"
                                modalIsOpen={openDeleteModal}
                                handleModal={setOpenDeleteModal}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            )}
            {company && department && (
                <DeleteModal
                    isOpen={openDeleteModal}
                    setIsOpen={setOpenDeleteModal}
                    company={company}
                    department={department}
                />
            )}
        </AdminLayout>
    );
};

export default Edit;
