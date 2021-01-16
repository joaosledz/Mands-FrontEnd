const baseUrl = 'Authentications';

const authUrls = {
    login: `login`,
    me: '/me',
    register: `${baseUrl}/register`,
    update: 'User/Update',
    confirmAccount: 'account/confirm',
    changePassword: 'passReset',
    verifyUsername: `/${baseUrl}/VerifyUsername`,
};

export default authUrls;
