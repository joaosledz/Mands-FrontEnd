import React, { useState, useEffect, memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import FingerprintIcon from '../../../../assets/icons/fingerprint.svg';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';

const permissionsModel = [
    {
        label: 'Editar Empresa',
        checked: false,
    },
    {
        label: 'Convidar Pessoas',
        checked: false,
    },
    {
        label: 'Retirar Pessoas',
        checked: false,
    },
    {
        label: 'Departamento',
        checked: false,
    },
    {
        label: 'Projeto',
        checked: false,
    },
];

type PermissionModel = {
    name: string;
};

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

const RegisterPermission: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { register, errors, handleSubmit, formState } = useForm<
        PermissionModel
    >();
    const { isOpen, handleClose } = props;

    const [permissions, setPermissions] = useState(permissionsModel);

    useEffect(() => {
        console.log(permissions);
    }, [permissions]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const auxPermissions = [...permissions];
        auxPermissions[index].checked = event.target.checked;
        setPermissions(auxPermissions);
    };

    const onSubmit = useCallback((data: PermissionModel) => {}, []);

    const error =
        permissions.filter(permission => permission.checked).length < 1;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="Modal de cadastro de permissão"
            aria-describedby="Realiza o cadastro de uma permissão"
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={3}
                >
                    <IconButton
                        onClick={handleClose}
                        className={classes.closeModalButton}
                    >
                        <TimesIcon size={20} />
                    </IconButton>
                    <Grid container item justify="center">
                        <img
                            src={FingerprintIcon}
                            alt="ícone de uma digital de um dedo"
                        />
                    </Grid>
                    <Grid container item justify="center">
                        <Typography variant="h1">
                            Cadastre uma permissão
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        component="form"
                        spacing={3}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container item>
                            <TextField
                                name="name"
                                label="Nome"
                                error={errors.name !== undefined}
                                helperText={
                                    errors.name
                                        ? '⚠' + errors?.name?.message
                                        : ''
                                }
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                    minLength: {
                                        value: 3,
                                        message:
                                            'Digite um nome com pelo menos 3 caracteres',
                                    },
                                })}
                            />
                        </Grid>
                        <Grid container item>
                            <FormControl
                                component="fieldset"
                                required
                                error={error}
                            >
                                <FormLabel component="legend">
                                    Permissões
                                </FormLabel>
                                <FormGroup style={{ maxHeight: '60%' }}>
                                    {permissions.map((permission, index) => (
                                        <FormControlLabel
                                            key={permission.label}
                                            label={permission.label}
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={permission.checked}
                                                    onChange={event =>
                                                        handleChange(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                    inputProps={{
                                                        'aria-label':
                                                            permission.label,
                                                    }}
                                                />
                                            }
                                        />
                                    ))}
                                </FormGroup>
                                <FormHelperText>
                                    Escolha pelo menos 1
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <SubmitButton
                            text="Cadastrar"
                            disabled={!formState.isDirty || error}
                            mt={20}
                            hg={40}
                            mw={200}
                            mwt={250}
                        />
                    </Grid>
                </Grid>
            </Slide>
        </Modal>
    );
};

export default memo(RegisterPermission);
