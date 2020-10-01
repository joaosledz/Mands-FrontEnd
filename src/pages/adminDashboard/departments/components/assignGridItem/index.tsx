import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignButtonProps from '../../models/assignButton';
import {
    TypeTeam,
    TypeProjects,
} from '../../../../../components/departments/models/department';

import AssignButton from '../assignButton';
import TeamCard from './teamCard';
import useStyles from './styles';

interface Props extends AssignButtonProps {
    title: string;
    type: 'team' | 'project';
    description: string;
    styles?: string;
    teamData?: Array<TypeTeam>;
    projectData?: Array<TypeProjects>;
}

const AssignGridItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const {
        title,
        type,
        description,
        icon,
        teamData,
        projectData,
        actionIcon,
        styles,
    } = props;
    console.log(projectData);
    return (
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
                <Grid item>
                    <AssignButton icon={icon} actionIcon={actionIcon} />
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={12}
                spacing={3}
                className={classes.assignContainer}
            >
                {type === 'team' ? (
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
                    projectData!.map((item, index) => <></>)
                ) : (
                    <Grid item className="empty-data" xs={9}>
                        <Typography>{description}</Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default AssignGridItem;
