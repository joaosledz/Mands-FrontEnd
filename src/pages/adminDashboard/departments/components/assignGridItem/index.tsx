import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignButtonProps from '../../models/assignButton';
import { TypeTeam, TypeProjects } from '../../../../../models/department';

import AssignButton from '../assignButton';
import TeamCard from './teamCard';
import ProjectsCard from './projectsCard';
import AssignTeamModal from '../assignTeamModal/assignTeamModal';
import useStyles from './styles';

interface Props extends AssignButtonProps {
    title: string;
    category: 'team' | 'project';
    description: string;
    teamData?: Array<TypeTeam>;
    projectData?: Array<TypeProjects>;
    edit?: boolean;
    styles?: string;
}

const AssignGridItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
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
        edit,
    } = props;

    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

    const handleAction = () => {
        const handleProjectURL = () => {
            const baseURL = location.pathname.split('/edicao');
            const url = `${baseURL[0]}/projeto/cadastrar`;
            return url;
        };
        category === 'team'
            ? setShowTeamModal(true)
            : history.push(handleProjectURL());
    };

    return (
        <>
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
                            <Grid key={index} item xs={12} md={6}>
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
            {edit && category === 'team' ? (
                <AssignTeamModal
                    isOpen={showTeamModal}
                    setIsOpen={setShowTeamModal}
                    data={teamData}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default AssignGridItem;
