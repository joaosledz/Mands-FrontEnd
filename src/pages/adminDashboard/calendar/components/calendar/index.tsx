import React, { useContext, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TypeCalendarData } from '../../models';
import useStyles from './styles';
// import FabButton from '../../../../../components/fabButton';
import BoardContext from '../../../../../contexts/calendar';
// import authContext from '../../../../../contexts/auth';
import Day from '../Day';
import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';
import { useParams } from 'react-router-dom';
import TypeParams from '../../../../../models/params';
import { SubmitChangeSession, taskApi } from '../../../../../services';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import Backdrop from '../../../../../components/backdrop';
// import { Link } from 'react-router-dom';
type CalendarProps = {
    state: TypeCalendarData;
};
const Board: React.FC<CalendarProps> = props => {
    const { state } = props;
    const classes = useStyles();
    // Initialize board state with board data
    const { /*setState,*/ loading } = useContext(BoardContext);
    // const { user } = useContext(authContext);
    const { company } = useCompany();
    const params = useParams<TypeParams>();
    const { getDepartmentData, department /*, userPermDep*/ } = useDepartment();
    // const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
    //Id do Projeto
    const projectId = parseInt(params.project!);

    //Dados do departamento do projeto
    useEffect(() => {
        const handleDepartment = async () => {
            if (!department)
                await getDepartmentData(params.company, params.department!);

            // setDepartmentId(department.departmentId)
        };
        handleDepartment();
        // eslint-disable-next-line
    }, [department]);
    // Handle drag & drop
    //Get de Permissões
    const ChangeSessionSocket = (itemId: string, sessionId: string) => {
        if (company && department) {
            let data: SubmitChangeSession = {
                companyId: company.companyId,
                departmentId: department.departmentId,
                projectId,
            };
            taskApi
                .changeSession(
                    parseInt(itemId.replace('task_', '')),
                    sessionId,
                    data
                )
                .then(response => {
                    // snackbarUtils.success('Tarefa deletada com sucesso');
                })
                .catch(error => {
                    snackbarUtils.error('Erro ao tentar mover tarefa');
                });
        } else
            snackbarUtils.error(
                'Dados incompletos de departamento e(ou) empresa'
            );
    };

    // const MoveTaskSocket = (
    //     newState: TypeCalendarData,
    //     oldState: TypeCalendarData,
    //     droppableId: string
    // ) => {
    //     let data: updateTaskPositionType = [];
    //     newState.days[droppableId].eventsIds.map(
    //         (taskId: string, index: number) => {
    //             data.push({
    //                 taskId: parseInt(taskId.replace('task_', '')),
    //                 position: index,
    //             });
    //             return data;
    //         }
    //     );
    //     taskApi
    //         .updatePosition(droppableId, projectId, data)
    //         .then(response => {
    //             snackbarUtils.success('Posição alterada com sucesso');
    //             // AddColumn();
    //         })
    //         .catch(error => {
    //             setState(oldState);
    //             snackbarUtils.error('Erro ao tentar adicionar uma coluna');
    //         });
    // };

    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        // Do nothing if item is dropped outside the list
        if (!destination) {
            return;
        }
        // Do nothing if the item is dropped into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        // Find column from which the item was dragged from
        const columnStart = (state.days as any)[source.droppableId];

        // Find column in which the item was dropped
        const columnFinish = (state.days as any)[destination.droppableId];

        // Moving events in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const neweventsIds = Array.from(columnStart.eventsIds);
            // Remove the id of dragged item from its original position
            neweventsIds.splice(source.index, 1);
            // Insert the id of dragged item to the new position
            neweventsIds.splice(destination.index, 0, draggableId);
            // Create new, updated, object with data for days
            // const newColumnStart = {
            //     ...columnStart,
            //     eventsIds: neweventsIds,
            // };
            // Create new board state with updated data for days
            // const newState = {
            //     ...state,
            //     days: {
            //         ...state.days,
            //         [newColumnStart.sessionId]: newColumnStart,
            //     },
            // };
            // Update the board state with new data
            // setState(newState);
            // MoveTaskSocket(newState, state, destination.droppableId);
        } else {
            // Moving events from one list to another
            // Get all item ids in source list
            const newStarteventsIds = Array.from(columnStart.eventsIds);

            // Remove the id of dragged item from its original position
            newStarteventsIds.splice(source.index, 1);

            // Create new, updated, object with data for source column
            // const newColumnStart = {
            //     ...columnStart,
            //     eventsIds: newStarteventsIds,
            // };
            // Get all item ids in destination list
            const newFinisheventsIds = Array.from(columnFinish.eventsIds);

            // Insert the id of dragged item to the new position in destination list
            newFinisheventsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination column
            // const newColumnFinish = {
            //     ...columnFinish,
            //     eventsIds: newFinisheventsIds,
            // };
            // Create new board state with updated data for both, source and destination days
            // const newState = {
            //     ...state,
            //     days: {
            //         ...state.days,
            //         [newColumnStart.sessionId]: newColumnStart,
            //         [newColumnFinish.sessionId]: newColumnFinish,
            //     },
            // };
            // Update the board state with new data
            // setState(newState);
            ChangeSessionSocket(draggableId, destination.droppableId);
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Backdrop loading={loading} />
            ) : (
                <Fragment>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId="all-days"
                            direction="horizontal"
                            type="column"
                            key="all-days"
                        >
                            {provided => (
                                <div
                                    className={classes.boardElements}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {/* Get all days in the order specified in 'board-initial-data.ts' */}
                                    {state.allDaysIds.map((dayId, index) => {
                                        // Get id of the current column
                                        const day = state.days[dayId];

                                        // Get items belonging to the current column
                                        const events = day.eventsIds.map(
                                            (eventId: string) =>
                                                state.events[eventId]
                                        );

                                        // Render the BoardColumn component
                                        return (
                                            <React.Fragment key={day.dayId}>
                                                <Day
                                                    key={day.dayId}
                                                    column={day}
                                                    events={events}
                                                    index={index}
                                                />
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* {permissions.session && (
                        <FabButton
                            icon="plus"
                            title="Nova Coluna"
                            style={classes.fabButton}
                            // onClick={AddSessionSocket}
                            onClick={() => setShowCreateSessionModal(true)}
                        />
                    )} */}
                </Fragment>
            )}
        </Fragment>
    );
};
export default Board;
