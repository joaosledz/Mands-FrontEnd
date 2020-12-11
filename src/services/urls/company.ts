const baseURL = 'companies';

const companyUrls = {
    base: `${baseURL}`,
    userCompanies: `${baseURL}/findByUser`,
    showAllCompanyData: `${baseURL}/getAll/`,
    findAllEmployees: `${baseURL}/findAllEmployees/`,
    create: `${baseURL}`,
    verifyUsername: `${baseURL}/VerifyUsername/`,
};

export default companyUrls;
