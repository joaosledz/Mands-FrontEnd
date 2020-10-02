import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AppLayout from '../../../../layout/appLayout';
import BackButton from '../../../../components/backButton';
import CropImageInput from '../../../../components/cropImage/cropImageInput';
import AssignGridItem from '../components/assignGridItem';
import useStyles from './styles';

const NewDepartment: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        document.title = 'Cadastrar Departamento';
    }, []);

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Grid container>
                    <Grid item xs={1} md={4} />
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
                        <CropImageInput
                            image={image}
                            setImage={setImage}
                            styles={classes.cropImage}
                        />
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
                            rows={6}
                            variant="outlined"
                            label="Descrição"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.assignsContainer}
                    justify="space-around"
                    spacing={3}
                >
                    <AssignGridItem
                        title="Equipe:"
                        type="team"
                        description="Adicione funcionários a este departamento pelo botão no canto superior direito."
                        icon="team"
                        actionIcon="add"
                    />
                    <AssignGridItem
                        title="Projetos:"
                        type="project"
                        description="Adicione projetos a este departamento pelo botão no
                        canto superior direito."
                        icon="document"
                        actionIcon="add"
                        styles={classes.projectAssignGridItem}
                    />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default NewDepartment;
