import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { authApi } from '../../../services';
import snackbarUtils from '../../../utils/functions/snackbarUtils';
import useQuery from '../../../hooks/useQuery';

import MandsLogo from '../../../assets/logo/mands.png';
import useStyles from './styles';

const ConfirmAccount: React.FC = () => {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        token: '',
        username: '',
    });

    useEffect(() => {
        const handleQueryParams = () => {
            const token = query.get('token');
            const username = query.get('username');

            if (token && username)
                setData({
                    token,
                    username,
                });
        };
        handleQueryParams();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await authApi.confirmAccount(data.token);
            snackbarUtils.success('Conta confirmada com sucesso');
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
                    <CardContent className={classes.contentContainer}>
                        <Grid container justify="center">
                            <img src={MandsLogo} alt="logo do mands" />
                        </Grid>
                        <Grid container>
                            <Typography>
                                Quase pronto, <b>@{data.username}!</b> Para
                                completar seu cadastro, basta clicar no botão
                                abaixo.
                            </Typography>
                        </Grid>
                        <Grid container justify="center">
                            <Button onClick={handleSubmit}>
                                confirmar conta
                            </Button>
                        </Grid>
                        <Grid container>
                            <Typography>
                                Com a verificação, você poderá utilizar de todas
                                as funcionalidades do Mands.
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    );
};

export default ConfirmAccount;
