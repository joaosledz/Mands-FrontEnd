import React, { useContext, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useStyles from './styles';
import FabButton from '../../../../components/fabButton';
import BoardContext from '../../../../contexts/board';
import { BoardColumn } from '../column/board-column';
import useCompany from '../../../../hooks/useCompany';
import { useParams } from 'react-router-dom';
import TypeParams from '../../../../models/params';
import useDepartment from '../../../../hooks/useDepartment';
import {
    SubmitChangeSession,
    taskApi,
    sessionApi,
    sessionType,
    updateSessionPositionType,
} from '../../../../services';
import { TypeBoard } from '../../../../models/boardTypes';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

const Board: React.FC = () => {
    const classes = useStyles();
    // Initialize board state with board data
    const { state, setState, AddColumn } = useContext(BoardContext);
    const { company } = useCompany();
    const params = useParams<TypeParams>();
    const { getDepartmentData, department } = useDepartment();
    //Id do Projeto
    const projectId = parseInt(params.project!);
    //Dados do departamento do projeto
    // const [departmentId, setDepartmentId] = useState(1)
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
                    console.log(response);
                    // snackbarUtils.success('Tarefa deletada com sucesso');
                })
                .catch(error => {
                    snackbarUtils.error('Erro ao tentar deletar tarefa');
                });
        } else console.log('Dados incompletos de departamento e(ou) empresa');
    };

    const AddSessionSocket = () => {
        if (company && department) {
            let data: sessionType = {
                title: 'Título da nova coluna',
                description: '',
                companyId: company.companyId,
                departmentId: department.departmentId,
            };
            sessionApi
                .create(projectId, data)
                .then(response => {
                    console.log(response);
                    snackbarUtils.success('Session criada com sucesso');
                    AddColumn();
                })
                .catch(error => {
                    snackbarUtils.error('Erro ao tentar adicionar uma coluna');
                });
        } else console.log('Dados incompletos de departamento e(ou) empresa');
    };
    const MoveColumnSocket = (newState: TypeBoard, oldState: TypeBoard) => {
        // console.log(newState);
        console.log(newState.columns);
        let data: updateSessionPositionType = [];
        newState.columnsOrder.map((columnId, index) => {
            // Get id of the current column
            const column = (state.columns as any)[columnId];
            data.push({ sessionId: column.sessionId, position: index });
        });
        console.log(data);
        sessionApi
            .updatePosition(projectId, data)
            .then(response => {
                console.log(response);
                snackbarUtils.success('Posição alterada com sucesso');
                // AddColumn();
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar adicionar uma coluna');
            });
    };

    const onDragEnd = (result: any) => {
        const { source, destination, draggableId, type } = result;
        console.log(state);
        console.log(destination);
        console.log(draggableId);
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
        //Reposicionando uma coluna
        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnsOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...state,
                columnsOrder: newColumnOrder,
            };
            MoveColumnSocket(newState, state);
            setState(newState);
            return;
        }

        // Find column from which the item was dragged from
        const columnStart = (state.columns as any)[source.droppableId];

        // Find column in which the item was dropped
        const columnFinish = (state.columns as any)[destination.droppableId];

        // Moving items in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const newItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newItemsIds.splice(source.index, 1);

            // Insert the id of dragged item to the new position
            newItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for columns
            const newColumnStart = {
                ...columnStart,
                itemsIds: newItemsIds,
            };

            // Create new board state with updated data for columns
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumnStart.sessionId]: newColumnStart,
                },
            };
            // Update the board state with new data
            setState(newState);
        } else {
            // Moving items from one list to another
            // Get all item ids in source list
            const newStartItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newStartItemsIds.splice(source.index, 1);

            // Create new, updated, object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds,
            };
            // Get all item ids in destination list
            const newFinishItemsIds = Array.from(columnFinish.itemsIds);

            // Insert the id of dragged item to the new position in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds,
            };
            // Create new board state with updated data for both, source and destination columns
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumnStart.sessionId]: newColumnStart,
                    [newColumnFinish.sessionId]: newColumnFinish,
                },
            };
            // Update the board state with new data
            setState(newState);
            ChangeSessionSocket(draggableId, destination.droppableId);
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {provided => (
                        <div
                            className={classes.boardElements}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Get all columns in the order specified in 'board-initial-data.ts' */}
                            {state.columnsOrder.map((columnId, index) => {
                                // Get id of the current column
                                const column = (state.columns as any)[columnId];

                                // Get item belonging to the current column
                                const items = column.itemsIds.map(
                                    (itemId: string) =>
                                        (state.items as any)[itemId]
                                );

                                // Render the BoardColumn component
                                return (
                                    <>
                                        {department && params && company && (
                                            <BoardColumn
                                                key={column.sessionId}
                                                column={column}
                                                items={items}
                                                index={index}
                                                departmentId={
                                                    department.departmentId
                                                }
                                                projectId={parseInt(
                                                    params.project!
                                                )}
                                                companyId={company.companyId}
                                            />
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <FabButton
                icon="plus"
                style={classes.fabButton}
                onClick={AddSessionSocket}
            />
        </>
    );
};
export default Board;
