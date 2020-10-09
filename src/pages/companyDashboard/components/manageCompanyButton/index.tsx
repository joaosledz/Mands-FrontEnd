import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import TypeCompany from '../../../../models/company';
import handleUrlParamName from '../../../../utils/functions/handleUrlParamName';

import CompanyIcon from '../../../../assets/selectableIcons/company.svg';
import useStyles from './styles';

type Props = {
    company: TypeCompany;
};

const ManageCompanyButton: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = props;
    const { name } = company;

    return (
        <Link
            component={RouterLink}
            to={`/admin/${handleUrlParamName(name)}/departamentos`}
            className={classes.button}
        >
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
