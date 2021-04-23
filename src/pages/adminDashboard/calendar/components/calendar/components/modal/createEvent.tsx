import React, { Dispatch, SetStateAction, memo, useContext } from 'react';
import { useForm } from 'react-hook-form';
import calendarContext from '../../../../context';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import SubmitButton from '../mainButton';
import snackbarUtils from '../../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { Text as TextIcon } from '@styled-icons/entypo';
// import { Clock as ClockIcon } from '@styled-icons/fa-regular';
// import { Groups as GroupsIcon } from '@styled-icons/material';
import { TypeEvent } from '../../../../models';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const { onEventCreate } = useContext(calendarContext);
    const { register, errors, handleSubmit, formState } = useForm<TypeEvent>(
        {}
    );

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const onSubmit = async (event: TypeEvent) => {
        let newEvent: TypeEvent = { ...event, eventId: 'item-x' };
        console.log(newEvent);
        try {
            onEventCreate(newEvent, '13/4/2021');
            handleCloseModal();
            snackbarUtils.success('Evento criado com sucesso');
        } catch (err) {
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
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        component={Paper}
                        className={classes.paper}
                        spacing={1}
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
                        {/* Event Title */}
                        <Grid container item>
                            <Grid item xs={1}>
                                <TextIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    variant="outlined"
                                    data-cy="event-title"
                                    name="title"
                                    label="Título do evento"
                                    error={errors.title !== undefined}
                                    helperText={
                                        errors.title
                                            ? '⚠' + errors?.title?.message
                                            : ''
                                    }
                                    className={classes.textFieldGrid}
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                    })}
                                />
                            </Grid>
                        </Grid>
                        {/* <TextField
                                type="date"
                                label="Data inicial"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.project.initialDate}
                                onChange={e =>
                                    handlechange('initialDate', e.target.value)
                                }
                                error={errors?. ? true : false}
                                helperText={errors?.initialDate}
                            /> */}
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
            </>
        </Modal>
    );
};

export default memo(NewTaskModal);
