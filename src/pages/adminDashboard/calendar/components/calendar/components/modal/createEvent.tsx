import React, { Dispatch, SetStateAction, memo, useContext } from 'react';

import calendarContext from '../../../../context';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { TypeEvent, TypeFormEvent } from '../../../../models';
import FormEvent from '../form/event';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NewEventModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { onEventCreate, schedules } = useContext(calendarContext);

    const handleCloseModal = () => {
        setIsOpen(false);
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
        data.eventId = (Math.random() * 10000).toString();
        let dateFormatted: string[] | string = data.date.split('-');
        dateFormatted = `${dateFormatted[2]}/${dateFormatted[1]}/${dateFormatted[0]}`;
        let auxEvent: any = data;
        auxEvent.scheduleId = parseInt(auxEvent.scheduleId);
        delete auxEvent.date;
        try {
            const newEvent: TypeEvent = {
                ...auxEvent,
                color: getScheduleColor(auxEvent.scheduleId),
                department: auxEvent.department ? auxEvent.department : null,
                project: auxEvent.project ? auxEvent.project : null,
            };
            console.log(newEvent, dateFormatted);
            onEventCreate(newEvent, dateFormatted);
            handleCloseModal();

            snackbarUtils.success('Evento criado com sucesso');
        } catch (err) {
            console.log(err);
            snackbarUtils.error('Erro ao tentar criar evento');
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
            <Grid
                container
                component={Paper}
                className={classes.paper}
                spacing={2}
            >
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item style={{ marginLeft: '0.5rem' }}>
                        <Tooltip title="Fechar" arrow>
                            <CloseIcon
                                className={classes.headerIcon}
                                onClick={handleCloseModal}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
                <FormEvent
                    onSubmit={onSubmit}
                    setIsOpen={setIsOpen}
                    schedules={schedules}
                />
            </Grid>
        </Modal>
    );
};

export default memo(NewEventModal);
