import React from 'react';
import {
    Grid,
    Typography,
    RadioGroup,
    FormLabel,
    Divider,
} from '@material-ui/core';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';
import useStyles from './styles';
import { TypeCompanyPermission } from '../../../../services';

import RoleItem from './roleItem';

type Props = {
    roleValue: number;
    handleChangeRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpen: () => void;
    roles: TypeCompanyPermission[];
};
const ChooseRole: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { roleValue, handleChangeRole, handleOpen, roles } = props;

    return (
        <>
            <FormLabel component="legend" style={{ paddingLeft: '21px' }}>
                Escolha um cargo
            </FormLabel>
            <RadioGroup
                value={roleValue}
                aria-label="cargos"
                name="cargos"
                onChange={handleChangeRole}
            >
                {roles.map(role => (
                    <RoleItem key={role.compPermissionId} role={role} />
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
                        onClick={handleOpen}
                    >
                        Adicionar cargo personalizado
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" className={classes.divider} />
            </RadioGroup>
        </>
    );
};
export default ChooseRole;
