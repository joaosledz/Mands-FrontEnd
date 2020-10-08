import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { ApiProps as DepartmentProps } from '../../../../../models/department';
import departments from '../../../../../utils/data/departments';

import AppLayout from '../../../../../layout/appLayout';
import SubmitButton from '../../../../../components/mainButton';
import IconSelectionInput from '../../components/iconSelection/input';
import AssignGridItem from '../../components/assignGridItem';
import Header from '../../components/header/header';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<DepartmentProps>();

    const handleDepartmentData = () => {
        return location.state ? location.state : departments[0];
    };
    const departmentState = handleDepartmentData();
    const [department, setDepartment] = useState<DepartmentProps>(
        departmentState
    );
    const [departmentChanged, setDepartmentChanged] = useState<boolean>(false);

    useEffect(() => {
        document.title = `${departmentState.name} - Edição`;
    }, [departmentState.name]);

    useEffect(() => {
        const checkDepartmentChanged = () => {
            if (JSON.stringify(departmentState) === JSON.stringify(department))
                setDepartmentChanged(false);
            else setDepartmentChanged(true);
        };
        checkDepartmentChanged();
    }, [department, departmentState]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string
    ) => {
        setDepartment({
            ...department,
            [key]: event.target.value,
        });
    };

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Header
                    departmentName={departmentState.name}
                    message="Cancelar Edição"
                />
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <IconSelectionInput image={department.icon} />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nome"
                                value={department.name}
                                onChange={event => handleChange(event, 'name')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                variant="outlined"
                                label="Gerente"
                                value="Ana Tartari"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                value={department.email}
                                onChange={event => handleChange(event, 'email')}
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
                            value={department.description}
                            onChange={event =>
                                handleChange(event, 'description')
                            }
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
                        category="team"
                        description="Gerencie os funcionários deste departamento pelo botão no canto superior direito."
                        teamData={department.team}
                        icon="team"
                        edit
                        actionIcon="manage"
                    />
                    <AssignGridItem
                        title="Projetos:"
                        category="project"
                        description="Gerencie os projetos deste departamento pelo botão no
                        canto superior direito."
                        projectData={department.projects}
                        icon="document"
                        actionIcon="manage"
                        edit
                        styles={classes.projectAssignGridItem}
                    />
                </Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.submitButtonContainer}
                >
                    <SubmitButton
                        text="Salvar alterações"
                        disabled={!departmentChanged}
                        onClick={() => console.log(!departmentChanged)}
                    />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default Edit;
