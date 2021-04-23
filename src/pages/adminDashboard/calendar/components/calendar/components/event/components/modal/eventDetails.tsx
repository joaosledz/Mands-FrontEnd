import React, {
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useContext,
} from 'react';
import calendarContext from '../../../../../../context';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { Edit as EditIcon } from '@styled-icons/material';
import { Delete as DeleteIcon } from '@styled-icons/material';
import { Text as TextIcon } from '@styled-icons/entypo';
import { Clock as ClockIcon } from '@styled-icons/fa-regular';
import { Groups as GroupsIcon } from '@styled-icons/material';
import { TypeEvent } from '../../../../../../models';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    event: TypeEvent;
    dayId: string;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, event, dayId } = props;
    const { onEventDelete } = useContext(calendarContext);
    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleEventDelete = () => {
        onEventDelete(event.eventId, dayId);
        handleCloseModal();
    };
    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={1}
                >
                    <Grid container justify="flex-end" spacing={1}>
                        <Grid item>
                            <Tooltip title="Editar" arrow>
                                <EditIcon
                                    className={classes.headerIcon}
                                    onClick={handleCloseModal}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Deletar" arrow>
                                <DeleteIcon
                                    className={classes.headerIcon}
                                    onClick={handleEventDelete}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item style={{ marginLeft: '0.5rem' }}>
                            <Tooltip title="Fechar" arrow>
                                <CloseIcon
                                    className={classes.headerIcon}
                                    onClick={handleCloseModal}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    {/* Event Title */}
                    <Grid container item>
                        <Grid item xs={1}>
                            <TextIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography className={classes.subtitle}>
                                {event.title}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Event Description */}
                    <Grid container item>
                        <Grid item xs={12}>
                            <Typography className={classes.description}>
                                {event.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Start and end time */}
                    <Grid container item>
                        <Grid item xs={1}>
                            <ClockIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography className={classes.subtitle}>
                                {event.startTime}-{event.endTime}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Groups */}
                    {(event.department || event.project) && (
                        <Grid container item>
                            <Grid item xs={1}>
                                <GroupsIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography className={classes.subtitle}>
                                    {event.department}-{event.project}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </>
        </Modal>
    );
};

export default memo(NewTaskModal);
