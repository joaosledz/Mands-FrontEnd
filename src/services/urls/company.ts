const baseURL = 'companies';

const companyUrls = {
    base: `${baseURL}`,
    userCompanies: `${baseURL}/findByUser`,
    showAllCompanyData: `${baseURL}/getAll/`,
    findAllEmployees: `${baseURL}/findAllEmployees/`,
    verifyUsername: `${baseURL}/VerifyUsername/`,
    associate: `${baseURL}/associateUsers/`,
    acceptInvite: `${baseURL}/associate`,
    quitCompany: `${baseURL}/quit/`,
};

export default companyUrls;
