import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { TypeEmployee } from '../../../../../../../../services';
import useStyles from '../styles';

type Props = {
    person: TypeEmployee;
    index: number;
    handleRemove: (index: number) => void;
};

const UserItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { person, index = 0, handleRemove } = props;
    return (
        <Grid container item className={classes.personContainer}>
            <Grid item xs={2}>
                <Avatar src={person.image || undefined} />
            </Grid>
            <Grid container item xs={9} direction="column" justify="flex-start">
                <Grid item xs={12}>
                    <Typography className={classes.subtitle}>
                        {person.name} {person.surname}
                    </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <Tooltip
                        title="Visitar perfil"
                        arrow
                        placement="bottom-start"
                    >
                        <Typography
                            className={classes.subtitle2}
                            component="a"
                            href="/perfil"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @{person.username}
                        </Typography>
                    </Tooltip>
                </Grid> */}
            </Grid>
            <Grid
                item
                xs={1}
                style={{
                    alignSelf: 'center',
                }}
            >
                <CloseIcon
                    className={classes.icon}
                    onClick={() => handleRemove(index)}
                />
            </Grid>
        </Grid>
    );
};

export default UserItem;
