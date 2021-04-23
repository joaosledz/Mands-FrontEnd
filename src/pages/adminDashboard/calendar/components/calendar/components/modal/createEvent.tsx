import React, {
    Dispatch,
    SetStateAction,
    memo,
    useContext,
    useState,
} from 'react';

import calendarContext from '../../../../context';
import SubmitButton from '../mainButton';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
// import Typography from '@material-ui/core/Typography';

import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { Text as TextIcon } from '@styled-icons/entypo';
import { Clock as ClockIcon } from '@styled-icons/fa-regular';
import { Groups as GroupsIcon } from '@styled-icons/material';
import { DateRange as ScheduleIcon } from '@styled-icons/material';

import { TypeEvent } from '../../../../models';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type TypeErrors = {
    scheduleId?: string;
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    department?: string;
    project?: string;
    day?: string;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { onEventCreate, schedules } = useContext(calendarContext);

    const [formValues, setFormValues] = useState<TypeEvent>({
        scheduleId: -1,
        eventId: '',
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        color: '',
        department: '',
        project: '',
    });
    const [day, setDay] = useState<string>('');
    const [errors, setErrors] = useState<TypeErrors>({});

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

    const handleChange = (key: string, value: any) => {
        setFormValues({
            ...formValues,
            [key]: value,
        });
    };

    const onSubmit = async (event: TypeEvent) => {
        try {
            if (handleErrors()) return;

            const newEvent: TypeEvent = {
                ...event,
                color: getScheduleColor(event.scheduleId),
                department: event.department ? event.department : null,
                project: event.project ? event.project : null,
            };

            let dateFormatted: string[] | string = day.split('-');
            dateFormatted = `${dateFormatted[2]}/${dateFormatted[1]}/${dateFormatted[0]}`;

            onEventCreate(newEvent, dateFormatted);
            handleCloseModal();

            snackbarUtils.success('Evento criado com sucesso');
        } catch (err) {
            console.log(err);
            snackbarUtils.error('Erro ao tentar criar evento');
        }
    };

    const handleErrors = (): boolean => {
        let auxErrors: TypeErrors = {};

        if (day === '') auxErrors.day = 'Precisa ser preenchido';
        if (formValues.title === '') auxErrors.title = 'Precisa ser preenchido';
        if (formValues.startTime === '')
            auxErrors.startTime = 'Precisa ser preenchido';
        if (formValues.endTime === '')
            auxErrors.endTime = 'Precisa ser preenchido';
        if (formValues.scheduleId === -1)
            auxErrors.scheduleId = 'Precisa ser preenchido';

        const errorsSize = Object.keys(auxErrors).length;

        setErrors(auxErrors);

        if (errorsSize > 0) return true;

        return false;
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

                <Grid container item alignItems="center">
                    <Grid item xs={1}>
                        <TextIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            variant="outlined"
                            data-cy="event-title"
                            label="Título do evento"
                            error={errors?.title ? true : false}
                            helperText={errors?.title}
                            className={classes.textFieldGrid}
                            autoFocus
                            value={formValues.title}
                            onChange={e =>
                                handleChange('title', e.target.value)
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container item alignItems="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={11}>
                        <TextField
                            variant="outlined"
                            data-cy="event-description"
                            label="Descrição"
                            error={errors?.description ? true : false}
                            helperText={errors?.description}
                            multiline
                            rows={3}
                            className={classes.textFieldGrid}
                            value={formValues.description}
                            onChange={e =>
                                handleChange('description', e.target.value)
                            }
                        />
                    </Grid>
                </Grid>

                {/* TODO: Arrumar exibição da data e das horas */}
                <Grid container item alignItems="center">
                    <Grid item xs={1}>
                        <ClockIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="date"
                            label="Data"
                            data-cy="event-day"
                            value={day}
                            onChange={e => setDay(e.target.value)}
                            error={errors?.day ? true : false}
                            helperText={errors?.day}
                        />
                    </Grid>
                </Grid>

                <Grid container item alignItems="center">
                    <Grid item xs={1} />
                    <Grid item xs={4}>
                        <TextField
                            type="time"
                            label="Hora inicial"
                            data-cy="event-startTime"
                            error={errors?.startTime ? true : false}
                            helperText={errors?.startTime}
                            value={formValues.startTime}
                            onChange={e =>
                                handleChange('startTime', e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: 10 }}>
                        <TextField
                            type="time"
                            label="Hora Final"
                            data-cy="event-endTime"
                            error={errors?.endTime ? true : false}
                            helperText={errors?.endTime}
                            value={formValues.endTime}
                            onChange={e =>
                                handleChange('endTime', e.target.value)
                            }
                        />
                    </Grid>
                </Grid>

                {/* TODO: Pegar departamentos e projetos dispónivies para esse usuario */}
                <Grid container item alignItems="center">
                    <Grid item xs={1}>
                        <GroupsIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Departamento"
                            data-cy="event-department"
                            error={errors?.department ? true : false}
                            helperText={errors?.department}
                            value={formValues.department}
                            onChange={e =>
                                handleChange('department', e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: 10 }}>
                        <TextField
                            label="Projeto"
                            data-cy="event-project"
                            error={errors?.project ? true : false}
                            helperText={errors?.project}
                            value={formValues.project}
                            onChange={e =>
                                handleChange('project', e.target.value)
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container item alignItems="center">
                    <Grid item xs={1}>
                        <ScheduleIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            select
                            label="Selecione uma Agenda"
                            data-cy="event-schedule"
                            error={errors?.scheduleId ? true : false}
                            helperText={errors?.scheduleId}
                            value={formValues.scheduleId}
                            onChange={e =>
                                handleChange('scheduleId', e.target.value)
                            }
                        >
                            <MenuItem key={-1} value={-1}>
                                Selecionar
                            </MenuItem>
                            {schedules.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <SubmitButton
                        dataCy="submit-permission-button"
                        text="Cadastrar"
                        mt={20}
                        hg={40}
                        mw={200}
                        mwt={250}
                        onClick={() => onSubmit(formValues)}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default memo(NewTaskModal);
