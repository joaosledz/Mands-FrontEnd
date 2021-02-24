import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import { projectApi } from '../../services';
import {
    // initialBoardData3 as BoardData,
    newBoardData,
} from '../../utils/data/board';
// import { v4 as uuidv4 } from 'uuid';
import { connectHub, HubConnection } from '../../services/socket';
import useAuth from '../../hooks/useAuth';
import { ConvertResponse } from './Functions/convertResponse';
import snackbarUtils from '../../utils/functions/snackbarUtils';
import TypeParams from '../../models/params';
import {
    TypeBoard,
    TypeColumn,
    TypeItem,
    TaskSocket,
    // TypeNewBoard,
} from '../../models/boardTypes';

interface BoardContextData {
    state: TypeBoard;
    setState: Dispatch<SetStateAction<TypeBoard>>;
    AddTask: (columnID: keyof TypeColumn, task: TaskSocket) => void;
    UpdateTask: (itemID: keyof TypeItem, updatedItem: TypeItem) => void;
    DeleteTask: (itemID: keyof TypeItem, columnID: keyof TypeColumn) => void;
    AddColumn: (columnID: string, position: number) => void;
    DeleteColumn: (columnID: keyof TypeColumn) => void;
    setColumnTitle: (title: string, columnID: keyof TypeColumn) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);
//Funções de Task

// import { Container } from './styles';
export const BoardProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<TypeBoard>(
        ConvertResponse(newBoardData)
    );
    const { user } = useAuth();
    const params = useParams<TypeParams>();

    const [hubConnection, setHubConnection] = useState<
        HubConnection | undefined
    >(undefined);

    //Funções de Coluna
    const AddColumn = (columnId: string, position: number) => {
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [columnId]: {
                    sessionId: columnId,
                    position: position,
                    title: 'Título da nova coluna',
                    itemsIds: [],
                },
            },
            columnsOrder: [...state.columnsOrder, columnId],
        };

        setState(newState);
    };

    const DeleteColumn = (columnID: keyof TypeColumn) => {
        const newState = {
            ...state,
        };
        //Apagar todos os itens pertencentes a coluna excluída
        (newState.columns[columnID].itemsIds as Array<any>).map(
            (itemID: 1 | 2) => {
                delete newState.items[itemID];
                return itemID;
            }
        );
        //Apaga a coluna propriamente dita
        delete newState.columns[columnID];
        // Retira do array de ordem das colunas o ID da coluna apagada
        newState.columnsOrder = newState.columnsOrder.filter(
            e => e !== columnID
        );

        setState(newState);
    };

    const setColumnTitle = (title: string, columnID: keyof TypeColumn) => {
        const newState = { ...state };
        newState.columns[columnID].title = title;

        setState(newState);
    };

    //Funções de Task
    const DeleteTask = (itemID: keyof TypeItem, columnID: keyof TypeColumn) => {
        // console.log(itemID);
        // console.log(columnID);
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        delete newState.items[itemID];
        newState.columns[columnID].itemsIds = newState.columns[
            columnID
        ].itemsIds.filter((item: string) => item !== itemID);
        setState(newState);
    };
    const AddTask = (columnID: keyof TypeColumn, task: TaskSocket) => {
        // console.log(task);
        const newID = 'task_' + task.taskId.toString();
        // const newID = Math.floor(Math.random() * 100001).toString();
        // console.log(state);
        const newState = {
            ...state,
        };
        // console.log(newState);
        //Adicionar Item à lista de itens
        newState.items = {
            ...state.items,
            [newID]: {
                taskId: newID,
                title: task.title,
            },
        };
        // console.log(newState.items);
        //Adicionar ID do item à coluna correspondente
        // console.log(columnID);
        newState.columns[columnID].itemsIds = [
            ...newState.columns[columnID].itemsIds,
            newID,
        ];
        // console.log('newState');
        setState(newState);
    };
    const UpdateTask = (itemID: keyof TypeItem, updatedItem: TypeItem) => {
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items[itemID] = updatedItem;

        setState(newState);
    };
    useEffect(() => {
        console.log(state);
    }, [state]);

    useEffect(() => {
        const handleHubConnection = async () => {
            try {
                if (user) {
                    const hubResponse = await connectHub(user.userId);
                    setHubConnection(hubResponse);
                }
            } catch (error) {
                console.log(error);
            }

            return () => {
                hubConnection?.stop();
            };
        };
        handleHubConnection();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        const handleWebSocket = async () => {
            if (hubConnection) {
                try {
                    console.log(params.project);
                    hubConnection.invoke('JoinGroup', params.project!);
                    //Canais de /Task
                    hubConnection.on('TaskSent', response => {
                        console.log(response);
                        // AddTask(task.sessionId, task.tasks[0]);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('TaskUpdated', response => {
                        console.log(response);
                    });
                    hubConnection.on('TaskDeleted', response => {
                        // console.log(response);
                        // DeleteTask(
                        //     'task_' + response.taskId,
                        //     response.sourceSessionId
                        // );
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('TaskUpdatePosition', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('ResponsibleAssociated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SessionChanged', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });

                    // Canais de /Subtask
                    hubConnection.on('SubtaskCreated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SubtaskUpdated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SubtaskDeleted', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    //Canais de /Session
                    hubConnection.on('SessionCreated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SessionUpdated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SessionDeleted', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                    hubConnection.on('SessionPosUpdated', response => {
                        console.log(response);
                        setState(ConvertResponse(response));
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleWebSocket();
        // console.log(params);
        // eslint-disable-next-line
    }, [hubConnection]);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await projectApi.getBoardData(
                    parseInt(params.project!)
                );
                console.log(response.data);
                setState(ConvertResponse(response.data));
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };
        getBoardData();
        // console.log('object');
        // eslint-disable-next-line
    }, []);

    return (
        <BoardContext.Provider
            value={{
                state,
                setState,
                AddTask,
                UpdateTask,
                DeleteTask,
                AddColumn,
                DeleteColumn,
                setColumnTitle,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContext;
