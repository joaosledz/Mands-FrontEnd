import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';

import TypeParams from '../../../../models/params';
import useCompany from '../../../../hooks/useCompany';
import { TypeDepartment, departmentApi } from '../../../../services';

import DefaultDepartmentImage from '../../../../assets/selectableIcons/defaultDepartment.svg';
import useStyles from './styles';

type Props = {
    department: TypeDepartment;
};

const Header: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const history = useHistory();
    const { company } = useCompany();
    const { department } = props;

    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [departments, setDepartments] = useState<Array<
        TypeDepartment
    > | null>(null);

    useEffect(() => {
        const getAllDepartments = async () => {
            if (company) {
                setLoading(true);
                try {
                    const response = await departmentApi.listByCompany(
                        company.companyId
                    );
                    setDepartments(response.data);
                    setLoading(false);
                } catch (error) {
                    // toast de erro
                    setLoading(false);
                }
            } else getAllDepartments();
        };
        getAllDepartments();
        // eslint-disable-next-line
    }, []);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeDepartment = (
        company_username: string,
        department_name: string
    ) => {
        history.replace(`/${company_username}/${department_name}`);
    };

    return (
        <React.Fragment>
            {!loading && departments ? (
                <Box>
                    <Button onClick={handleOpen} className={classes.button}>
                        <img
                            src={department.image || DefaultDepartmentImage}
                            alt="ícone do departamento"
                        />
                        <Typography
                            variant="h5" /* className={classes.companyName} */
                        >
                            {department.name}
                        </Typography>
                        <ChevronDownIcon color="#505050" />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>Trocar de Departamento:</MenuItem>
                        {departments.map(department => (
                            <MenuItem
                                key={department.departmentId}
                                disabled={params.department === department.name}
                                selected={params.department === department.name}
                                onClick={() =>
                                    handleChangeDepartment(
                                        params.company,
                                        department.name
                                    )
                                }
                            >
                                {department.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            ) : (
                <Skeleton variant="rect" width={'40%'} height={80} />
            )}
        </React.Fragment>
    );
};

export default Header;
