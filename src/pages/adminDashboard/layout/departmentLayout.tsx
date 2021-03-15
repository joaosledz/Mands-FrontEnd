import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TypeParams from '../../../models/params';
import useCompany from '../../../hooks/useCompany';
import useDepartment from '../../../hooks/useDepartment';
import useProject from '../../../hooks/useProject';

import AppLayout from '../../../layout/appLayout';
import Layout from '../components/layout/layout';
import NotFound from '../../404';

import { departmentPermApi, departmentApi } from '../../../services';

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
    const { company } = useCompany();
    const { getDepartmentData, loading: departmentLoading } = useDepartment();
    const { loading: projectLoading } = useProject();
    const [loading, setLoading] = useState(true);

    const [hasPermission, setHaspermission] = useState(true);

    useEffect(() => {
        const checkCompanyData = async () => {
            try {
                const userCompPermission = company?.userPermission;

                const {
                    data: { departmentId },
                } = await departmentApi.show(
                    params.company,
                    params.department!
                );

                const {
                    data: { depPermissionId },
                } = await departmentPermApi.getUserPermissions(departmentId);

                if (
                    userCompPermission?.department ||
                    userCompPermission?.editCompany ||
                    depPermissionId
                )
                    await getDepartmentData(params.company, params.department!);
                else setHaspermission(false);
            } catch (error) {
                setHaspermission(false);
            } finally {
                setLoading(false);
            }
        };
        if (company) checkCompanyData();
    }, [company, params, getDepartmentData]);

    if (!hasPermission) return <NotFound />;

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
