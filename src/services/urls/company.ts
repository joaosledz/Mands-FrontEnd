const baseURL = 'companies';

const companyUrls = {
    base: `${baseURL}`,
    userCompanies: `${baseURL}/findByUser`,
    showAllCompanyData: `${baseURL}/getAll/`,
    findAllEmployees: `${baseURL}/findAllEmployees/`,
    verifyUsername: `${baseURL}/VerifyUsername/`,
};

export default companyUrls;
