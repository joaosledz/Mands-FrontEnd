import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import {
    TypeBoard,
    TypeColumn,
    TypeItem,
    TypeNewBoard,
} from '../../models/boardTypes';
import { projectApi } from '../../services';
import {
    // initialBoardData3 as BoardData,
    newBoardData,
} from '../../utils/data/board';
// import { v4 as uuidv4 } from 'uuid';
import { connectHub } from '../../services/socket';
import useAuth from '../../hooks/useAuth';
import { ConvertResponse } from './Functions/convertResponse';
import snackbarUtils from '../../utils/functions/snackbarUtils';
import { useParams } from 'react-router-dom';

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

interface TypeParams {
    company: string;
    department: string;
    project: string;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);
//Funções de Task

// import { Container } from './styles';
export const BoardProvider: React.FC = ({ children }) => {
    const [state, setState] = useState(ConvertResponse(newBoardData));
    const { user } = useAuth();
    const params = useParams<TypeParams>();
    useEffect(() => {
        if (user) connectHub(user.userId);
        console.log(params);
    }, [user]);

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
    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await projectApi.getBoardData(
                    parseInt(params.project)
                );
                console.log(response.data);
                setState(ConvertResponse(response.data));
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };
        getBoardData();
        console.log('object');
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
