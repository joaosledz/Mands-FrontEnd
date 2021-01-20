import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { MailSend as MailSendIcon } from '@styled-icons/boxicons-regular';

import { TypeMember } from '../../services';
import SubmitButton from '../mainButton';
import Autocomplete from './autocomplete';
import ChooseRole from './role';
import useStyles from './styles';

type TypeAssignData = {
    title: string;
};

interface IAssignTypes {
    company: TypeAssignData;
    department: TypeAssignData;
    project: TypeAssignData;
}

const types: IAssignTypes = {
    company: {
        title: 'Convide alguém para a empresa',
    },
    department: {
        title: 'Associe alguém para este departamento',
    },
    project: {
        title: 'Associe alguém para este projeto',
    },
};

type TypeModal = 'company' | 'department' | 'project';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    type: TypeModal;
    selectedValues?: TypeMember[];
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const { isOpen, setIsOpen, type = 'company', selectedValues = [] } = props;

    const [data, setData] = useState<TypeAssignData>({} as TypeAssignData);
    const [value, setValue] = useState<TypeMember[]>([]);
    const [roleValue, setRoleValue] = useState('funcionario');

    useEffect(() => {
        const handleData = (type: TypeModal, types: IAssignTypes) =>
            setData(types[type]);
        handleData(type, types);
    }, [type]);

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleDeletePerson = useCallback(
        (index: number) => {
            let auxArray = [...value];
            //Adicionar Item à lista de itens
            auxArray.splice(index, 1);
            setValue(auxArray);
        },
        [value]
    );

    const handleChangeRole = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRoleValue((event.target as HTMLInputElement).value);
        },
        []
    );

    const handleSubmit = () => {
        let body = {
            value,
            roleValue,
        };
        console.log(body);
        handleCloseModal();
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
                        {data.title}
                    </Grid>

                    <Autocomplete
                        value={value}
                        setValue={setValue}
                        selectedValues={selectedValues}
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
                                            key={person.userId}
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
