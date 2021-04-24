import React, { Dispatch, SetStateAction, memo } from 'react';

import SubmitButton from '../mainButton';
import useStyles from './styles';
import { useForm } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { Text as TextIcon } from '@styled-icons/entypo';
import { Clock as ClockIcon } from '@styled-icons/fa-regular';
import { Groups as GroupsIcon } from '@styled-icons/material';
import { DateRange as ScheduleIcon } from '@styled-icons/material';

import { TypeSchedule } from '../../../../models';

type Props = {
    onSubmit: (data: TypeFormEvent) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    schedules: Array<TypeSchedule>;
    defaultValues?: TypeFormEvent;
};

type TypeFormEvent = {
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

const FormEvent: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { onSubmit, schedules, defaultValues } = props;

    const { register, errors, handleSubmit, formState } = useForm<
        TypeFormEvent
    >({ defaultValues: defaultValues || {} });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} style={{ paddingTop: '10px' }}>
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
                            helperText={errors?.title?.message || ''}
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
                            helperText={errors?.description?.message || ''}
                            inputRef={register({
                                required: 'Esse campo é obrigatório',
                            })}
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>

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
                            helperText={errors?.date?.message || ''}
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
                            helperText={errors?.startTime?.message || ''}
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
                            helperText={errors?.endTime?.message || ''}
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
                            helperText={errors?.department?.message || ''}
                            inputRef={register({})}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: 10 }}>
                        <TextField
                            label="Projeto"
                            data-cy="event-project"
                            name="project"
                            error={errors.project !== undefined}
                            helperText={errors?.project?.message || ''}
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
                            helperText={errors?.scheduleId?.message || ''}
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
    );
};

export default memo(FormEvent);
