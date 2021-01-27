import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCompany from '../../../../../hooks/useCompany';

import { TypeCompany } from '../../../../../services';
import useStyles from './styles';

type Props = {
    company: TypeCompany;
};

const Company: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const { updateCompany } = useCompany();
    const { company } = props;
    const { imagePath, name, username } = company;

    const handleCompanySelection = () => {
        updateCompany(company);
        history.push(`/dashboard/${username}`);
    };

    return (
        <ButtonBase
            onClick={handleCompanySelection}
            className={classes.container}
        >
            <Avatar
                src={imagePath}
                alt={`${name} logo`}
                className={classes.companyLogo}
            >
                {name.substr(0, 1)}
            </Avatar>
            <Typography className={classes.companyName}>{name}</Typography>
        </ButtonBase>
    );
};

export default memo(Company);
