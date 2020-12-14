import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { validLink } from './components/functions/validLink';
// import CpfValidator from '../../../validators/cpfValidator';
import InputMask from 'react-input-mask';

import ProfilePic from '../../../assets/fakeDataImages/employees/anaTartari.png';
import AppLayout from '../../../layout/appLayout';
import BackButton from '../../../components/backButton';
import RegisterButton from '../../../components/mainButton';
import useStyles from './styles';
import CropImageInput from '../../../components/cropImage/cropImageInput';
import useAuth from '../../../hooks/useAuth';
import {
    updateModel,
    authApi,
    imageApi,
    // PostImageType,
} from '../../../services';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    const { user, updateUser } = useAuth();
    const { register, errors, handleSubmit } = useForm<updateModel>();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        document.title = 'Editar Perfil';
    }, []);

    const handleEditImage = async (image: File, newData: updateModel) => {
        const formData = new FormData();
        formData.append('imageData', image);
        setLoading(true);
        try {
            const response = await imageApi.post(formData);
            const data = response.data;
            console.log(data);
            handleEditUser(newData);
            SnackbarUtils.success('Imagem de perfil editada com sucesso');
        } catch (error) {
            setLoading(false);
            SnackbarUtils.error('Não foi possível editar a imagem');
        }
    };

    const handleEditUser = async (newData: updateModel) => {
        setLoading(true);
        try {
            const response = await authApi.update(newData);

            const data = response.data;
            console.log(data);
            updateUser(data);

            setLoading(false);
            SnackbarUtils.success('Perfil editado com sucesso');
        } catch (error) {
            setLoading(false);
            SnackbarUtils.error('Não foi possível editar o perfil');
        }
    };
    const onSubmit = (data: updateModel) => {
        let dataAux;
        dataAux = validLink(data);
        if (image) handleEditImage(image, dataAux);
        else handleEditUser(dataAux);
    };
    return (
        <AppLayout>
            {!loading ? (
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
                                        preview={
                                            user?.image?.path || ProfilePic
                                        }
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
                                            color="primary"
                                            defaultValue={user!.name}
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
                                            name="surname"
                                            label="Nome"
                                            color="primary"
                                            defaultValue={user!.surname}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="surname"
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
                                    {/* <Grid item xs={12} sm={6}>
                                        <InputMask
                                            mask={'999.999.999-99'}
                                            maskChar="_"
                                            defaultValue={user!.cpf}
                                        >
                                            {() => (
                                                <TextField
                                                    name="cpf"
                                                    label="CPF"
                                                      
                                                    
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
                                                        validate: {
                                                            cpfInvalido: value =>
                                                                CpfValidator(
                                                                    value
                                                                ),
                                                        },
                                                    })}
                                                />
                                            )}
                                        </InputMask>
                                        <ErrorMessage
                                            errors={errors}
                                            name="cpf"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    CPF inválido
                                                </Typography>
                                            )}
                                        />
                                    </Grid> */}
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            color="primary"
                                            defaultValue={user!.email}
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
                                        <TextField
                                            name="gitHub"
                                            label="Github"
                                            color="primary"
                                            placeholder="Url do Github"
                                            defaultValue={user!.gitHub}
                                            inputRef={register({})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="linkedin"
                                            label="LinkedIn"
                                            color="primary"
                                            placeholder="Url do LinkedIn"
                                            defaultValue={user!.linkedin}
                                            inputRef={register({})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            multiline
                                            name="biography"
                                            label="Descrição"
                                            color="primary"
                                            defaultValue={user!.biography}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="biography"
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
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <RegisterButton
                                    mt={40}
                                    text="Salvar Alterações"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            ) : (
                <h1>Carregando...</h1>
            )}
        </AppLayout>
    );
};

export default UserProfile;
