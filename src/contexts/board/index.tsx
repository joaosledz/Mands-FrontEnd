import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import {
    TypeBoard,
    TypeNewBoard,
    TypeColumn,
    TypeItem,
} from '../../models/boardTypes';
import {
    initialBoardData /*as BoardData*/,
    initialBoardData3 as BoardData,
    newBoardData,
} from '../../utils/data/board';
import { v4 as uuidv4 } from 'uuid';
import { connectHub } from '../../services/socket';
import useAuth from '../../hooks/useAuth';

interface BoardContextData {
    state: TypeBoard;
    setState: Dispatch<SetStateAction<TypeBoard>>;
    AddTask: (columnID: keyof TypeColumn, title: string) => void;
    UpdateTask: (itemID: keyof TypeItem, updatedItem: TypeItem) => void;
    DeleteTask: (itemID: keyof TypeItem, columnID: keyof TypeColumn) => void;
    AddColumn: () => void;
    DeleteColumn: (columnID: keyof TypeColumn) => void;
    setColumnTitle: (title: string, columnID: keyof TypeColumn) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);
//Funções de Task

// import { Container } from './styles';
export const BoardProvider: React.FC = ({ children }) => {
    const [state, setState] = useState(BoardData);
    const { user } = useAuth();

    useEffect(() => {
        if (user) connectHub(user.userId);
        // ConvertResponse(newBoardData);
    }, [user]);
    // const ConvertResponse = (newState: TypeNewBoard) => {
    //     console.log(newState);
    //     let newStateAux = newState;
    //     let auxState: TypeBoard;
    //     auxState = {
    //         items: {},
    //         columns: {},
    //         columnsOrder: [],
    //     };
    //     newStateAux.map(session => {
    //         let sessionAux: any = session;
    //         //Items
    //         if (session.tasks) {
    //             session.tasks.map(task => {
    //                 auxState.items = {
    //                     ...auxState.items,
    //                     [task.taskId]: { ...task },
    //                 };
    //             });
    //         }
    //         delete sessionAux.tasks;
    //         //Colunas
    //         auxState.columns = {
    //             ...auxState.columns,
    //             [session.sessionId]: { ...sessionAux },
    //         };
    //         //Ordem Colunas
    //         auxState.columnsOrder.push(session.sessionId);
    //         console.log(auxState);
    //         return true;
    //     });
    // };
    //Funções de Coluna
    const AddColumn = () => {
        const newID = Math.floor(Math.random() * 100001).toString();
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
    const AddTask = (columnID: keyof TypeColumn, title: string) => {
        //Gerando um ID aleatório
        // const newID = uuidv4();
        const newID = Math.floor(Math.random() * 100001);

        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items = {
            ...state.items,
            [newID]: {
                id: newID,
                title: title,
                // tag: 'Financeiro',
                // tagColor: 'green',
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
    const UpdateTask = (itemID: keyof TypeItem, updatedItem: TypeItem) => {
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items[itemID] = updatedItem;

        setState(newState);
    };

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
