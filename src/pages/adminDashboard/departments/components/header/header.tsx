import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import TypeParams from '../../../../../models/params';

import BackButton from '../../../../../components/backButton';
import useStyles from './styles';

type Props = {
    departmentName: string;
    message?: string;
    redirect?: boolean;
};

const Header: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const {
        departmentName,
        message = 'Voltar para os departamentos',
        redirect,
    } = props;
    const params = useParams<TypeParams>();

    return (
        <Grid container spacing={3}>
            <Hidden mdDown>
                <Grid item xs={1} md={4} />
            </Hidden>
            <Grid container item xs={12} md={4} justify="center">
                <Typography variant="h1" className={classes.title}>
                    Departamento - {departmentName}
                </Typography>
            </Grid>
            <Grid container item xs={12} md={4} justify="flex-end">
                {redirect ? (
                    <BackButton
                        message={message}
                        redirect={`admin/${params.companyName}/departamentos`}
                    />
                ) : (
                    <BackButton message={message} />
                )}
            </Grid>
        </Grid>
    );
};

export default memo(Header);
