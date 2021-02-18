const baseUrl = 'Authentications';

const authUrls = {
    login: `login`,
    me: '/me',
    register: `${baseUrl}/register`,
    thirdPartyRegister: `${baseUrl}/ThirdPartyRegister`,
    update: 'User/Update',
    confirmAccount: 'account/confirm',
    resendConfirmEmail: 'account/sendConfirmationEmail',
    changePassword: 'passReset',
    verifyUsername: `/${baseUrl}/VerifyUsername`,
};

export default authUrls;
