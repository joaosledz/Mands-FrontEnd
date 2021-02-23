import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';

import { TypeUser } from '../../../../../../services';
import userIcon from '../../../../../../assets/icons/usericon.svg';
import { TypeMember } from '../../../../../../services';
import useStyles from '../../styles';

type Props = {
    person: TypeUser;
    handleRemove: () => void;
};

const UserItem: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { person, handleRemove } = props;
    return (
        <Grid container item className={classes.personContainer}>
            <Grid item xs={2}>
                <Avatar src={person.image?.path || userIcon} />
            </Grid>
            <Grid container item xs={9} direction="column" justify="flex-start">
                <Grid item xs={12}>
                    <Typography className={classes.subtitle}>
                        {person.name} {person.surname}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
            </Grid>
            <Grid
                item
                xs={1}
                style={{
                    alignSelf: 'center',
                }}
            >
                <CloseIcon className={classes.icon} onClick={handleRemove} />
            </Grid>
        </Grid>
    );
};

export default UserItem;
