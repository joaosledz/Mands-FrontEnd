import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import CpfValidator from '../../../validators/cpfValidator';
import InputMask from 'react-input-mask';

import ProfilePic from '../../../assets/fakeDataImages/employees/anaTartari.png';
import AppLayout from '../../../layout/appLayout';
import BackButton from '../../../components/backButton';
import RegisterButton from '../../../components/mainButton';
import useStyles from './styles';
import CropImageInput from '../../../components/cropImage/cropImageInput';
import useAuth from '../../../hooks/useAuth';
import { updateModel, userApi } from '../../../services';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

type FormProps = {
    name: string;
    surname: string;
    email: string;
    cpf: string;
    phone: string;
};

const UserProfile: React.FC = () => {
    const classes = useStyles();
    const { user, updateUser } = useAuth();
    const { register, errors, handleSubmit } = useForm<FormProps>();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        document.title = 'Editar Perfil';
    }, []);

    const handleEditUser = async (newData: updateModel) => {
        setLoading(true);
        try {
            const response = await userApi.update(newData, user!.userId);

            const data = response.data;
            // console.log(data);
            updateUser(data);
            setLoading(false);
            SnackbarUtils.success('Perfil editado com sucesso');
        } catch (error) {
            setLoading(false);
            SnackbarUtils.error('Não foi possível editar o perfil');
        }
    };
    const onSubmit = (data: FormProps) => {
        handleEditUser(data);
        console.log(data);
    };
    return (
        <AppLayout>
            {!loading ? (
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
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
                        <Grid className={classes.gridUser} container>
                            <Grid container direction="row">
                                <Grid item xs={12} md={2}>
                                    <CropImageInput
                                        image={image}
                                        setImage={setImage}
                                        preview={ProfilePic}
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
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            name="name"
                                            label="Nome"
                                            color="primary"
                                            defaultValue={user!.name}
                                            fullWidth
                                            variant="outlined"
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
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            name="surname"
                                            label="Nome"
                                            color="primary"
                                            defaultValue={user!.surname}
                                            fullWidth
                                            variant="outlined"
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
                                    <Grid item xs={12} sm={4}>
                                        <InputMask
                                            mask={'999.999.999-99'}
                                            maskChar="_"
                                            defaultValue={user!.cpf}
                                        >
                                            {() => (
                                                <TextField
                                                    name="cpf"
                                                    label="CPF"
                                                    fullWidth
                                                    variant="outlined"
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
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
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
                                                    fullWidth
                                                    variant="outlined"
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
                                    {/* <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="role"
                                        label="Cargo"
                                        color="primary"
                                        defaultValue={data.role}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="role"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid> */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            color="primary"
                                            defaultValue={user!.email}
                                            fullWidth
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
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
