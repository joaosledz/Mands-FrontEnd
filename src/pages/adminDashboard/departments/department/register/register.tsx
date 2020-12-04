import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import IconSelection from '../../components/iconSelection/input';
import useStyles from './styles';

const NewDepartment: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<string | undefined>('');

    useEffect(() => {
        document.title = 'Cadastrar Departamento';
    }, []);

    const handleSubmit = () => {
        const department = {
            image,
        };
        console.log(department);
    };

    return (
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
                            redirect="admin/departamentos"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <IconSelection setImage={setImage} />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                label="Gerente"
                                value="Ana Tartari"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Descrição"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    xs={12}
                    justify="center"
                    className={classes.submitButtonContainer}
                >
                    <SubmitButton text="Cadastrar" onClick={handleSubmit} />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default NewDepartment;
