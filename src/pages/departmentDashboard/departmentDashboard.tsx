import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {
    UserCompanyType,
    TypeDepartment,
    companyApi,
    departmentApi,
} from '../../services';
import TypeParams from '../../models/params';
import useCompany from '../../hooks/useCompany';
import useDepartment from '../../hooks/useDepartment';

import AppLayout from '../../layout/appLayout';
import Header from './header/header';
import DepartmentDetails from './departmentDetails/departmentDetails';
import Projects from './projects/projects';
import useStyles from './styles';

const DepartmentDashboard: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const companyData = useCompany();
    const departmentData = useDepartment();

    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<UserCompanyType | null>(companyData);
    const [department, setDepartment] = useState<TypeDepartment | null>(
        departmentData
    );

    useEffect(() => {
        const getCompanyData = async (company_username: string) => {
            try {
                // Trocar para rota de permissão da empresa
                const response = await companyApi.show(company_username);
                setCompany(response.data);
                setLoading(false);
            } catch (error) {
                //toast de erro
                setLoading(false);
            }
        };

        const getDepartmentData = async (department_name: string) => {
            try {
                // Trocar para rota de permissão da empresa
                const response = await departmentApi.show(department_name);
                setDepartment(response.data);
                setLoading(false);
            } catch (error) {
                //toast de erro
                setLoading(false);
            }
        };

        const handleDepartmentParam = async () => {
            setLoading(true);
            if (department) {
                document.title = `Departamento - ${department.name}`;
                // console.log(
                //     params.departmentName!.toLowerCase(),
                //     department.name.toLowerCase()
                // );
                if (
                    params.departmentName!.toLowerCase() !==
                    department.name.toLowerCase()
                )
                    getDepartmentData(params.departmentName!);
                // Fix: verificar bug na troca de departamento, pelas rotas
                else setLoading(false);
            } else {
                if (company) {
                    getDepartmentData(params.departmentName!);
                } else {
                    getCompanyData(params.companyName);
                    getDepartmentData(params.departmentName!);
                }
            }
        };
        handleDepartmentParam();
    }, [company, department, params]);

    return (
        <AppLayout>
            {!loading && company && department ? (
                <Box className={classes.container}>
                    <Header jobTitle={company.userPermission.name} />
                    <Grid
                        container
                        spacing={3}
                        className={classes.contentContainer}
                    >
                        <Grid item xs={12} md={6}>
                            <Projects />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DepartmentDetails department={department} />
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Typography variant="h5">Carregando...</Typography>
            )}
        </AppLayout>
    );
};

export default DepartmentDashboard;
