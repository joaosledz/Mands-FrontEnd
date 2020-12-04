import React, { useState, Fragment, memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
    UserCompanyType,
    TypeMember,
    TypeDepartment,
    TypeProject,
    companyApi,
} from '../../../../../services';
import AssignButtonProps from '../../models/assignButton';
import useCompany from '../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import AssignButton from '../assignButton';
import TeamCard from './teamCard';
import ProjectsCard from './projectsCard';
import AssignTeamModal from '../../../../../components/assignTeamModal/assignTeamModal';
import useStyles from './styles';
interface Props extends AssignButtonProps {
    title: string;
    category: 'team' | 'project';
    description: string;
    teamData?: Array<TypeMember>;
    projectData?: Array<TypeProject>;
    styles?: string;
}

const AssignGridItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation<{ department: TypeDepartment }>();
    const { company, updateCompany } = useCompany();
    const {
        title,
        category,
        description,
        icon,
        teamData = [],
        projectData = [],
        actionIcon,
        disabled,
        styles,
    } = props;

    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

    useEffect(() => {
        const checkData = async () => {
            if (company && !company.users) {
                try {
                    const response = await companyApi.findAllEmployees(
                        company.companyId
                    );
                    const data: UserCompanyType = {
                        ...company,
                        users: [...response.data],
                    };
                    updateCompany(data);
                } catch (error) {
                    snackbarUtils.error(error.message);
                }
            }
        };
        if (category === 'team') checkData();
        // eslint-disable-next-line
    }, []);

    const handleAction = () => {
        // console.log('teamData: ', teamData);
        const handleProjectURL = () => {
            const baseURL = location.pathname.split('/detalhes');
            const url = `${baseURL[0]}/projeto/cadastrar`;
            return url;
        };
        category === 'team'
            ? setShowTeamModal(true)
            : history.push(handleProjectURL());
    };

    return (
        <Fragment>
            <Grid
                component={Paper}
                container
                direction="column"
                item
                xs={12}
                md={5}
                spacing={3}
                className={
                    styles
                        ? [styles, classes.container].join(' ')
                        : classes.container
                }
            >
                <Grid container item justify="space-between">
                    <Grid item>
                        <Typography variant="h2" className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                    {!disabled && (
                        <Grid item>
                            <AssignButton
                                icon={icon}
                                actionIcon={actionIcon}
                                disabled={disabled}
                                onClick={handleAction}
                            />
                        </Grid>
                    )}
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    spacing={3}
                    className={classes.assignContainer}
                >
                    {category === 'team' ? (
                        teamData!.length !== 0 ? (
                            teamData!.map((item, index) => (
                                <TeamCard key={index} teammate={item} />
                            ))
                        ) : (
                            <Grid item className="empty-data" xs={9}>
                                <Typography>{description}</Typography>
                            </Grid>
                        )
                    ) : projectData!.length !== 0 ? (
                        projectData!.map((item, index) => (
                            <Grid key={index} item xs={12} md={4}>
                                <ProjectsCard project={item} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item className="empty-data" xs={9}>
                            <Typography>{description}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            {!disabled && category === 'team' && company && (
                <AssignTeamModal
                    isOpen={showTeamModal}
                    setIsOpen={setShowTeamModal}
                    allEmployees={company.users!}
                    teamData={teamData}
                />
            )}
        </Fragment>
    );
};

export default memo(AssignGridItem);
