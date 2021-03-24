const baseUrl = 'depPermission';

const departmentPermissionUrls = {
    list: `${baseUrl}/listByDepartment/`,
    create: `${baseUrl}/create/`,
    changeUserPermission: `${baseUrl}/editUserPerm/`,
    getUserPermissions: `${baseUrl}/listByUser/`,
};

export default departmentPermissionUrls;
