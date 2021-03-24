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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';
// import MutableInput from '../multableInput/multableInput';
import { Text as TextIcon } from '@styled-icons/entypo';
import { InputChecked as CheckedIcon } from '@styled-icons/typicons';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import CheckBoxList from './components/CheckBoxList/CheckBoxList';
import Team from './components/Responsibles';
import BoardContext from '../../../../contexts/board';
import employeesData from '../../../../utils/data/employees';
import { TypeItem } from '../../../../models/boardTypes';
import {
    taskApi,
    SubmitTaskType,
    CreateSubtaskType,
} from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    item: TypeItem;
    departmentId: number;
    projectId: number;
    companyId: number;
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const {
        isOpen,
        setIsOpen,
        item,
        projectId,
        departmentId,
        companyId,
    } = props;
    // const [title, setTitle] = useState<string>(item.title);
    // const [description, setDescription] = useState<string>(item.description);
    const { /*UpdateTask,*/ state, setTaskFields } = useContext(BoardContext);

    const [teamData, setTeamData] = useState(employeesData);
    const [newSubtask, setNewSubtask] = useState<string>('');
    const [showCreateSubtask, setShowCreateSubtask] = useState(false);
    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    //Necessário remodelar
    const updateTaskAPI = () => {
        let data: SubmitTaskType = {
            departmentId,
            projectId,
            title: state.items[item.taskId].title,
            description: state.items[item.taskId].description,
            // [fieldName]: fieldContent,
        };
        taskApi
            .update(companyId, item.taskId.replace('task_', ''), data)
            .then(response => {
                // console.log(response);
                snackbarUtils.success('Tarefa editada com sucesso');
            })
            .catch(error => {
                // snackbarUtils.error('Erro ao tentar deletar tarefa');
            });
    };
    const createSubtaskAPI = () => {
        console.log(newSubtask);
        let data: CreateSubtaskType = {
            subtasks: [
                {
                    description: newSubtask,
                },
            ],
            departmentId,
            projectId,
        };
        taskApi
            .createSubtask(companyId, item.taskId.replace('task_', ''), data)
            .then(response => {
                setShowCreateSubtask(false);
                snackbarUtils.success('Tarefa criada com sucesso');
                setNewSubtask('');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar criar tarefa');
            });
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
                    spacing={3}
                >
                    {/* {JSON.stringify(state.items[item.taskId].description)} */}
                    <CloseIcon
                        className={classes.iconClose}
                        onClick={handleCloseModal}
                    />
                    <Grid item xs={12}>
                        {/* <MutableInput*/}
                        <TextField
                            value={state.items[item.taskId].title}
                            // onChange={e => setTitle(e.target.value)}
                            onChange={e =>
                                setTaskFields(
                                    e.target.value,
                                    item.taskId,
                                    'title'
                                )
                            }
                            onBlur={() => updateTaskAPI()}
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
                        <TextField
                            value={state.items[item.taskId].description}
                            onChange={e =>
                                setTaskFields(
                                    e.target.value,
                                    item.taskId,
                                    'description'
                                )
                            }
                            onBlur={() => updateTaskAPI()}
                        />
                    </Grid>
                    {/* LISTA DE TAREFAS */}
                    {/* <Grid container item className={classes.body}> */}
                    <Grid container>
                        <Grid item xs={1}>
                            <CheckedIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography className={classes.subtitle}>
                                Tarefas
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={3}
                            onClick={() => setShowCreateSubtask(true)}
                            className={classes.button}
                        >
                            <Grid item xs={9}>
                                <Typography className={classes.subtitle}>
                                    Nova tarefa
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <AddIcon className={classes.icon} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        {item.subtasks ? (
                            <CheckBoxList
                                subtasks={item.subtasks}
                                departmentId={departmentId}
                                projectId={projectId}
                                companyId={companyId}
                                taskId={item.taskId}
                            />
                        ) : (
                            <Grid
                                xs={12}
                                item
                                component={Typography}
                                className={classes.notFoundText}
                            >
                                Ainda não há tarefas
                            </Grid>
                        )}
                    </Grid>
                    {showCreateSubtask && (
                        <Grid
                            container
                            item
                            xs={12}
                            style={{ paddingTop: '0px' }}
                        >
                            <TextField
                                value={newSubtask}
                                onChange={e => setNewSubtask(e.target.value)}
                            />
                            <Button onClick={() => createSubtaskAPI()}>
                                Adicionar
                            </Button>
                            <CloseIcon
                                className={classes.iconCancel}
                                onClick={() => setShowCreateSubtask(false)}
                            />
                        </Grid>
                    )}
                    {/* LISTA DE RESPONSÁVEIS PELO ITEM */}

                    <Team
                        teamData={teamData}
                        setTeamData={setTeamData}
                        taskId={item.taskId}
                    />
                    {/* </Grid> */}
                    {/* <Grid
                        container
                        justify="center"
                        className={classes.submitButton}
                    >
                        <SubmitButton
                            text="Salvar alterações"
                            // disabled={!itemChanged}
                            onClick={handleSubmit}
                        />
                    </Grid> */}
                </Grid>
            </>
        </Modal>
    );
};

export default memo(NewTaskModal);
