import React from 'react';
import { useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { ApiProps as DepartmentType } from '../../../../../../models/department';

import useStyles from './styles';

type ParamsType = {
    company: string;
};

type Props = {
    department: DepartmentType;
};

const Department: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { department } = props;
    const { name, icon } = department;

    const params = useParams<ParamsType>();

    return (
        <Link
            component={RouterLink}
            to={{
                pathname: `/admin/${
                    params.company
                }/departamentos/${name.toLowerCase()}/detalhes`,
                state: {
                    department: department,
                },
            }}
            className={classes.department}
        >
            <img src={icon} alt="Ícone do Departamento" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default Department;
