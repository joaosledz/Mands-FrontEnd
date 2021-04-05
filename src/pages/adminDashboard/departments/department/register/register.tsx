import React, { Fragment, useEffect, useState } from 'react';
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

import {
    DepartmentModel,
    departmentApi,
    imageApi,
    TypeIcon,
} from '../../../../../services';
import { validateDeparmentName } from '../validators/validateDepartmentName';
import formatName from '../functions/formatName';
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
    const [image, setImage] = useState<TypeIcon | undefined>();
    const [phone, setPhone] = useState<string>('');
    const { register, errors, handleSubmit, watch, reset, formState } = useForm<
        DepartmentModel
    >({});
    const { company } = useCompany();

    useEffect(() => {
        document.title = 'Cadastrar Departamento';
    }, []);

    const watchName = watch('name');

    const onSubmit = async (data: DepartmentModel) => {
        try {
            const auxData = { ...data, name: formatName(data.name) };

            const {
                data: { departmentId },
            } = await departmentApi.create(company!.companyId, auxData);

            if (image)
                await imageApi.associateToDep(
                    company!.companyId,
                    departmentId,
                    image.imageId
                );

            reset();
            setPhone('');
            setImage(undefined);
            snackbarUtils.success('Sucesso ao cadastrar departamento');
        } catch (err) {
            snackbarUtils.error('Erro ao tentar criar departamento');
        }
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
                            <BackButton message="Voltar" />
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
                                        <IconSelection
                                            setImage={setImage}
                                            image={image}
                                        />
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
                                            >
                                                <TextField
                                                    data-cy="department-name"
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
                                                    className={
                                                        classes.textFieldGrid
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
                                                data-cy="department-email"
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
                                                className={
                                                    classes.textFieldGrid
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
                                                value={phone}
                                                onChange={value =>
                                                    setPhone(value.target.value)
                                                }
                                            >
                                                {
                                                    //@ts-ignore
                                                    inputProps => (
                                                        <TextField
                                                            {...inputProps}
                                                            data-cy="department-phone"
                                                            name="phone"
                                                            label="Telefone"
                                                            error={
                                                                errors.phone !==
                                                                undefined
                                                            }
                                                            helperText={
                                                                errors.phone
                                                                    ? '⚠' +
                                                                      errors
                                                                          ?.phone
                                                                          ?.message
                                                                    : ''
                                                            }
                                                            className={
                                                                classes.textFieldGrid
                                                            }
                                                            inputRef={register({
                                                                minLength: {
                                                                    value: 15,
                                                                    message:
                                                                        'O número está incompleto',
                                                                },
                                                                validate: value =>
                                                                    value.replaceAll(
                                                                        '_',
                                                                        ''
                                                                    ).length ===
                                                                        15 ||
                                                                    'O número está incompleto',
                                                            })}
                                                        />
                                                    )
                                                }
                                            </InputMask>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            data-cy="department-description"
                                            name="objective"
                                            label="Descrição"
                                            multiline
                                            rows={5}
                                            error={
                                                errors.objective !== undefined
                                            }
                                            helperText={
                                                errors.objective
                                                    ? '⚠' +
                                                      errors?.objective?.message
                                                    : ''
                                            }
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
                        <Grid
                            item
                            xs={12}
                            md={4}
                            className={classes.animationContainer}
                        >
                            <Lottie animationData={departmentAnimation} />
                        </Grid>
                    </Grid>
                </Paper>
            </AppLayout>
        </Fragment>
    );
};

export default NewDepartment;
