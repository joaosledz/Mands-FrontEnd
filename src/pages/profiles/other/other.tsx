import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { userApi, TypeUser } from '../../../services';
import snackbarUtils from '../../../utils/functions/snackbarUtils';

import AppLayout from '../../../layout/appLayout';
import Paper from '@material-ui/core/Paper';
import UserInfo from '../user/details/components/userInfo/userInfo';
import SocialMedia from '../user/details/components/socialMedia/socialMedia';
import useStyles from '../user/details/styles';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    const params = useParams<{ username: string }>();

    const [user, setUser] = useState<TypeUser | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userApi.show(params.username);
                setUser(response.data);
                console.log(response.data.image);
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };
        fetchUserData();
    }, [params]);

    useEffect(() => {
        document.title = `@${user?.username}`;
    }, [user]);

    return (
        <AppLayout>
            <Paper className={classes.paper}>
                <Grid
                    container
                    justify="center"
                    component={Typography}
                    variant="h1"
                    color="primary"
                >
                    Perfil de {user?.name}
                </Grid>

                {user && (
                    <Grid container spacing={3} className={classes.gridUser}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <UserInfo
                                    name={`${user.name} ${user.surname}`}
                                    username={user.username}
                                    email={user.email}
                                    phone={user.phone}
                                    imagePath={user.image?.path}
                                />
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={12} md={2} />
                            </Hidden>
                            <Grid
                                item
                                xs={12}
                                md={5}
                                className={classes.gridUserItems}
                            >
                                <SocialMedia
                                    linkedin={user.linkedin}
                                    github={user.gitHub}
                                />
                            </Grid>
                        </Grid>

                        {user.biography && (
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    className={classes.gridUserItems}
                                >
                                    <Typography variant="h6" color="primary">
                                        Apresentação
                                    </Typography>
                                    <Typography>{user.biography}</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
