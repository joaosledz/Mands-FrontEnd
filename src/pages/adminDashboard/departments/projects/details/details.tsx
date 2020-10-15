import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

const NewProject: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<File | undefined>();

    useEffect(() => {
        document.title = 'Detalhes Projeto';
    }, []);

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            Detalhes Projeto
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={4} justify="flex-end">
                        <BackButton message="Voltar" />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <CropImageInput
                            image={image}
                            setImage={setImage}
                            disabled
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                label="Nome"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                variant="outlined"
                                label="Orçamento"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                fullWidth
                                label="Data inicial"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                fullWidth
                                label="Data Final"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            disabled
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Descrição"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default NewProject;
