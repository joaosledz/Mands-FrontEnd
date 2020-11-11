import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ChevronDown as ChevronDownIcon } from '@styled-icons/entypo';
import { Plus as PlusIcon } from '@styled-icons/entypo';

import { UserCompanyType, companyApi } from '../../../../../services';

import ITLogo from '../../../../../assets/fakeDataImages/companiesImages/IT2.png';
import useStyles from './styles';

type Props = {
    company: UserCompanyType;
};

const Header: React.FC<Props> = ({ company }) => {
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [companies, setCompanies] = useState<Array<UserCompanyType> | null>(
        null
    );

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

    const handleChangeCompany = (company_username: string) => {
        history.replace(`/dashboard/${company_username}`);
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
                    <MenuItem
                        key={company.companyId}
                        onClick={() => handleChangeCompany(company.username)}
                    >
                        {company.name}
                    </MenuItem>
                ))}
                <MenuItem disabled>
                    <Divider variant="middle" />
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/cadastrar-empresa"
                    className={classes.registerCompany}
                >
                    <PlusIcon size={16} />{' '}
                    <Typography>Criar nova empresa</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Header;
