const tasksUrl = 'Tasks';

const tasksUrls = {
    //Tasks
    create: `${tasksUrl}/Create/`,
    update: `${tasksUrl}/Update/`,
    delete: `${tasksUrl}/Delete/`,
    associateResponsible: `${tasksUrl}/AssociateResponsible/`,
    //Deslocamento
    changeSession: `${tasksUrl}/ChangeSession/`,
    //Dependencia entre tasks
    createDependency: `${tasksUrl}/CreateDependency/`,
    deleteDependency: `${tasksUrl}/DeleteDependency/`,
    //Subtasks
    createSubtask: `${tasksUrl}/CreateSubtask/`,
    updateSubtask: `${tasksUrl}/UpdateSubtask/`,
    deleteSubtask: `${tasksUrl}/DeleteSubtask/`,
};

export default tasksUrls;
