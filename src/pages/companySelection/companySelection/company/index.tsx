import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { CompanyType } from '../../../../services';
import handleUrlParamName from '../../../../utils/functions/handleUrlParamName';

import useStyles from './styles';

type Props = {
    company: CompanyType;
};

const Company: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const { company } = props;
    const { image, name } = company;

    const handleCompanySelection = (companyData: CompanyType) => {
        sessionStorage.setItem(
            '@Mands:CompanyData',
            JSON.stringify(companyData)
        );
        history.push(`/dashboard/${handleUrlParamName(name)}`);
    };

    return (
        <ButtonBase
            onClick={() => handleCompanySelection(company)}
            className={classes.container}
        >
            <Avatar
                src={image}
                alt={`${name} logo`}
                className={classes.companyLogo}
            />
            <Typography className={classes.companyName}>{name}</Typography>
        </ButtonBase>
    );
};

export default memo(Company);
