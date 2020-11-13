import React from 'react';
import clsx from 'clsx';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import {
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Divider,
} from '@material-ui/core';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';
import useStyles from './styles';

// Inspired by blueprintjs
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
    roleValue: string;
    handleChangeRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ChooseRole: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { roleValue, handleChangeRole } = props;

    return (
        <>
            <FormLabel component="legend" style={{ paddingLeft: '21px' }}>
                Cargos
            </FormLabel>
            <RadioGroup
                value={roleValue}
                aria-label="cargos"
                name="cargos"
                onChange={handleChangeRole}
            >
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container>
                    <Grid item xs={12}>
                        <FormControlLabel
                            value="funcionario"
                            control={<StyledRadio />}
                            label="Funcionário"
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
                <Divider variant="fullWidth" className={classes.divider} />
                <Grid container>
                    <Grid item xs={12}>
                        <FormControlLabel
                            value="gerente"
                            control={<StyledRadio />}
                            label="Gerente"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        component={Typography}
                        className={clsx(classes.subtitle)}
                    >
                        Permite a edição de departamentos
                    </Grid>
                </Grid>
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
        </>
    );
};
export default ChooseRole;
