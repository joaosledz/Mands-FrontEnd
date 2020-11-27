import React, { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import useAuth from '../../../../hooks/useAuth';

import logo from '../../../../assets/logo/logo_branca.svg';
import avatar from '../../../../assets/fakeDataImages/employees/anaTartari.png';
import useStyles from './styles';

const Header: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const { logout, user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container component="header" className={classes.container}>
            <Grid item xs={4} />
            <Grid container item justify="center" xs={4}>
                <img src={logo} alt="Logo do Mands" className={classes.logo} />
            </Grid>
            <Grid container item xs={4} className={classes.rightSide}>
                <ButtonBase onClick={handleClick}>
                    <Avatar
                        src={user?.image?.path || avatar}
                        alt={`${user?.name} avatar`}
                    />
                    <Hidden only="xs">
                        <Typography
                            style={{ color: 'white', fontSize: '0.9rem' }}
                        >
                            {user?.name}
                        </Typography>
                    </Hidden>
                </ButtonBase>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className={classes.menu}
                >
                    {location.pathname !== '/perfil' &&
                        location.pathname !== '/editar-perfil' && (
                            <MenuItem
                                component={Link}
                                to={'/perfil'}
                                onClick={handleClose}
                            >
                                Perfil
                            </MenuItem>
                        )}
                    <MenuItem onClick={logout}>Sair</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default memo(Header);
