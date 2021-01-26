import React, { Fragment, memo } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Radio, { RadioProps } from '@material-ui/core/Radio';

import { TypeDepartmentPermission } from '../../../../../../../services';
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
    role: TypeDepartmentPermission;
};

const Roles: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { role } = props;

    return (
        <Fragment>
            <Divider variant="fullWidth" className={classes.divider} />
            <Grid container style={{ marginLeft: '2rem' }}>
                <Grid item xs={12}>
                    <FormControlLabel
                        value={role.depPermissionId}
                        control={<StyledRadio />}
                        label={role.name}
                        data-cy={`role-checkbox-${role.depPermissionId}`}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    component={Typography}
                    className={clsx(classes.subtitle)}
                >
                    Cargo simples sem permissões de alterações
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default memo(Roles);
