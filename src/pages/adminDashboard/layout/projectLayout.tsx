import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import DepartmentLayout from '../layout/departmentLayout';

import TypeParams from '../../../models/params';
import useCompany from '../../../hooks/useCompany';
import useProject from '../../../hooks/useProject';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

const ProjectLayout: React.FC = ({ children }) => {
    const history = useHistory();
    const params = useParams<TypeParams>();
    const { company } = useCompany();
    const { project, getProjectData, setLoading } = useProject();

    useEffect(() => {
        const checkProjectData = async () => {
            if (company)
                if (company.userPermission!.project) {
                    try {
                        if (project) {
                            if (Number(params.project) !== project.projectId)
                                await getProjectData(Number(params.project));
                            else setLoading(false);
                        } else await getProjectData(Number(params.project));
                    } catch (error) {
                        SnackbarUtils.error(error.message);
                    }
                } else {
                    SnackbarUtils.warning('Você não possui permissão');
                    history.push('/');
                }
        };
        checkProjectData();
        // eslint-disable-next-line
    }, [company]);

    return <DepartmentLayout>{children}</DepartmentLayout>;
};

export default ProjectLayout;
