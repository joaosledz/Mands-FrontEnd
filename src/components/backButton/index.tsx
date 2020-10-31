import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { ArrowBack as ArrowBackIcon } from '@styled-icons/evaicons-solid';

import useStyles from './styles';

type Props = {
    message: string;
    white?: boolean;
    redirect?: string;
    replace?: string;
};

const BackButton: React.FC<Props> = (props: Props) => {
    const classes = useStyles(props);
    const history = useHistory();
    const { message, redirect, replace } = props;
    return (
        <>
            {redirect ? (
                <Link to={`/${redirect}`} className={classes.backButton}>
                    <ArrowBackIcon size="25" />
                    <Hidden mdDown>
                        <Typography id="custom-message">{message}</Typography>
                    </Hidden>
                    <Hidden lgUp>
                        <Typography id="default-message">Voltar</Typography>
                    </Hidden>
                </Link>
            ) : (
                <Button
                    onClick={
                        replace
                            ? () => history.replace(replace)
                            : () => history.goBack()
                    }
                    className={[classes.backButton, classes.button].join(' ')}
                >
                    <ArrowBackIcon size="25" />
                    <Hidden mdDown>
                        <Typography id="custom-message">{message}</Typography>
                    </Hidden>
                    <Hidden lgUp>
                        <Typography id="default-message">Voltar</Typography>
                    </Hidden>
                </Button>
            )}
        </>
    );
};

export default BackButton;
