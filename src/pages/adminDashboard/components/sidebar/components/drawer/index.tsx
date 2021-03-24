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

import Routes from './utils/routes';
import TypeParams from '../../../../../../models/params';
import useStyles from './styles';

import { IRoutes } from './models/iRoutes';
import { TypeCompany } from '../../../../../../services';

type Props = {
    logo: string | undefined;
    divider?: boolean;
    company?: TypeCompany | null;
};

const Drawer: React.FC<Props> = (props: Props) => {
    const { logo, divider, company } = props;
    const classes = useStyles();
    const params = useParams<TypeParams>();

    const [page] = useState(window.location.href.split('/')[5]);

    const [possibleRoutes, setRoutes] = useState<IRoutes>([]);

    useEffect(() => {
        if (!company) return;

        const userPerms = company.userPermission;
        const aux: IRoutes = [];

        Routes.forEach(route => {
            switch (route.name) {
                default:
                    aux.push(route);
                    break;
                case 'Departamentos':
                    if (userPerms?.department) aux.push(route);
                    break;
                case 'Funcionários':
                    if (userPerms?.acceptUser) aux.push(route);
                    break;
            }
        });

        setRoutes(aux);
    }, [company]);

    return (
        <Box className={classes.drawer}>
            <Box className={classes.logoContainer}>
                <Avatar src={logo} className={classes.logo} />
            </Box>
            {divider && (
                <Divider variant="middle" className={classes.divider} />
            )}
            <List>
                {possibleRoutes.map(route => (
                    <ListItem
                        button
                        component={Link}
                        to={`/admin/${params.company}/${route.page}`}
                        key={route.page}
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
