import React, { Fragment, memo } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { TypeCompanyPermission } from '../../../../../services';
import useStyles from '../styles';

function StyledRadio(props: RadioProps) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
                <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

type Props = {
    role: TypeCompanyPermission;
};

const Roles: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { role } = props;

    return (
        <Fragment>
            <Divider variant="fullWidth" className={classes.divider} />
            <Grid container>
                <Grid item xs={12} className={classes.role}>
                    <FormControlLabel
                        value={role.compPermissionId}
                        control={<StyledRadio />}
                        label={role.name}
                    />
                    <IconButton aria-label="delete">
                        <InfoIcon fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default memo(Roles);
