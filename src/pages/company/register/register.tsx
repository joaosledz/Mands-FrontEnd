import React, { useState, useEffect, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ReactInputMask from 'react-input-mask';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useForm } from 'react-hook-form';
import { UserCheck as ValidUserIcon } from '@styled-icons/boxicons-regular';
import { UserX as InvalidUserIcon } from '@styled-icons/boxicons-regular';
import { useHistory } from 'react-router-dom';

import CNPJValidator from '../../../validators/cnpjValidator';
import { validateUsername } from './validators/validateUsername';
import useCompany from '../../../hooks/useCompany';
import { companyApi, imageApi, TypeCompany } from '../../../services';
import snackbarUtils from '../../../utils/functions/snackbarUtils';

import AppLayout from '../../../layout/appLayout';
import BackButton from '../../../components/backButton';
import CropImageInput from '../../../components/cropImage/cropImageInput';
import Backdrop from '../../../components/backdrop';
import SubmitButton from '../../../components/mainButton';
import useStyles from './styles';

type CompanyModel = {
    name: string;
    username: string;
    phone: string;
    email: string;
    cnpj?: string;
};

const CompanyRegister: React.FC = () => {
    const classes = useStyles();
    const { updateCompany } = useCompany();
    const history = useHistory();
    const { register, errors, handleSubmit, formState } = useForm<
        CompanyModel
    >();

    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        document.title = 'Cadastrar Empresa';
    }, []);

    const onSubmit = async (data: CompanyModel) => {
        let companyData: TypeCompany = {} as TypeCompany;

        try {
            const { data: response } = await companyApi.create(data);

            companyData = {
                ...response,
            };

            if (image) {
                const formData = new FormData();
                formData.append('imageData', image);

                const { data: imageResponse } = await imageApi.post(
                    formData,
                    response.companyId
                );
                companyData.imagePath = imageResponse.path;
            }

            updateCompany(companyData);
            history.goBack();
            snackbarUtils.success('Empresa criada com sucesso');
        } catch (error) {
            snackbarUtils.error(error.message);
        }
    };

    return (
        <Fragment>
            <Backdrop loading={formState.isSubmitting} />
            <AppLayout>
                <Paper elevation={3} className={classes.paper}>
                    <Grid
                        container
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container className={classes.header}>
                            <Grid item xs={12} sm={9} md={6}>
                                <Typography variant="h1" color="primary">
                                    Cadastrar uma empresa
                                </Typography>
                            </Grid>
                            <Hidden only="xs">
                                <Grid
                                    container
                                    item
                                    sm={3}
                                    md={6}
                                    justify="flex-end"
                                >
                                    <BackButton
                                        message="Voltar"
                                        redirect="escolha-da-empresa"
                                    />
                                </Grid>
                            </Hidden>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            className={classes.formContent}
                        >
                            <Grid
                                container
                                item
                                spacing={3}
                                xs={12}
                                md={9}
                                style={{ marginTop: 20 }}
                            >
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            data-cy="company-name"
                                            name="name"
                                            label="Nome"
                                            error={errors.name !== undefined}
                                            helperText={
                                                errors.name
                                                    ? '⚠ ' +
                                                      errors?.name?.message
                                                    : ''
                                            }
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            data-cy="company-username"
                                            name="username"
                                            label="Nome de Usuário"
                                            error={
                                                errors.username !== undefined
                                            }
                                            helperText={
                                                errors.username
                                                    ? '⚠ ' +
                                                      errors?.username?.message
                                                    : ''
                                            }
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                                validate: AwesomeDebouncePromise(
                                                    async value => {
                                                        return (
                                                            (await validateUsername(
                                                                value
                                                            )) ||
                                                            'Nome de usuário indisponível'
                                                        );
                                                    },
                                                    500
                                                ),
                                            })}
                                            InputProps={{
                                                endAdornment:
                                                    errors.username ===
                                                        undefined &&
                                                    formState.isDirty ? (
                                                        <InputAdornment position="end">
                                                            <ValidUserIcon
                                                                className={
                                                                    classes.iconValidUser
                                                                }
                                                            />
                                                        </InputAdornment>
                                                    ) : (
                                                        formState.isDirty && (
                                                            <InputAdornment position="end">
                                                                <InvalidUserIcon
                                                                    className={
                                                                        classes.iconInvalidUser
                                                                    }
                                                                />
                                                            </InputAdornment>
                                                        )
                                                    ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            data-cy="company-email"
                                            name="email"
                                            label="Email"
                                            error={errors.email !== undefined}
                                            helperText={
                                                errors.email
                                                    ? '⚠ ' +
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
                                    <Grid item xs={12} sm={6}>
                                        <ReactInputMask
                                            mask={'(99) 99999-9999'}
                                            maskChar="_"
                                        >
                                            {() => (
                                                <TextField
                                                    data-cy="company-phone"
                                                    name="phone"
                                                    label="Telefone"
                                                    error={
                                                        errors.phone !==
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.phone
                                                            ? '⚠ ' +
                                                              errors?.phone
                                                                  ?.message
                                                            : ''
                                                    }
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
                                                        minLength: {
                                                            value: 15,
                                                            message:
                                                                'O número está incompleto',
                                                        },
                                                    })}
                                                />
                                            )}
                                        </ReactInputMask>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <ReactInputMask
                                            mask={'99.999.999/9999-99'}
                                            maskChar="_"
                                        >
                                            {() => (
                                                <TextField
                                                    data-cy="company-cnpj"
                                                    name="cnpj"
                                                    label="CNPJ"
                                                    error={
                                                        errors.cnpj !==
                                                        undefined
                                                    }
                                                    helperText={
                                                        errors.cnpj
                                                            ? '⚠ ' +
                                                              errors?.cnpj
                                                                  ?.message
                                                            : ''
                                                    }
                                                    inputRef={register({
                                                        validate: {
                                                            cnpjInvalido: value =>
                                                                CNPJValidator(
                                                                    value
                                                                ),
                                                        },
                                                    })}
                                                />
                                            )}
                                        </ReactInputMask>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                component="aside"
                                className={classes.rightSide}
                                item
                                xs={12}
                                md={3}
                            >
                                <CropImageInput
                                    title="Logo da Empresa:"
                                    image={image}
                                    setImage={setImage}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justify="center">
                            <SubmitButton mt={100} text="Cadastrar empresa" />
                        </Grid>
                    </Grid>
                </Paper>
            </AppLayout>
        </Fragment>
    );
};

export default CompanyRegister;
