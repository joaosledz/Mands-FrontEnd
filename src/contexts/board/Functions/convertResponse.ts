import { TypeBoard, TypeNewBoard } from '../../../models/boardTypes';

export const ConvertResponse = (newState: TypeNewBoard) => {
    // console.log(newState);
    //Armazena o parâmetro sem tipagem para facilitar a adequação e remoção de parâmetros
    let newStateAux = newState;
    //Estado auxiliar no qual seram armazenados os novos dados do quadro já no formato padrão da biblioteca
    let auxState: TypeBoard;
    auxState = {
        items: {},
        columns: {},
        columnsOrder: [],
    };
    //Mapeamento do array do novo estado
    newStateAux.map(session => {
        var sessionAux: any = session;
        sessionAux.itemsIds = [];
        //Mapeamento das tasks(items) desta sessão(coluna) do novo estado
        if (session.tasks) {
            // console.log(session.tasks);
            session.tasks.map(task => {
                // console.log('ENTROU');
                let taskAux: any = Object.assign({}, task);
                taskAux.taskId = 'task_' + taskAux.taskId.toString();
                // console.log(taskAux);
                auxState.items = {
                    ...auxState.items,
                    [taskAux.taskId]: { ...taskAux },
                };
                sessionAux.itemsIds.push(taskAux.taskId);
                // console.log(auxState);
                return true;
            });
        }
        // console.log(auxState);
        //Após as tasks serem adicionadas aos items são removidas do objeto sessions pois não ficam ai nesse novo formato
        sessionAux.sessionId = sessionAux.sessionId.toString();
        // delete sessionAux.tasks;
        //Colunas
        auxState.columns = {
            ...auxState.columns,
            [session.sessionId]: { ...sessionAux },
        };
        //Ordem Colunas
        auxState.columnsOrder.push(sessionAux.sessionId);
        return true;
    });
    // console.log(auxState);
    return auxState;
};
