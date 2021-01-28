import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import TypeParams from '../../../../../models/params';

import BackButton from '../../../../../components/backButton';
import useStyles from './styles';

type Props = {
    departmentName: string | undefined;
    message?: string;
    page: 'details' | 'edit';
};

const Header: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const {
        departmentName,
        message = 'Voltar para os departamentos',
        page = 'details',
    } = props;
    const params = useParams<TypeParams>();

    return (
        <Grid container spacing={3}>
            <Hidden mdDown>
                <Grid item xs={1} md={3} />
            </Hidden>
            <Grid container item xs={12} md={6} justify="center">
                <Typography variant="h1" className={classes.title}>
                    Departamento - {departmentName}
                </Typography>
            </Grid>
            <Hidden mdDown>
                <Grid container item xs={12} md={3} justify="flex-end">
                    <BackButton
                        message={message}
                        redirect={
                            page === 'details'
                                ? `admin/${params.company}/departamentos`
                                : `admin/${
                                      params.company
                                  }/departamentos/${params.department!}/detalhes`
                        }
                    />
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default memo(Header);
