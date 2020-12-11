const baseUrl = 'departments';

const departmentUrls = {
    base: `${baseUrl}/`,
    listByCompany: `${baseUrl}/findByCompany/`,
    listEmployees: `${baseUrl}/listAssociatedUsers/`,
    create: `${baseUrl}/`,
    verifyUsername: `Departments/VerifyUsername/`,
};

export default departmentUrls;
