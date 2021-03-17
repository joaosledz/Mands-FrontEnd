import React, { useState, useEffect, memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import TypeParams from '../../../../models/params';
import useCompany from '../../../../hooks/useCompany';
import useDepartment from '../../../../hooks/useDepartment';
import {
    TypeDepartment,
    departmentApi,
    departmentPermApi,
} from '../../../../services';

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
    const { updateDepartment } = useDepartment();
    const { department } = props;

    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [departments, setDepartments] = useState<Array<
        TypeDepartment
    > | null>(null);

    const [editPerm, setEditPerm] = useState(false);

    useEffect(() => {
        const chechPermissions = async () => {
            try {
                const departmentId = department.departmentId;
                const userCompPerm = company?.userPermission?.department;
                const {
                    data: { editDepartment },
                } = await departmentPermApi.getUserPermissions(departmentId);

                if (userCompPerm || editDepartment) setEditPerm(true);
            } catch (err) {
                console.log(err);
            }
        };
        if (company && department) chechPermissions();
    }, [company, department]);

    useEffect(() => {
        const getAllDepartments = async () => {
            if (company) {
                setLoading(true);
                try {
                    const response = await departmentApi.listByCompany(
                        company.companyId
                    );
                    setDepartments(response.data);
                } catch (error) {
                    // toast de erro
                } finally {
                    setLoading(false);
                }
            }
        };
        getAllDepartments();
    }, [company]);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeDepartment = (
        company_username: string,
        department: TypeDepartment
    ) => {
        handleClose();
        updateDepartment(department);
        history.replace(`/${company_username}/${department.name}`);
    };

    const handleEdit = () => {
        history.push(
            `/admin/${
                params.company
            }/departamentos/${params.department!.toLowerCase()}/detalhes`,
            {
                department: department,
            }
        );
        updateDepartment(department);
    };

    return (
        <React.Fragment>
            {!loading && departments ? (
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
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

                    {editPerm && (
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    )}

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>Trocar de Departamento:</MenuItem>
                        {departments.map(department => {
                            const isEqual =
                                params.department?.toLowerCase() ===
                                department.name.toLowerCase();
                            return (
                                <MenuItem
                                    key={department.departmentId}
                                    disabled={isEqual}
                                    selected={isEqual}
                                    onClick={() =>
                                        handleChangeDepartment(
                                            params.company,
                                            department
                                        )
                                    }
                                >
                                    {department.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Grid>
            ) : (
                <Skeleton variant="rect" width={'40%'} height={80} />
            )}
        </React.Fragment>
    );
};

export default memo(Header);
