import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useStyles from './styles';
import { v4 as uuidv4 } from 'uuid';
import FabButton from '../../../../components/fabButton';

// Import data for board
import { initialBoardData } from '../../data/board-initial-data';

// Import BoardColumn component
import { BoardColumn } from '../column/board-column';

const Board: React.FC = () => {
    const classes = useStyles();
    // Initialize board state with board data
    const [state, setState] = useState(initialBoardData);

    // Handle drag & drop
    const onDragEnd = (result: any) => {
        const { source, destination, draggableId, type } = result;
       
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

        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnsOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...state,
                columnsOrder: newColumnOrder,
            };
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
                    [newColumnStart.id]: newColumnStart,
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
                    [newColumnStart.id]: newColumnStart,
                    [newColumnFinish.id]: newColumnFinish,
                },
            };

            // Update the board state with new data
            setState(newState);
        }
    };

    const AddColumn = () => {
        const newID = uuidv4();
       
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newID]: {
                    id: newID,
                    title: 'Nova Coluna',
                    itemsIds: [],
                },
            },
            columnsOrder: [...state.columnsOrder, newID],
        };
     
        setState(newState);
    };
    // type newState = {
    //     items:{
    //      [key: string]:{
    //         id: string,
    //         title: string,
    //         tag: string,
    //         tagColor: string,
    //         members: string[],
    //     },
    // }
    //         columns: {
    //             [key: string]:{
    //                 id: string,
    //                 title: string,
    //                 itemsIds: string[],
    //             },
    //         }
    //         columnsOrder: string[],
    // };

    const AddTask = (columnID: 'column-1', title: string) => {
        //Gerando um ID aleatório
        const newID = uuidv4();
        
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items = {
            ...state.items,
            [newID]: {
                id: newID,
                title: title,
                tag: 'Financeiro',
                tagColor: 'green',
                members: ['Raiane Souza', 'Josefa Oliveira'],
                tasks: [],
            },
        };
        //Adicionar ID do item à coluna correspondente
        newState.columns[columnID].itemsIds = [
            ...newState.columns[columnID].itemsIds,
            newID,
        ];
       
        setState(newState);
    };

    const UpdateTask = (itemID: 'item-1' | 'item-2', updatedItem: any) => {
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items[itemID] = updatedItem;
      
        setState(newState);
    };
    const DeleteTask = (
        itemID: 'item-1' | 'item-2',
        columnID: 'column-1' | 'column-2'
    ) => {
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        delete newState.items[itemID];
        newState.columns[columnID].itemsIds = newState.columns[
            columnID
        ].itemsIds.filter(e => e !== itemID);
        
        setState(newState);
    };

    const DeleteColumn = (
        columnID: 'column-1' | 'column-2'
    ) => {
        const newState = {
            ...state,
        };
        
        //Apagar todos os itens pertencentes a coluna excluída
        (newState.columns[columnID].itemsIds as Array<any>).map((itemID: 'item-1' | 'item-2',) => {
           
            delete newState.items[itemID];
            return itemID
            })
        //Apaga a coluna propriamente dita
        delete newState.columns[columnID]
        // Retira do array de ordem das colunas o ID da coluna apagada
        newState.columnsOrder = newState.columnsOrder.filter(e => e !== columnID);
        
        setState(newState);
    };

    const setTitle = (
        title: string,
        columnID: 'column-1' | 'column-2' | 'column-3'
    ) => {
        
        const newState = { ...state };
        newState.columns[columnID].title = title;

        setState(newState);
    };
    // const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);

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
                                    <BoardColumn
                                        key={column.id}
                                        column={column}
                                        items={items}
                                        index={index}
                                        setTitle={setTitle}
                                        AddTask={AddTask}
                                        UpdateTask={UpdateTask}
                                        DeleteTask={DeleteTask}
                                        DeleteColumn={DeleteColumn}
                                    />
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <FabButton
                    icon="plus"
                    style={classes.fabButton}
                    onClick={AddColumn}
                />
        </>
    );
};
export default Board;
