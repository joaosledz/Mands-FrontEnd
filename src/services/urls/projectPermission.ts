const baseUrl = 'projPermissions';

const projectUrls = {
    create: `${baseUrl}/create`,
    edit: `${baseUrl}/create`,
    delete: `${baseUrl}/create`,
    list: `${baseUrl}/listByProject`,
    getUserPerm: `${baseUrl}/listByUser`,
    changeUserPerm: `companyPerm/EditUserPerm`,
};

export default projectUrls;
