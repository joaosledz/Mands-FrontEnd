import React, { useState, Fragment, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import {
    TypeMember,
    TypeDepartment,
    TypeProject,
} from '../../../../../services';
import AssignButtonProps from '../assignButton/assignButton';
import useCompany from '../../../../../hooks/useCompany';

import AssignButton from '../assignButton';
import TeamCard from './teamCard';
import ProjectsCard from './projectsCard';
import AssignTeamModal from '../../../components/assignTeamModal/department';
import useStyles from './styles';

type TypeItem = 'team' | 'project';
interface Props extends AssignButtonProps {
    title: string;
    category: TypeItem;
    description: string;
    teamData?: Array<TypeMember>;
    projectData?: Array<TypeProject>;
    loading: boolean;
    styles?: string;
}

const AssignGridItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation<{ department: TypeDepartment }>();
    const { company } = useCompany();
    const {
        title,
        category,
        description,
        icon,
        teamData = [],
        projectData = [],
        actionIcon,
        disabled,
        loading,
        styles,
    } = props;

    const [showTeamModal, setShowTeamModal] = useState(false);

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

    const handleAlign = () => {
        if (category === 'team' && teamData.length === 0) return 'center';
        else if (category === 'project' && projectData.length === 0)
            return 'center';
        else return 'flex-start';
    };

    const renderTeam = () =>
        teamData!.length !== 0 ? (
            teamData!.map((item, index) => (
                <TeamCard key={index} teammate={item} />
            ))
        ) : (
            <Grid item className="empty-data" xs={9}>
                <Typography>{description}</Typography>
            </Grid>
        );

    const renderProject = () =>
        projectData!.length !== 0 ? (
            projectData!.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} md={4}>
                    <ProjectsCard project={item} />
                </Grid>
            ))
        ) : (
            <Grid item className="empty-data" xs={9}>
                <Typography>{description}</Typography>
            </Grid>
        );

    const renderSkeleton = (type: TypeItem) =>
        Array.apply(null, Array(6)).map((item, index) => (
            <Grid key={index} item xs={12} sm={4}>
                <Skeleton variant="rect" height={type === 'team' ? 64 : 112} />
            </Grid>
        ));

    return (
        <Fragment>
            <Grid
                component={Paper}
                container
                direction="column"
                item
                lg={5}
                md={5}
                sm={12}
                xs={12}
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
                    spacing={3}
                    justify={handleAlign()}
                    className={classes.assignContainer}
                    style={category === 'team' ? { marginTop: '1rem' } : {}}
                >
                    {category === 'team'
                        ? !loading
                            ? renderTeam()
                            : renderSkeleton('team')
                        : !loading
                        ? renderProject()
                        : renderSkeleton('project')}
                </Grid>
            </Grid>

            {!disabled && category === 'team' && company && (
                <AssignTeamModal
                    isOpen={showTeamModal}
                    setIsOpen={setShowTeamModal}
                    selectedValues={teamData}
                />
            )}
        </Fragment>
    );
};

export default memo(AssignGridItem);
