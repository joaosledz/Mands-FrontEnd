import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignButtonProps from '../../models/assignButton';

import AssignButton from '../assignButton';
import useStyles from './styles';

interface Props extends AssignButtonProps {
    title: string;
    description: string;
    styles?: string;
}

const AssignGridItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { title, description, icon, actionIcon, styles } = props;
    return (
        <Grid
            component={Paper}
            container
            item
            xs={12}
            md={5}
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
                justify="center"
                className={classes.assignContainer}
            >
                <Grid item xs={9}>
                    <Typography>{description}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AssignGridItem;
