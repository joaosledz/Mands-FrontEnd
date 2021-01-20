const baseUrl = 'departments';

const departmentUrls = {
    base: `${baseUrl}/`,
    listByCompany: `${baseUrl}/findByCompany/`,
    listEmployees: `${baseUrl}/listAssociatedUsers/`,
    create: `${baseUrl}/`,
    verifyUsername: `Departments/VerifyUsername/`,
    associate: `${baseUrl}/associateUsers/`,
};

export default departmentUrls;
