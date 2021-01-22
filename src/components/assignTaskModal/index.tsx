import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
    useCallback,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import { TypeMember } from '../../services';
import arraysEquals from '../../utils/functions/arraysEquals';

import SearchButtonTF from './searchButtonTF/searchButtonTF';
import SubmitButton from '../mainButton';
import useStyles from './styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    allEmployees: Array<TypeMember>;
    teamData: Array<TypeMember>;
};

const AssignTeamModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, allEmployees = [], teamData = [] } = props;

    const [employees, setEmployees] = useState(allEmployees);
    const [team, setTeam] = useState(teamData);
    const [teamIDsState, setTeamIDsState] = useState<Array<number>>([]);
    const [teamIDs, setTeamIDs] = useState<Array<number>>([]);
    const [isDisabled, setIsDisabled] = useState(true);

    // useEffect(() => {
    //     console.log('teamIDs: ', teamIDs);
    //     console.log('All: ', allEmployees);
    //     console.log('team:', teamData);
    //     console.log('---------------');
    //     // eslint-disable-next-line
    // }, [teamIDs]);

    useEffect(() => {
        setTeam(teamData);
    }, [teamData]);

    useEffect(() => {
        const fillCheckersArray = () => {
            const auxIDsArray: Array<number> = [];
            employees.map(employee => {
                if (team.length !== 0) {
                    if (team.some(e => e.userId === employee.userId)) {
                        auxIDsArray.push(employee.userId);
                        return null;
                    } else return null;
                } else return null;
            });
            fillIDsState(auxIDsArray);
            setTeamIDs(auxIDsArray);
        };
        fillCheckersArray();
        // eslint-disable-next-line
    }, [team]);

    useEffect(() => {
        const handleButtonDisable = () => {
            if (arraysEquals(teamIDs, teamIDsState)) setIsDisabled(true);
            else setIsDisabled(false);
            // console.log('teamIDs: ', teamIDs);
            // console.log('teamIDs: ', teamIDsState);
        };
        handleButtonDisable();
    }, [teamIDs, teamIDsState]);

    const fillIDsState = useCallback(
        (data: Array<number>) => {
            if (teamIDsState.length !== 0) return;
            else setTeamIDsState(data);
        },
        [teamIDsState.length]
    );

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleClearCheckers = useCallback(() => {
        setTeamIDs([]);
    }, []);

    const handleStoreID = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                const auxArray = [...teamIDs];
                auxArray.push(Number(event.target.value));
                setTeamIDs(auxArray);
            } else {
                const auxArray = [...teamIDs];
                const idIndex = auxArray.indexOf(Number(event.target.value));
                auxArray.splice(idIndex, 1);
                setTeamIDs(auxArray);
            }
        },
        [teamIDs]
    );

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            Atribua pessoas para esse departamento:
                        </Typography>
                    </Grid>
                    <IconButton
                        onClick={handleCloseModal}
                        className={classes.closeModalButton}
                    >
                        <TimesIcon size={20} />
                    </IconButton>
                    <SearchButtonTF
                        employees={employees}
                        setEmployees={setEmployees}
                    />
                    <Grid
                        container
                        item
                        xs={12}
                        spacing={3}
                        component={Paper}
                        className={classes.employeesContainer}
                    >
                        <Grid
                            container
                            item
                            xs={3}
                            component={Button}
                            onClick={handleClearCheckers}
                            className={classes.clearAssigns}
                        >
                            <TimesIcon size={20} />
                            <Typography>Limpar Associados</Typography>
                        </Grid>
                        <Grid id="employees" container item xs={12} spacing={3}>
                            {employees.length !== 0 ? (
                                employees.map((employee, index) => (
                                    <Grid
                                        key={index}
                                        container
                                        item
                                        alignItems="center"
                                        xs={12}
                                        spacing={1}
                                        component="label"
                                        htmlFor={`checkbox-${index}`}
                                    >
                                        <Grid item xs={1}>
                                            <Checkbox
                                                id={`checkbox-${index}`}
                                                color="primary"
                                                value={employee.userId}
                                                checked={employees.some(
                                                    employee =>
                                                        teamIDs.includes(
                                                            employee.userId
                                                        )
                                                )}
                                                onChange={handleStoreID}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Avatar src={employee.image} />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={5}
                                            component={Typography}
                                        >
                                            {employee.name} {employee.surname}
                                        </Grid>
                                        {/* <Grid
                                            item
                                            xs={5}
                                            component={Typography}
                                        >
                                            {employee.role_name}
                                        </Grid> */}
                                    </Grid>
                                ))
                            ) : (
                                <Typography id="empty-text">
                                    Não foi possivel encontrar nenhuma pessoa
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" xs={12}>
                        <SubmitButton
                            text="Salvar"
                            disabled={isDisabled}
                            mt={30}
                            hg={40}
                            mw={180}
                            mwt={200}
                        />
                    </Grid>
                </Grid>
            </Slide>
        </Modal>
    );
};

export default memo(AssignTeamModal);
