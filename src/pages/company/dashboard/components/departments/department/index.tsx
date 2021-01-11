import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import TypeParams from '../../../../../../models/params';
import { TypeDepartment } from '../../../../../../services';

import DefaultDepartmentIcon from '../../../../../../assets/selectableIcons/defaultDepartment.svg';
import useStyles from './styles';
import useDepartment from '../../../../../../hooks/useDepartment';

type Props = {
    department: TypeDepartment;
};

const Department: React.FC<Props> = ({ department }) => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const { name, image } = department;
    const { updateDepartment } = useDepartment();

    const handleSelection = (department: TypeDepartment) => {
        updateDepartment(department);
    };

    return (
        <Link
            component={RouterLink}
            to={`/${params.company}/${name.toLowerCase()}`}
            // to={{
            //     pathname: `/${params.company}/${name.toLowerCase()}`,
            //     state: { department },
            // }}
            onClick={() => handleSelection(department)}
            className={classes.department}
        >
            <img
                src={image || DefaultDepartmentIcon}
                alt="Ícone do Departamento"
            />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default memo(Department);
