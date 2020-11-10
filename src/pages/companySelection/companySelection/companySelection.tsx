import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { CompanyType } from '../../../services';

import Company from './company';
import useStyles from './styles';

type Props = {
    companies: Array<CompanyType>;
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
            {companies?.map(company => (
                <Grid
                    key={company.companyId}
                    container
                    item
                    xs={12}
                    sm={3}
                    justify="center"
                >
                    <Company company={company} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CompanySelection;
