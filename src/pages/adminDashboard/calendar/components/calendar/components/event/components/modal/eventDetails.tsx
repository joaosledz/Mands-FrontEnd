import React, {
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useContext,
    useState,
} from 'react';
import calendarContext from '../../../../../../context';
import FormEvent from '../../../form/event';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import snackbarUtils from '../../../../../../../../../utils/functions/snackbarUtils';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { Edit as EditIcon } from '@styled-icons/material';
import { Delete as DeleteIcon } from '@styled-icons/material';
import { Text as TextIcon } from '@styled-icons/entypo';
import { Clock as ClockIcon } from '@styled-icons/fa-regular';
import { Groups as GroupsIcon } from '@styled-icons/material';
import { TypeEvent, TypeFormEvent } from '../../../../../../models';
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
    const [edit, setEdit] = useState<boolean>(false);
    const {
        onEventDelete,
        /*onEventChange,*/ onEventEdit,
        schedules,
    } = useContext(calendarContext);
    const [defaultValues, setDefaultValues] = useState<TypeFormEvent>();
    useEffect(() => {
        let auxValues: any = event;
        auxValues.date = dayId;
        setDefaultValues(auxValues);
    }, [isOpen, dayId, event]);

    const handleCloseModal = () => {
        setIsOpen(false);
        setEdit(false);
    };
    const handleEventDelete = () => {
        onEventDelete(event.eventId, dayId);
        handleCloseModal();
    };
    const getScheduleColor = (scheduleId: number): string => {
        let color: string = 'pink';
        schedules.forEach(element => {
            if (element.id === scheduleId) color = element.color;
        });

        return color;
    };
    const onSubmit = async (data: TypeFormEvent) => {
        console.log(data);
        let auxEvent: any = data;
        auxEvent.eventId = event.eventId;
        auxEvent.scheduleId = parseInt(auxEvent.scheduleId);
        // let newDay = auxEvent.date;

        delete auxEvent.date;
        try {
            const updatedEvent: TypeEvent = {
                ...auxEvent,
                color: getScheduleColor(auxEvent.scheduleId),
                department: auxEvent.department ? auxEvent.department : null,
                project: auxEvent.project ? auxEvent.project : null,
            };
            console.log(updatedEvent);
            // onEventChange(dayId, newDay ,event.eventId)
            onEventEdit(updatedEvent);
            handleCloseModal();

            snackbarUtils.success('Evento editado com sucesso');
        } catch (err) {
            console.log(err);
            snackbarUtils.error('Erro ao tentar editar evento');
        }
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
                                    onClick={() => setEdit(true)}
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
                    {!edit ? (
                        <>
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
                            <Grid container item>
                                <Grid item xs={12}>
                                    <Typography className={classes.description}>
                                        {event.description}
                                    </Typography>
                                </Grid>
                            </Grid>
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
                            {(event.department || event.project) && (
                                <Grid container item>
                                    <Grid item xs={1}>
                                        <GroupsIcon className={classes.icon} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography
                                            className={classes.subtitle}
                                        >
                                            {event.department}-{event.project}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </>
                    ) : (
                        <FormEvent
                            onSubmit={onSubmit}
                            setIsOpen={setIsOpen}
                            schedules={schedules}
                            defaultValues={defaultValues}
                        />
                    )}
                </Grid>
            </>
        </Modal>
    );
};

export default memo(NewTaskModal);
