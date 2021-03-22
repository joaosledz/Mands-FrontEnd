import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DepartmentLayout from '../layout/departmentLayout';
import NotFound from '../../404';

import TypeParams from '../../../models/params';
import useCompany from '../../../hooks/useCompany';
import useDepartment from '../../../hooks/useDepartment';
import useProject from '../../../hooks/useProject';

import { departmentPermApi, projectPermApi } from '../../../services';

const ProjectLayout: React.FC = ({ children }) => {
    const params = useParams<TypeParams>();
    const { company } = useCompany();
    const { department } = useDepartment();
    const { getProjectData, setLoading } = useProject();

    const [hasPermission, setHaspermission] = useState(true);

    useEffect(() => {
        const checkProjectData = async () => {
            const compPermission = company!.userPermission;
            const permissions = [];

            try {
                setLoading(true);
                permissions.push(compPermission);

                const { data } = await departmentPermApi.getUserPermissions(
                    department!.departmentId
                );

                permissions.push(data);

                const {
                    data: { editProject },
                } = await projectPermApi.getUserPerm(Number(params.project));

                if (compPermission?.project || data.project || editProject)
                    await getProjectData(Number(params.project));
                else setHaspermission(false);
            } catch (err) {
                permissions.forEach(permission => {
                    if (!permission.project) setHaspermission(false);
                });
                if (hasPermission) await getProjectData(Number(params.project));
            } finally {
                setLoading(false);
            }
        };
        if (company && department) checkProjectData();
    }, [
        company,
        department,
        getProjectData,
        hasPermission,
        params.project,
        setLoading,
    ]);

    if (!hasPermission) return <NotFound />;

    return <DepartmentLayout>{children}</DepartmentLayout>;
};

export default ProjectLayout;
