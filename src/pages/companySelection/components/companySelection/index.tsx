import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Company from './components/company';
import useStyles from './styles';

import ITLogo from '../../../../assets/companiesImages/IT2.png';

interface ICompanySelection {
    companies: Array<{ name: string }> | null;
}

const CompanySelection: React.FC<ICompanySelection> = ({ companies }) => {
    const classes = useStyles();

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
                        <Company logo={ITLogo} name={company.name} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CompanySelection;
