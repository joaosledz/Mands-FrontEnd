import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useContext,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';
import MutableInput from '../multableInput/multableInput';
import { Text as TextIcon } from '@styled-icons/entypo';
import { InputChecked as CheckedIcon } from '@styled-icons/typicons';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import CheckBoxList from './components/CheckBoxList/CheckBoxList';
import Team from './components/Chips/Chips';
import BoardContext from '../../../../contexts/board';
import employeesData from '../../../../utils/data/employees';
import { TypeItem } from '../../../../models/boardTypes';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    item: TypeItem;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, item } = props;
    const [title, setTitle] = useState<string>(item.title);
    const [description, setDescription] = useState<string>(item.description);
    const { UpdateTask } = useContext(BoardContext);

    const [teamData, setTeamData] = useState(employeesData);

    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleSubmit = () => {
        let UpdatedItem = {
            id: item.taskId,
            title: title,
            tag: 'Financeiro',
            tagColor: 'green',
            members: ['Raiane Souza', 'Josefa Oliveira'],
            tasks: [],
        };
        UpdateTask(item.taskId, UpdatedItem);
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
            <>
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
                    <Grid item xs={12}>
                        <MutableInput
                            value={title}
                            valueSet={setTitle}
                            id={item.taskId}
                        />
                    </Grid>
                    {/* DESCRIÇÃO DO ITEM */}
                    <Grid container>
                        <Grid item xs={1}>
                            <TextIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography className={classes.subtitle}>
                                Descrição
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MutableInput
                            value={description}
                            valueSet={setDescription}
                            id={item.taskId}
                        />
                    </Grid>
                    {/* LISTA DE TAREFAS */}
                    <Grid container className={classes.body}>
                        <Grid container item xs={12}>
                            <Grid item xs={1}>
                                <CheckedIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography className={classes.subtitle}>
                                    Tarefas
                                </Typography>
                            </Grid>
                        </Grid>
                        {item.subtasks && (
                            <CheckBoxList subtasks={item.subtasks} />
                        )}
                        {/* LISTA DE RESPONSÁVEIS PELO ITEM */}

                        <Team teamData={teamData} setTeamData={setTeamData} />
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        className={classes.submitButton}
                    >
                        <SubmitButton
                            text="Salvar alterações"
                            // disabled={!itemChanged}
                            onClick={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </>
        </Modal>
    );
};

export default memo(NewTaskModal);
