const baseUrl = 'departments';

const departmentUrls = {
    base: `${baseUrl}/`,
    listByCompany: `${baseUrl}/findByCompany/`,
    listEmployees: `${baseUrl}/listAssociatedUsers/`,
    create: `${baseUrl}/`,
    verifyUsername: `${baseUrl}/verifyUsername/`,
    associate: `${baseUrl}/associateUsers/`,
};

export default departmentUrls;
