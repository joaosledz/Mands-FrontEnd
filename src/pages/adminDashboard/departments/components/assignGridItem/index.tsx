import React, { useState } from 'react';
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
    const [showProjectsModal, setShowProjectsModal] = useState<boolean>(false);

    const openAssignModal = () => {
        category === 'team'
            ? setShowTeamModal(true)
            : setShowProjectsModal(true);
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
                                onClick={openAssignModal}
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
                            <ProjectsCard key={index} project={item} />
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
