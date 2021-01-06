import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactInputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import TypeParams from '../../../../models/params';
import { companyApi, imageApi } from '../../../../services';
import useCompany from '../../../../hooks/useCompany';
import SnackbarUtils from '../../../../utils/functions/snackbarUtils';

import AppLayout from '../../../../layout/appLayout';
import BackButton from '../../../../components/backButton';
import CropImageInput from '../../../../components/cropImage/cropImageInput';
import SubmitButton from '../../../../components/mainButton';
import DangerZone from '../../components/dangerZone/dangerZone';
import DeleteModal from '../../components/deleteModal/company';
import useStyles from './styles';

type CompanyModel = {
    name: string;
    phone: string;
    email: string;
};

const CompanyEdit: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const { register, errors, handleSubmit, formState } = useForm<
        CompanyModel
    >();
    const { company, updateCompany, loading: companyLoading } = useCompany();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        company
            ? (document.title = `Empresa - ${company?.name}`)
            : (document.title = 'Carregando...');
        // console.log(company);
    }, [company]);

    const handleEditImage = async (image: File, newData: CompanyModel) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('imageData', image);

            await imageApi.post(formData, company!.companyId);
            // console.log(data);
            handleEditCompany(newData);
            // SnackbarUtils.success('Imagem de perfil editada com sucesso');
        } catch (error) {
            SnackbarUtils.error('Não foi possível editar a imagem');
        } finally {
            setLoading(false);
        }
    };

    const handleEditCompany = async (newData: CompanyModel) => {
        setLoading(true);
        try {
            const response = await companyApi.update(
                company!.companyId,
                newData
            );
            // console.log(response.data);
            updateCompany(response.data);
            SnackbarUtils.success('Empresa editada com sucesso');
        } catch (error) {
            SnackbarUtils.error('Não foi possível editar a empresa');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: CompanyModel) => {
        if (image) handleEditImage(image, data);
        else handleEditCompany(data);
    };

    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <AppLayout loading={companyLoading}>
                <Paper elevation={3} className={classes.paper}>
                    <Grid
                        container
                        alignItems="center"
                        className={classes.header}
                    >
                        <Hidden only="xs">
                            <Grid item sm={2} md={4} />
                        </Hidden>

                        <Grid
                            container
                            item
                            xs={12}
                            sm={8}
                            md={4}
                            alignItems="center"
                            justify="center"
                        >
                            <Typography variant="h1" color="primary">
                                Empresa - {company?.name}
                            </Typography>
                        </Grid>

                        <Hidden only="xs">
                            <Grid
                                container
                                item
                                sm={2}
                                md={4}
                                justify="flex-end"
                            >
                                <BackButton
                                    message="Voltar"
                                    redirect={`admin/${params.company}/detalhes`}
                                />
                            </Grid>
                        </Hidden>
                    </Grid>

                    {company && (
                        <Grid
                            container
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            spacing={3}
                            style={{ marginTop: '2rem' }}
                        >
                            <Grid container item xs={12} md={7} spacing={3}>
                                <Grid container item xs={12} md={4}>
                                    <CropImageInput
                                        preview={company?.imagePath}
                                        image={image}
                                        setImage={setImage}
                                    />
                                </Grid>
                                <Grid container item xs={12} md={8} spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            defaultValue={company.name}
                                            data-cy="company-name"
                                            name="name"
                                            label="Nome"
                                            error={errors.name !== undefined}
                                            helperText={
                                                errors.name
                                                    ? '⚠' +
                                                      errors?.name?.message
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
                                            defaultValue={company.username}
                                            disabled
                                            data-cy="company-username"
                                            name="username"
                                            label="Nome de Usuário"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            defaultValue={company.email}
                                            data-cy="company-email"
                                            name="email"
                                            label="Email"
                                            error={errors.email !== undefined}
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
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={12}>
                                        <ReactInputMask
                                            mask={'(99) 99999-9999'}
                                            maskChar="_"
                                            defaultValue={company.phone}
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
                                                            ? '⚠' +
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
                                    <Grid item xs={12}>
                                        <TextField
                                            defaultValue={company.cnpj}
                                            disabled
                                            data-cy="company-cnpj"
                                            name="cnpj"
                                            label="CNPJ"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justify="center">
                                    <SubmitButton
                                        mt={40}
                                        type="submit"
                                        text="Salvar alterações"
                                        disabled={!formState.isDirty}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={5}>
                                <DangerZone
                                    type="company"
                                    modalIsOpen={openDeleteModal}
                                    handleModal={setOpenDeleteModal}
                                    style={classes.dangerZone}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {company && (
                        <DeleteModal
                            isOpen={openDeleteModal}
                            setIsOpen={setOpenDeleteModal}
                            company={company}
                        />
                    )}
                </Paper>
            </AppLayout>
        </Fragment>
    );
};

export default CompanyEdit;
