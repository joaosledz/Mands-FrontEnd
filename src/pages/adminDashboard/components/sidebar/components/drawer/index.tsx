import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Routes, { setCompanyUsername } from './utils/routes';
import TypeParams from '../../../../../../models/params';
import useStyles from './styles';

type Props = {
    logo: string | undefined;
    divider?: boolean;
};

const Drawer: React.FC<Props> = (props: Props) => {
    const { logo, divider } = props;
    const classes = useStyles();
    const params = useParams<TypeParams>();

    const [page] = useState(window.location.href.split('/')[5]);

    useEffect(() => {
        setCompanyUsername(params.company);
    }, []);

    return (
        <Box className={classes.drawer}>
            <Box className={classes.logoContainer}>
                <Avatar src={logo} className={classes.logo} />
            </Box>
            {divider && (
                <Divider variant="middle" className={classes.divider} />
            )}
            <List>
                {Routes.map((route, index) => (
                    <ListItem
                        button
                        component={Link}
                        to={`/admin/${params.company}/${route.page}`}
                        key={index}
                        disabled={page === route.page}
                        className={
                            page === route.page ? classes.itemSelected : ''
                        }
                    >
                        <ListItemIcon className={classes.itemIconContainer}>
                            <img src={route.icon} alt={route.iconAlt} />
                        </ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>
            <Button
                component={Link}
                to={`/dashboard/${params.company}`}
                className={classes.backButton}
            >
                Voltar para o menu
            </Button>
        </Box>
    );
};

export default Drawer;
