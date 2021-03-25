import React from 'react';
import { useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { TypeDepartment } from '../../../../../../services';
import useDepartment from '../../../../../../hooks/useDepartment';
import DefaultDepartmentIcon from '../../../../../../assets/selectableIcons/defaultDepartment.svg';
import useStyles from './styles';

type Props = {
    department: TypeDepartment;
};

const Department: React.FC<Props> = ({ department }) => {
    const classes = useStyles();
    const { name, image } = department;

    const params = useParams<{ company: string }>();
    const { updateDepartment } = useDepartment();

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
            onClick={() => updateDepartment(department)}
            className={classes.department}
        >
            <img
                src={
                    image
                        ? image.path || DefaultDepartmentIcon
                        : DefaultDepartmentIcon
                }
                alt="Ícone do Departamento"
            />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default Department;
