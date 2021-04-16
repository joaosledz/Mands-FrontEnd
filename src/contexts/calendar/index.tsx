import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import { projectApi } from '../../services';
import { newBoardData } from '../../utils/data/board';
// import useAuth from '../../hooks/useAuth';
import { ConvertResponse } from './Functions/generateData';
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
    // permissions: TypeProjectPermModel;
    // setPermissions: Dispatch<SetStateAction<TypeProjectPermModel>>;
    loading: boolean;
    AddTask: (columnID: keyof TypeColumn, task: TaskSocket) => void;
    UpdateTask: (itemID: keyof TypeItem, updatedItem: TypeItem) => void;
    DeleteTask: (itemID: keyof TypeItem, columnID: keyof TypeColumn) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);
//Funções de Task

// import { Container } from './styles';
export const BoardProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<TypeBoard>(
        ConvertResponse(newBoardData)
    );
    const [loading, setLoading] = useState<boolean>(true);
    // const [permissions, setPermissions] = useState<TypeProjectPermModel>({
    //     name: 'Nome da permissão',
    //     editProject: false,
    // });
    // const { user } = useAuth();
    const params = useParams<TypeParams>();

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
    const AddTask = (columnID: keyof TypeColumn, task: TaskSocket) => {
        const newID = 'task_' + task.taskId.toString();
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items = {
            ...state.items,
            [newID]: {
                taskId: newID,
                title: task.title,
            },
        };
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
        const getBoardData = async () => {
            try {
                const response = await projectApi.getBoardData(
                    parseInt(params.project!)
                );
                console.log(response.data);
                setState(ConvertResponse(response.data));
                setLoading(false);
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
                loading,
                AddTask,
                UpdateTask,
                DeleteTask,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContext;
