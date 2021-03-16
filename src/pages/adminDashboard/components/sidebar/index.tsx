import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@styled-icons/entypo';

import useCompany from '../../../../hooks/useCompany';
import DrawerComponent from './components/drawer';
import useStyles from './styles';

type Props = {};

const SideBar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { company } = useCompany();

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon size="22" color="white" />
            </IconButton>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <DrawerComponent
                            logo={company?.imagePath}
                            company={company}
                        />
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaperPermanent,
                        }}
                        variant="permanent"
                        open
                    >
                        <DrawerComponent logo={company?.imagePath} divider />
                    </Drawer>
                </Hidden>
            </nav>
        </Box>
    );
};

export default SideBar;
