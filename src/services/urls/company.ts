const baseURL = 'companies';

const companyUrls = {
    base: `${baseURL}`,
    userCompanies: `${baseURL}/findByUser`,
    showAllCompanyData: `${baseURL}/getAll/`,
    findAllEmployees: `${baseURL}/findAllEmployees/`,
    verifyUsername: `${baseURL}/VerifyUsername/`,
    associate: `${baseURL}/associateUser/`,
};

export default companyUrls;
