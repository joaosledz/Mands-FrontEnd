import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';

import TypeParams from '../../../../models/params';
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
    const { department } = props;

    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [departments, setDepartments] = useState<Array<
        TypeDepartment
    > | null>(null);

    useEffect(() => {
        const getAllDepartments = async () => {
            setLoading(true);
            try {
                // Fix: Mandar username da empresa
                // const response = await departmentApi.listByCompany(params.companyName);
                const response = await departmentApi.listByCompany(1);
                setDepartments(response.data);
                setLoading(false);
            } catch (error) {
                // toast de erro
                setLoading(false);
            }
        };
        getAllDepartments();
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
                                disabled={
                                    params.departmentName === department.name
                                }
                                selected={
                                    params.departmentName === department.name
                                }
                                onClick={() =>
                                    handleChangeDepartment(
                                        params.companyName,
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
                <Typography variant="h5">Carregando...</Typography>
            )}
        </React.Fragment>
    );
};

export default Header;
