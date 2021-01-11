import React, { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import TypeParams from '../../../models/params';
import useCompany from '../../../hooks/useCompany';
import useDepartment from '../../../hooks/useDepartment';
import useProject from '../../../hooks/useProject';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

import AppLayout from '../../../layout/appLayout';
import Layout from '../components/layout/layout';

type Props = {
    title?: string;
    menu?: boolean;
    children: React.ReactNode;
};

const DepartmentLayout: React.FC<Props> = ({
    title = 'Admin',
    menu = false,
    children,
}) => {
    const params = useParams<TypeParams>();
    const history = useHistory();
    const { company, getCompanyData, loading, setLoading } = useCompany();
    const {
        department,
        getDepartmentData,
        loading: departmentLoading,
    } = useDepartment();
    const { loading: projectLoading } = useProject();

    useEffect(() => {
        const checkCompanyData = async () => {
            if (company && company.userPermission!.editCompany) {
                try {
                    if (params.department) {
                        if (department) setLoading(false);
                        else {
                            console.log(
                                'DepartmentLayout: caso não tenha department'
                            );
                            await getDepartmentData(
                                params.company,
                                params.department!
                            );
                        }
                    } else setLoading(false);
                } catch (error) {
                    console.log(error);
                    SnackbarUtils.error(error.message);
                    history.replace(`/admin/${params.company}/departamentos`);
                }
            }
        };
        checkCompanyData();
    }, [
        company,
        history,
        params,
        getCompanyData,
        setLoading,
        department,
        getDepartmentData,
    ]);

    return (
        <AppLayout loading={[loading, departmentLoading, projectLoading]}>
            {menu ? (
                <Layout title={title}>{children}</Layout>
            ) : (
                <Fragment>{children}</Fragment>
            )}
        </AppLayout>
    );
};

export default DepartmentLayout;
