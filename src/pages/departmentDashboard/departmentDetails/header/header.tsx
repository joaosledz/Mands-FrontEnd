import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';

import { ApiProps as DepartmentType } from '../../../../models/department';

import useStyles from './styles';

type Props = {
    department: DepartmentType | undefined;
    departments: Array<DepartmentType>;
};

const Header: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { department, departments } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button onClick={handleOpen} className={classes.button}>
                <img src={department?.icon} alt="ícone do departamento" />
                <Typography variant="h5" /* className={classes.companyName} */>
                    {department?.name}
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
                    <MenuItem onClick={handleClose}>
                        {department?.name}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default Header;
