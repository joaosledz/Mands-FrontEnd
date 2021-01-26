import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';

import { TypeDepartmentPermission } from '../../../../../../services';
import RoleItem from './roleItem';
import useStyles from '../../styles';

type Props = {
    roles: TypeDepartmentPermission[];
    roleValue: number;
    handleChangeRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChooseRole: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { roles, roleValue, handleChangeRole } = props;

    return (
        <Fragment>
            <FormLabel
                component="legend"
                style={{ paddingLeft: '21px', margin: '1rem 0rem' }}
            >
                Cargos
            </FormLabel>
            {roles.length === 0 && (
                <Typography>Este departamento não possui cargos</Typography>
            )}
            <RadioGroup
                value={roleValue}
                aria-label="cargos"
                name="cargos"
                onChange={handleChangeRole}
            >
                {roles.map(role => (
                    <RoleItem key={role.depPermissionId} role={role} />
                ))}
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container item className={classes.addRole}>
                    <Grid item xs={1}>
                        <AddIcon size={20} />
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        component={Typography}
                        style={{ textAlign: 'left' }}
                    >
                        Adicionar cargo personalizado
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" className={classes.divider} />
            </RadioGroup>
        </Fragment>
    );
};
export default ChooseRole;
