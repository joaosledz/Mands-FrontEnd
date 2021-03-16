import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useCompany from '../../../hooks/useCompany';

import AppLayout from '../../../layout/appLayout';
import Layout from '../components/layout/layout';
import NotFound from '../../404';

type Props = {
    title?: string;
    menu?: boolean;
    children: React.ReactNode;
};

const CompanyLayout: React.FC<Props> = ({
    title = 'Admin',
    menu = false,
    children,
}) => {
    const { company } = useCompany();
    const [loading, setLoading] = useState(true);

    const [hasPermission, setHaspermission] = useState(true);

    const {
        location: { pathname },
    } = useHistory();

    useEffect(() => {
        const checkCompanyData = async () => {
            try {
                setLoading(true);
                const userCompPermission = company?.userPermission;

                if (userCompPermission) {
                    if (pathname.includes('departamentos')) {
                        if (userCompPermission?.department) return;
                        setHaspermission(false);
                    }
                    if (pathname.includes('funcionarios')) {
                        if (userCompPermission?.acceptUser) return;
                        setHaspermission(false);
                    }
                    if (pathname.includes('edicao')) {
                        if (userCompPermission.editCompany) return;
                        setHaspermission(false);
                    }
                } else setHaspermission(false);
            } catch (error) {
                setHaspermission(false);
            } finally {
                setLoading(false);
            }
        };
        if (company) checkCompanyData();
    }, [company, pathname]);

    if (!hasPermission) return <NotFound />;

    return (
        <AppLayout loading={[loading]}>
            {menu ? (
                <Layout title={title}>{children}</Layout>
            ) : (
                <Fragment>{children}</Fragment>
            )}
        </AppLayout>
    );
};

export default CompanyLayout;
