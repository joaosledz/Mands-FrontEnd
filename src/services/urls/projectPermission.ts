const baseUrl = 'projPermissions';

const projectUrls = {
    create: `${baseUrl}/create`,
    edit: `${baseUrl}/create`,
    delete: `${baseUrl}/create`,
    list: `${baseUrl}/listByProject`,
    getUserPerm: `${baseUrl}/listByUser`,
    changeUserPerm: `${baseUrl}/EditUserPerm`,
};

export default projectUrls;
