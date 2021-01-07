import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { UserCompanyType } from '../../../../services';

import CompanyIcon from '../../../../assets/selectableIcons/company.svg';
import useStyles from './styles';

type Props = {
    company: UserCompanyType;
};

const ManageCompanyButton: React.FC<Props> = ({ company }) => {
    const classes = useStyles();
    const { username } = company;

    return (
        <Link
            component={RouterLink}
            to={`/admin/${username}/detalhes`}
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

export default memo(ManageCompanyButton);
