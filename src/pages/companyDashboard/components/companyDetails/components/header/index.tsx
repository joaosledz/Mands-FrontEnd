import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';

import { CompanyType, companyApi } from '../../../../../../services';

import ITLogo from '../../../../../../assets/fakeDataImages/companiesImages/IT2.png';
import useStyles from './styles';

type Props = {
    company: CompanyType;
};

const Header: React.FC<Props> = ({ company }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [companies, setCompanies] = useState<Array<CompanyType> | null>(null);

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const response = await companyApi.userCompanies();
                setCompanies(response.data);
            } catch (error) {
                // Alerta de erro
            }
        };
        getAllCompanies();
    }, []);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button onClick={handleOpen}>
                <Avatar
                    src={ITLogo}
                    alt="Logo da empresa"
                    className={classes.avatar}
                />
                <Typography variant="h5" className={classes.companyName}>
                    {company.name}
                </Typography>
                <ChevronDownIcon size={24} color="#505050" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled>Trocar de empresa:</MenuItem>
                {companies?.map(company => (
                    <MenuItem onClick={handleClose}>{company.name}</MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default Header;
