const tasksUrl = 'Tasks';

const tasksUrls = {
    //Tasks
    create: `${tasksUrl}/Create/`,
    update: `${tasksUrl}/Update/`,
    delete: `${tasksUrl}/Delete/`,
    associateResponsible: `${tasksUrl}/AssociateResponsible/`,
    deleteResponsible: `${tasksUrl}/DeleteResponsible/`,
    //Deslocamento
    changeSession: `${tasksUrl}/ChangeSession/`,
    updatePosition: `${tasksUrl}/UpdatePosition/`,
    //Dependencia entre tasks
    createDependency: `${tasksUrl}/CreateDependency/`,
    deleteDependency: `${tasksUrl}/DeleteDependency/`,
    //Subtasks
    createSubtask: `${tasksUrl}/CreateSubtask/`,
    updateSubtask: `${tasksUrl}/UpdateSubtask/`,
    deleteSubtask: `${tasksUrl}/DeleteSubtask/`,
    updatePositionSubtask: `${tasksUrl}/UpdatePositionSubTask/`,
};

export default tasksUrls;
