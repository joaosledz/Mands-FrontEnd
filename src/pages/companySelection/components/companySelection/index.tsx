import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CompanyType from '../../../../models/company';

import Company from './components/company';
import useStyles from './styles';

type Props = {
    companies: Array<CompanyType>;
};

const CompanySelection: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { companies } = props;

    return (
        <Box className={classes.container}>
            <Typography variant="h6" className={classes.title}>
                Qual empresa você gostaria de acessar?
            </Typography>
            <Grid container spacing={3} className={classes.companiesContainer}>
                {companies?.map(company => (
                    <Grid
                        container
                        item
                        xs={12}
                        md={
                            companies.length > 1
                                ? companies.length > 2
                                    ? 4
                                    : 6
                                : 12
                        }
                        style={{ justifyContent: 'center' }}
                    >
                        <Company company={company} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CompanySelection;
