import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { UserCompanyType } from '../../../services';

import Company from './company';
import useStyles from './styles';

type Props = {
    companies: Array<UserCompanyType>;
};

const CompanySelection: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { companies } = props;

    return (
        <Grid container className={classes.companiesContainer}>
            <Grid container item xs={12} justify="center">
                <Typography variant="h6" className={classes.title}>
                    Qual empresa você gostaria de acessar?
                </Typography>
            </Grid>
            <Grid container justify="center" spacing={3}>
                {companies?.map(company => (
                    <Grid key={company.companyId} item xs={12} sm={4} md={3}>
                        <Company company={company} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default CompanySelection;
