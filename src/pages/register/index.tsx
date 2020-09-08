import React, { useState, useMemo, ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import { Camera as CameraIcon } from '@styled-icons/icomoon';

import AuthLayout from '../../layout/authLayout';
import TextField from './components/textField';
import RegisterButton from '../../components/authPagesButton';
import CropImageComponent from '../../components/cropImageModal';

import useStyles from './styles';

const Register: React.FC = () => {
    const classes = useStyles();

    //#region imageSetup
    const [image, setImage] = useState<object | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files?.[0]);
        setShowCropModal(true);
    };

    //#region CropImageSetup
    const [showCropModal, setShowCropModal] = useState(false);

    const handleImageReturn = (blob: object, image_url: string) => {
        setImage(blob);
        setImagePreview(image_url);
    };

    const CropImageModal = useMemo(() => {
        return (
            <CropImageComponent
                src={image}
                handleImage={handleImageReturn}
                isOpen={showCropModal}
                setIsOpen={setShowCropModal}
            />
        );
    }, [showCropModal, image]);
    //#endregion
    //#endregion

    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <FormControl component="form" fullWidth>
                <Grid
                    component="article"
                    container
                    className={classes.container}
                >
                    <Grid item xs={12} sm={8}>
                        <Box mt={4}>
                            <Typography
                                style={{ fontSize: 40, fontWeight: 700 }}
                                color="primary"
                            >
                                Criar sua conta
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 20 }}
                            >
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Nome" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Sobrenome" />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField type="email" label="Email" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="CPF" />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField label="Telefone" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="password"
                                            label="Senha"
                                        />
                                        <Typography
                                            component="span"
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 300,
                                            }}
                                        >
                                            Use 6 caracteres no mínimo
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid
                        component="aside"
                        className={classes.rightSide}
                        item
                        xs={12}
                        sm={4}
                    >
                        <Box mt={3} className={classes.avatarContainer}>
                            <Typography
                                component="label"
                                htmlFor="avatar-input"
                                style={{ color: '#505050' }}
                            >
                                Imagem do Perfil:
                            </Typography>
                            <Typography
                                component="label"
                                htmlFor="avatar-input"
                                className={
                                    !imagePreview
                                        ? classes.avatarInputLabel
                                        : `${classes.avatarInputLabel} active`
                                }
                                style={{
                                    backgroundImage: `url(${imagePreview})`,
                                }}
                            >
                                <CameraIcon size="25" />
                                <Box
                                    id="avatar-blur"
                                    className={classes.avatarBlur}
                                />
                                <input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{
                                        display: 'none',
                                    }}
                                    onChange={handleChangeImage}
                                />
                            </Typography>
                        </Box>
                    </Grid>
                    <RegisterButton mt={40} text="Criar conta" />
                </Grid>
            </FormControl>
            {CropImageModal}
        </AuthLayout>
    );
};

export default Register;
