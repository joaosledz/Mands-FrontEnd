const baseUrl = 'departments';

const departmentUrls = {
    show: `${baseUrl}/`,
    listByCompany: `${baseUrl}/findByCompany/`,
    listEmployees: `${baseUrl}/listAssociatedUsers/`,
    create: `${baseUrl}`,
};

export default departmentUrls;
