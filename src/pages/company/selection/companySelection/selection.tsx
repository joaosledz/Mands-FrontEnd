import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { TypeCompany } from '../../../../services';

import Company from './company';
import useStyles from './styles';

import QuitModal from './quitModal';

type Props = {
    companies: Array<TypeCompany>;
};

const CompanySelection: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { companies } = props;
    const [data, setData] = useState<Array<TypeCompany>>();
    const [quitModal, setQuitModal] = useState(false);
    const [company, setCompany] = useState<TypeCompany>();

    useEffect(() => {
        if (companies) setData(companies);
    }, [companies]);

    const openQuitModal = async (item: TypeCompany | undefined) => {
        setCompany(item);
        setQuitModal(true);
    };

    const handleQuit = (item: TypeCompany) => {
        const aux: Array<TypeCompany> = [];
        data?.forEach(company => {
            if (company.companyId !== item.companyId) aux.push(company);
        });
        setData(aux);
    };

    return (
        <Grid container className={classes.companiesContainer}>
            <Grid container item xs={12} justify="center">
                <Typography variant="h6" className={classes.title}>
                    Qual empresa você gostaria de acessar?
                </Typography>
            </Grid>
            <Grid container justify="center" spacing={3}>
                {data?.map(item => (
                    <Grid
                        key={item.companyId}
                        item
                        xs={12}
                        sm={5}
                        md={3}
                        lg={2}
                        xl={2}
                    >
                        <Company
                            company={item}
                            onQuit={() => openQuitModal(item)}
                        />
                    </Grid>
                ))}
            </Grid>
            <QuitModal
                isOpen={quitModal}
                setIsOpen={setQuitModal}
                company={company}
                onQuit={handleQuit}
            />
        </Grid>
    );
};

export default CompanySelection;
