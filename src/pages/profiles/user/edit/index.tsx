import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { validLink } from './components/functions/validLink';
import InputMask from 'react-input-mask';
// import CpfValidator from '../../../validators/cpfValidator';

import { updateModel, authApi, imageApi } from '../../../../services';
import useAuth from '../../../../hooks/useAuth';
import SnackbarUtils from '../../../../utils/functions/snackbarUtils';

import AppLayout from '../../../../layout/appLayout';
import BackButton from '../../../../components/backButton';
import RegisterButton from '../../../../components/mainButton';
import Backdrop from '../../../../components/backdrop';
import CropImageInput from '../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    const { user, updateUser } = useAuth();
    const { register, errors, handleSubmit, formState, setError } = useForm<
        updateModel
    >();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        document.title = 'Editar Perfil';
    }, []);

    const handleEditUser = useCallback(
        async (newData: updateModel) => {
            try {
                setLoading(true);
                const { data } = await authApi.update(newData);
                // console.log(data);
                updateUser(data);
                SnackbarUtils.success('Perfil editado com sucesso');
            } catch (error) {
                SnackbarUtils.error('Não foi possível editar o perfil');
            } finally {
                setLoading(false);
            }
        },
        [updateUser]
    );

    const handleEditImage = useCallback(
        async (image: File, newData: updateModel) => {
            const formData = new FormData();
            formData.append('imageData', image);
            try {
                setLoading(true);
                await imageApi.post(formData);
                handleEditUser(newData);
            } catch (error) {
                SnackbarUtils.error('Não foi possível editar a imagem');
            }
        },
        [handleEditUser]
    );
    // por algum motivo, o isDirty da linha 72, só está funcionando corretamente com este console.log
    console.log(formState.isDirty);
    const onSubmit = (data: updateModel) => {
        handleErrors(data);
        const dataAux = validLink(data);

        if (image) handleEditImage(image, dataAux);
        else if (formState.isDirty) handleEditUser(dataAux);
        else SnackbarUtils.info('Modifique algum campo.');
    };

    const handleErrors = (data: updateModel) => {
        if (!data.gitHub.includes('github.com/') && data.gitHub.length !== 0)
            setError('gitHub', { message: 'Link inválido' });

        if (
            !data.linkedin.includes('linkedin.com/in/') &&
            data.linkedin.length !== 0
        )
            setError('linkedin', { message: 'Link inválido' });
    };

    return (
        <Fragment>
            <Backdrop loading={loading} />
            <AppLayout>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justify="center">
                            <Grid item xs={1} md={4} />
                            <Grid container item xs={7} md={4} justify="center">
                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Editar Perfil
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={4}
                                justify="flex-end"
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '15px',
                                }}
                            >
                                <BackButton
                                    replace={'perfil'}
                                    message="Voltar"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.gridUser}
                            container
                            justify="center"
                        >
                            <Grid container direction="row">
                                <Grid item xs={12} md={2}>
                                    <CropImageInput
                                        image={image}
                                        setImage={setImage}
                                        preview={user?.image?.path}
                                        styles={classes.cropImage}
                                    />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    md={10}
                                    spacing={3}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="name"
                                            label="Nome"
                                            error={errors.name !== undefined}
                                            helperText={
                                                errors.name
                                                    ? '⚠ ' +
                                                      errors?.name?.message
                                                    : ''
                                            }
                                            color="primary"
                                            defaultValue={user!.name}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="surname"
                                            label="Sobrenome"
                                            error={errors.surname !== undefined}
                                            helperText={
                                                errors.surname
                                                    ? '⚠ ' +
                                                      errors?.surname?.message
                                                    : ''
                                            }
                                            color="primary"
                                            defaultValue={user!.surname}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <InputMask
                                            mask={'(99) 99999-9999'}
                                            maskChar="_"
                                            defaultValue={user!.phone}
                                        >
                                            {() => (
                                                <TextField
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
                                                    color="primary"
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
                                                        minLength: {
                                                            value: 15,
                                                            message:
                                                                'Deve seguir o formato (99) 99999-9999',
                                                        },
                                                    })}
                                                />
                                            )}
                                        </InputMask>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="gitHub"
                                            label="Github"
                                            error={errors.gitHub !== undefined}
                                            helperText={
                                                errors.gitHub
                                                    ? '⚠ ' +
                                                      errors?.gitHub?.message
                                                    : ''
                                            }
                                            color="primary"
                                            placeholder="Url do Github"
                                            defaultValue={user!.gitHub}
                                            inputRef={register({
                                                minLength: {
                                                    value: 5,
                                                    message: 'Link muito curto',
                                                },
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="linkedin"
                                            label="LinkedIn"
                                            error={
                                                errors.linkedin !== undefined
                                            }
                                            helperText={
                                                errors.linkedin
                                                    ? '⚠ ' +
                                                      errors?.linkedin?.message
                                                    : ''
                                            }
                                            color="primary"
                                            placeholder="Url do LinkedIn"
                                            defaultValue={user!.linkedin}
                                            inputRef={register({
                                                minLength: {
                                                    value: 5,
                                                    message: 'Link muito curto',
                                                },
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            multiline
                                            name="biography"
                                            label="Descrição"
                                            error={
                                                errors.biography !== undefined
                                            }
                                            helperText={
                                                errors.biography
                                                    ? '⚠ ' +
                                                      errors?.biography?.message
                                                    : ''
                                            }
                                            color="primary"
                                            defaultValue={user!.biography}
                                            inputRef={register({
                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        'Escreva pelo menos 5 caracteres',
                                                },
                                            })}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <RegisterButton text="Salvar Alterações" mt={40} />
                        </Grid>
                    </form>
                </Paper>
            </AppLayout>
        </Fragment>
    );
};

export default UserProfile;
