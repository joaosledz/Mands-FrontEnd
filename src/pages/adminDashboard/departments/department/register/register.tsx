import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import InputMask from 'react-input-mask';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';

import { DepartmentModel, departmentApi } from '../../../../../services';
import { validateDeparmentName } from '../validators/validateDepartmentName';
import TypeParams from '../../../../../models/params';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import Backdrop from '../../../../../components/backdrop';
import IconSelection from '../../components/iconSelection/input';
import departmentAnimation from '../../../../../assets/animations/department.json';
import useStyles from './styles';

const NewDepartment: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const [image, setImage] = useState<string | undefined>('');
    const {
        register,
        errors,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState,
    } = useForm<DepartmentModel>({});
    const { company } = useCompany();

    useEffect(() => {
        document.title = 'Cadastrar Departamento';
    }, []);

    const watchName = watch('name');
    const formatName = (name: string) => name.split(' ').join('-');

    const onSubmit = (data: DepartmentModel) => {
        console.log(image);
        const auxData = { ...data, name: formatName(data.name) };
        departmentApi
            .create(company!.companyId, auxData)
            .then(response => {
                console.log(response);
                snackbarUtils.success('Departamento criado com sucesso');
                reset();
                setValue('phone', '');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar criar departamento');
            });
    };
    return (
        <Fragment>
            <Backdrop loading={formState.isSubmitting} />
            <AppLayout>
                <Paper className={classes.container}>
                    <Grid container>
                        <Hidden mdDown>
                            <Grid item xs={1} md={4} />
                        </Hidden>
                        <Grid container item xs={12} md={4} justify="center">
                            <Typography variant="h1" className={classes.title}>
                                Cadastrar Departamento
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} md={4} justify="flex-end">
                            <BackButton
                                message="Voltar para os departamentos"
                                redirect={`admin/${params.company}/departamentos`}
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={12}>
                        <Grid item xs={12} md={8} spacing={1}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid
                                    container
                                    spacing={3}
                                    className={classes.formContainer}
                                >
                                    <Grid item xs={12} md={3}>
                                        <IconSelection setImage={setImage} />
                                    </Grid>

                                    <Grid container item xs={12} md={9}>
                                        <Grid item xs={12} md={12}>
                                            <Tooltip
                                                title={`Este departamento será criado como ${
                                                    watchName
                                                        ? formatName(watchName!)
                                                        : null
                                                }`}
                                                open={
                                                    watchName
                                                        ? watchName.includes(
                                                              ' '
                                                          )
                                                        : false
                                                }
                                                arrow
                                                placement="top-start"
                                                color="primary"
                                            >
                                                <TextField
                                                    className={
                                                        classes.textFieldGrid
                                                    }
                                                    name="name"
                                                    label="Nome"
                                                    error={
                                                        errors.name !==
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.name
                                                            ? '⚠' +
                                                              errors?.name
                                                                  ?.message
                                                            : ''
                                                    }
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
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
                                        <Grid item xs={12} md={12}>
                                            <TextField
                                                className={
                                                    classes.textFieldGrid
                                                }
                                                name="email"
                                                label="Email"
                                                error={
                                                    errors.email !== undefined
                                                }
                                                helperText={
                                                    errors.email
                                                        ? '⚠' +
                                                          errors?.email?.message
                                                        : ''
                                                }
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
                                        <Grid item xs={12} md={12}>
                                            <InputMask
                                                mask={'(99) 99999-9999'}
                                                maskChar="_"
                                            >
                                                {() => (
                                                    <TextField
                                                        className={
                                                            classes.textFieldGrid
                                                        }
                                                        data-cy="department-phone"
                                                        name="phone"
                                                        error={
                                                            errors.phone !==
                                                            undefined
                                                        }
                                                        helperText={
                                                            errors.phone
                                                                ? '⚠' +
                                                                  errors?.phone
                                                                      ?.message
                                                                : ''
                                                        }
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
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            name="objective"
                                            label="Descrição"
                                            error={
                                                errors.objective !== undefined
                                            }
                                            helperText={
                                                errors.objective
                                                    ? '⚠' +
                                                      errors?.objective?.message
                                                    : ''
                                            }
                                            multiline
                                            rows={5}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xs={12}
                                    justify="center"
                                    className={classes.submitButtonContainer}
                                >
                                    <SubmitButton text="Cadastrar" />
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Lottie animationData={departmentAnimation} />
                        </Grid>
                    </Grid>
                </Paper>
            </AppLayout>
        </Fragment>
    );
};

export default NewDepartment;
