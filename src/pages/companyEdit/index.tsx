import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import ReactInputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { companyApi, imageApi } from '../../services';
import useCompany from '../../hooks/useCompany';
import ProfilePic from '../../assets/fakeDataImages/employees/anaTartari.png';

import AppLayout from '../../layout/appLayout';
import BackButton from '../../components/backButton';
import CropImageInput from '../../components/cropImage/cropImageInput';
import SubmitButton from '../../components/mainButton';
import useStyles from './styles';
import SnackbarUtils from '../../utils/functions/snackbarUtils';

type CompanyModel = {
    name: string;
    phone: string;
    email: string;
};

const CompanyRegister: React.FC = () => {
    const classes = useStyles();
    const { company, updateCompany } = useCompany();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const { register, errors, handleSubmit } = useForm<CompanyModel>();

    useEffect(() => {
        document.title = 'Editar Empresa';
        console.log(company);
    }, [company]);

    const handleEditImage = async (image: File, newData: CompanyModel) => {
        const formData = new FormData();
        formData.append('imageData', image);
        setLoading(true);
        try {
            const response = await imageApi.post(formData, company!.companyId);
            const data = response.data;
            console.log(data);
            handleEditCompany(newData);
            // SnackbarUtils.success('Imagem de perfil editada com sucesso');
        } catch (error) {
            setLoading(false);
            SnackbarUtils.error('Não foi possível editar a imagem');
        }
    };
    const handleEditCompany = async (newData: CompanyModel) => {
        setLoading(true);
        try {
            const response = await companyApi.update(
                company!.companyId,
                newData
            );

            const data = response.data;
            console.log(data);
            updateCompany(data);

            setLoading(false);
            SnackbarUtils.success('Empresa editada com sucesso');
        } catch (error) {
            setLoading(false);
            SnackbarUtils.error('Não foi possível editar a empresa');
        }
    };

    const onSubmit = async (data: CompanyModel) => {
        if (image) handleEditImage(image, data);
        else handleEditCompany(data);
    };

    return (
        <AppLayout>
            {!loading ? (
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
                                            defaultValue={company!.name}
                                            data-cy="company-name"
                                            name="name"
                                            label="Nome"
                                            fullWidth
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={company!.username}
                                            disabled
                                            data-cy="company-username"
                                            name="username"
                                            label="Nome de Usuário"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={company!.email}
                                            fullWidth
                                            data-cy="company-email"
                                            name="email"
                                            label="Email"
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
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ReactInputMask
                                            mask={'(99) 99999-9999'}
                                            maskChar="_"
                                            defaultValue={company!.phone}
                                        >
                                            {() => (
                                                <TextField
                                                    fullWidth
                                                    data-cy="company-phone"
                                                    name="phone"
                                                    label="Telefone"
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
                                        <ErrorMessage
                                            errors={errors}
                                            name="phone"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={company!.cnpj}
                                            disabled
                                            data-cy="company-cnpj"
                                            name="cnpj"
                                            label="CNPJ"
                                            fullWidth
                                        />
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
                                    preview={company?.imagePath || ProfilePic}
                                    title="Logo da Empresa:"
                                    image={image}
                                    setImage={setImage}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justify="center">
                            <SubmitButton mt={100} text="Enviar" />
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <h1>Carregando...</h1>
            )}
        </AppLayout>
    );
};

export default CompanyRegister;
