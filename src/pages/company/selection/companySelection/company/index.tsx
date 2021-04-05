import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCompany from '../../../../../hooks/useCompany';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';

import { TypeCompany } from '../../../../../services';
import useStyles from './styles';

type Props = {
    company: TypeCompany;
    onQuit(): void;
};

const Company: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const { updateCompany } = useCompany();
    const { company, onQuit } = props;
    const { imagePath, name, username } = company;

    const handleCompanySelection = () => {
        updateCompany(company);
        history.push(`/dashboard/${username}`);
    };

    return (
        <Card className={classes.container} variant="outlined">
            <ButtonBase
                className={classes.content}
                onClick={handleCompanySelection}
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
            <IconButton
                aria-label="delete"
                className={classes.quitButton}
                onClick={onQuit}
            >
                <CloseIcon />
            </IconButton>
        </Card>
    );
};

export default memo(Company);
