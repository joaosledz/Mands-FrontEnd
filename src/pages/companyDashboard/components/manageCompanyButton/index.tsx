import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import CompanyIcon from '../../../../assets/selectableIcons/company.svg';
import useStyles from './styles';

const ManageCompanyButton: React.FC = () => {
    const classes = useStyles();

    return (
        <Link component={RouterLink} to="/" className={classes.button}>
            <img
                src={CompanyIcon}
                className={classes.image}
                alt="Ícone de uma prédio"
            />
            <Typography>Gerenciar empresa</Typography>
        </Link>
    );
};

export default ManageCompanyButton;
