import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';
import MutableInput from '../multableInput/multableInput';
import { Text as TextIcon } from '@styled-icons/entypo';
import { AddUser as AddUserIcon } from '@styled-icons/entypo';
import { InputChecked as CheckedIcon } from '@styled-icons/typicons';
import { Groups as TeamIcon } from '@styled-icons/material';
import CheckBoxList from './components/CheckBoxList';
import AssignTeamModal from '../../../adminDashboard/departments/components/assignTeamModal/assignTeamModal'
import employeesData from '../../../../utils/data/employees';
import Avatar from '@material-ui/core/Avatar';

type Props = {
    isOpen: boolean;
    UpdateTask: any;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    item: {
        id: string;
        title: string;
        description: string;
        tag: string;
        tagColor: string;
        members: string[];
        tasks: any;
    };
};

const NewTaskModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, item, UpdateTask } = props;
    const [title, setTitle] = useState<string>(item.title);
    const [description, setDescription] = useState<string>(item.description);
  
    const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
    const [teamData, setTeamData] = useState(employeesData);
    const handleAssignTeamModal= () =>{
        setShowTeamModal(true)
    }
    useEffect(() => {
        
    }, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleSubmit = () => {
        let UpdatedItem = {
            id: item.id,
            title: title,
            tag: 'Financeiro',
            tagColor: 'green',
            members: ['Raiane Souza', 'Josefa Oliveira'],
            tasks: [],
        };
        UpdateTask(item.id, UpdatedItem);
        handleCloseModal();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '5%', minHeight: '400px' }}
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
                <Grid item xs={12}>
                    <MutableInput
                        value={title}
                        valueSet={setTitle}
                        id={item.id}
                    />
                </Grid>
                <Grid container xs={12} className={classes.body}>
                {/* DESCRIÇÃO DO ITEM */}
                <Grid container item xs={12}>
                    <Grid xs={1}>
                        <TextIcon className={classes.icon}/>
                    </Grid>
                    <Grid xs={11}>
                        <Typography className={classes.subtitle}>
                            Descrição
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MutableInput
                        value={description}
                        valueSet={setDescription}
                        id={item.id}
                    />
                </Grid>
                {/* LISTA DE TAREFAS */}
                <Grid container item xs={12}>
                    <Grid xs={1}>
                        <CheckedIcon className={classes.icon}/>
                    </Grid>
                    <Grid xs={11}>
                        <Typography className={classes.subtitle}>
                            Tarefas
                        </Typography>
                    </Grid>
                </Grid>
                <CheckBoxList tasks={item.tasks}/>
                {/* LISTA DE RESPONSÁVEIS PELO ITEM */}
                <Grid container item xs={12}>
                    <Grid xs={1}>
                        <TeamIcon className={classes.icon}/>
                    </Grid>
                    <Grid xs={11}>
                        <Typography className={classes.subtitle}>
                            Responsáveis
                        </Typography>
                    </Grid>
                    <Grid xs={12} container spacing={1}>
            {teamData.map((employee, index) => (
                            <Grid
                                key={index}
                                container
                                item
                                alignItems="center"
                                justify="flex-start"
                                component="label"
                                htmlFor={`checkbox-${index}`}
                                xs={4}
                            >
                                <Grid item xs={1} >
                                    <Avatar src={employee.image} className={classes.smallAvatar} />
                                </Grid>
                                <Grid item xs={11} component={Typography} className={classes.teamText} >
                                    {employee.name}
                                </Grid>
                                
                            </Grid>
                        ))}
                        <Grid xs={4}> 
                            <AddUserIcon className={classes.icon} onClick={handleAssignTeamModal}/>
                        </Grid>
            </Grid>
                </Grid>

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
           
            <AssignTeamModal
                    isOpen={showTeamModal}
                    setIsOpen={setShowTeamModal}
                />
                </>
        </Modal>
    );
};

export default memo(NewTaskModal);
