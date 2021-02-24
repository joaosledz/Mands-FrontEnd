import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { companyApi } from '../../../services';
import snackbarUtils from '../../../utils/functions/snackbarUtils';
import useQuery from '../../../hooks/useQuery';

import MandsLogo from '../../../assets/logo/mands.png';
import useStyles from './styles';

const AcceptInvite: React.FC = () => {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        token: '',
        user: '',
        company: '',
    });

    useEffect(() => {
        const handleQueryParams = () => {
            const token = query.get('token');
            const user = query.get('username');
            const company = query.get('companyname');
            console.log(token, user, company);

            if (token && user && company)
                setData({
                    token,
                    user,
                    company,
                });
        };
        handleQueryParams();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await companyApi.acceptInvite(data.token);
            snackbarUtils.success('Convite aceito com sucesso');
            history.replace('/');
        } catch (error) {
            console.error(error);
            snackbarUtils.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Backdrop open={loading} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container className={classes.container}>
                <Card className={classes.cardContainer}>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            className={classes.contentContainer}
                        >
                            <Grid container item justify="center">
                                <img src={MandsLogo} alt="logo do mands" />
                            </Grid>
                            <Grid container item>
                                <Typography variant="h1" color="primary">
                                    Olá, @{data.user}
                                </Typography>
                            </Grid>
                            <Grid container item>
                                <Typography>
                                    @{data.company} convidou você para fazer
                                    parte do time deles.
                                </Typography>
                            </Grid>
                            <Grid
                                id="buttons-container"
                                container
                                item
                                justify="center"
                                alignItems="center"
                                spacing={3}
                            >
                                <Grid container item xs={6} justify="center">
                                    <Button
                                        onClick={handleSubmit}
                                        className={classes.acceptButton}
                                    >
                                        Aceitar Convite
                                    </Button>
                                </Grid>
                                <Grid container item xs={6} justify="center">
                                    <Button
                                        onClick={() => history.replace('/')}
                                        className={classes.declineButton}
                                    >
                                        Recusar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    );
};

export default AcceptInvite;
