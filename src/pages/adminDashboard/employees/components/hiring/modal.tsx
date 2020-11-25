import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    Paper,
    Modal,
    Grid,
    Typography,
    Avatar,
    Tooltip,
    Grow,
    Slide,
} from '@material-ui/core';
import SubmitButton from '../../../../../components/mainButton';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { MailSend as MailSendIcon } from '@styled-icons/boxicons-regular';
import employeesData from '../../../../../utils/data/employees';
import { TypeTeam } from '../../../../../models/department';
import Autocomplete from '../autocomplete';
import ChooseRole from '../role/radio';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen } = props;
    const [teamData /*, setTeamData*/] = useState<Array<TypeTeam>>(
        employeesData
    );
    const [value, setValue] = React.useState<Array<TypeTeam>>([]);
    const history = useHistory();

    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleSubmit = () => {
        let body = {
            value,
            roleValue,
        };
        console.log(body);
        handleCloseModal();
    };
    const handleDeletePerson = (index: number) => {
        let auxArray = [...value];
        //Adicionar Item à lista de itens
        auxArray.splice(index, 1);
        setValue(auxArray);
    };
    const [roleValue, setRoleValue] = React.useState('funcionario');
    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleValue((event.target as HTMLInputElement).value);
    };

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleCloseModal}
            // style={{ paddingTop: '5%', minHeight: '400px' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={4}
                >
                    <CloseIcon
                        className={classes.iconClose}
                        onClick={handleCloseModal}
                    />
                    <MailSendIcon className={classes.iconMain} />
                    <Grid
                        item
                        xs={12}
                        className={classes.title}
                        component={Typography}
                    >
                        Convide alguém para a empresa
                    </Grid>

                    <Autocomplete
                        data={teamData}
                        value={value}
                        setValue={setValue}
                    />
                    {value.length !== 0 && (
                        <Grow in={value.length !== 0} timeout={600}>
                            <div
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                <Grid
                                    container
                                    className={classes.scrollPerson}
                                    spacing={3}
                                >
                                    {/* {console.log(value.length)} */}
                                    {value.map((person, index) => (
                                        <Grid
                                            container
                                            item
                                            className={classes.personContainer}
                                        >
                                            <Grid item xs={2}>
                                                <Avatar src={person.image} />
                                            </Grid>
                                            <Grid
                                                container
                                                item
                                                xs={9}
                                                direction="column"
                                                justify="flex-start"
                                            >
                                                <Grid item xs={12}>
                                                    <Typography
                                                        className={
                                                            classes.subtitle
                                                        }
                                                    >
                                                        {person.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Tooltip
                                                        title="visitar perfil"
                                                        placement="bottom-start"
                                                    >
                                                        <Typography
                                                            className={
                                                                classes.subtitle2
                                                            }
                                                            onClick={() =>
                                                                history.push(
                                                                    '/perfil'
                                                                )
                                                            }
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
                                                <CloseIcon
                                                    className={classes.icon}
                                                    onClick={() =>
                                                        handleDeletePerson(
                                                            index
                                                        )
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ textAlign: 'left' }}
                                >
                                    <ChooseRole
                                        roleValue={roleValue}
                                        handleChangeRole={handleChangeRole}
                                    />
                                </Grid>
                                <Grid
                                    container
                                    justify="center"
                                    className={classes.submitButton}
                                >
                                    <SubmitButton
                                        text="Enviar convite"
                                        // disabled={!itemChanged}
                                        onClick={handleSubmit}
                                    />
                                </Grid>
                            </div>
                        </Grow>
                    )}
                </Grid>
            </Slide>
        </Modal>
    );
};

export default memo(HiringModal);
