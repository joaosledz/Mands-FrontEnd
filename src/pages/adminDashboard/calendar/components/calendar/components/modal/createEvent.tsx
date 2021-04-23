import React, { Dispatch, SetStateAction, memo, useContext } from 'react';

import calendarContext from '../../../../context';
import SubmitButton from '../mainButton';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';
import { useForm } from 'react-hook-form';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

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

type TypeCreateEvent = {
    scheduleId: number;
    eventId: string;
    title: string;
    description: string;
    color: string;
    startTime: string;
    endTime: string;
    department?: string;
    project?: string;
    date: string;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { onEventCreate, schedules } = useContext(calendarContext);

    const { register, errors, handleSubmit, formState } = useForm<
        TypeCreateEvent
    >({});

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
    const onSubmit = async (data: TypeCreateEvent) => {
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

    // const handleHelperText = (name: keyof TypeCreateEvent) =>{
    //     errors?[name]
    //         ? '⚠' +
    //             errors?[name]
    //                 .message
    //         : ''
    // }

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                data-cy="event-title"
                                label="Título do evento"
                                name="title"
                                autoFocus
                                error={errors.title !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item alignItems="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                            <TextField
                                data-cy="event-description"
                                label="Descrição"
                                name="description"
                                error={errors.description !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>

                    {/* TODO: Arrumar exibição da data e das horas */}
                    <Grid container item alignItems="center">
                        <Grid item xs={1}>
                            <ClockIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                type="date"
                                label="Data"
                                data-cy="event-day"
                                name="date"
                                error={errors.date !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <TextField
                                type="time"
                                label="Hora inicial"
                                data-cy="event-startTime"
                                name="startTime"
                                error={errors.startTime !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <TextField
                                type="time"
                                label="Hora Final"
                                data-cy="event-endTime"
                                name="endTime"
                                error={errors.endTime !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* TODO: Pegar departamentos e projetos dispónivies para esse usuario */}
                    <Grid container item alignItems="center">
                        <Grid item xs={1}>
                            <GroupsIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Departamento"
                                data-cy="event-department"
                                name="department"
                                error={errors.department !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({})}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <TextField
                                label="Projeto"
                                data-cy="event-project"
                                name="project"
                                error={errors.project !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({})}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item alignItems="center">
                        <Grid item xs={1}>
                            <ScheduleIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                select
                                label="Selecione uma Agenda"
                                data-cy="event-schedule"
                                SelectProps={{
                                    native: true,
                                    inputProps: {
                                        ref: register,
                                        name: 'scheduleId',
                                    },
                                }}
                                error={errors.scheduleId !== undefined}
                                // helperText={()=>handleHelperText()}
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                            >
                                {schedules.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <SubmitButton
                            dataCy="submit-permission-button"
                            text="Cadastrar"
                            disabled={!formState.isDirty}
                            mt={20}
                            hg={40}
                            mw={200}
                            mwt={250}
                        />
                    </Grid>
                </Grid>
            </form>
        </Modal>
    );
};

export default memo(NewTaskModal);
