import { authApi } from '../../../../../services';

export const validateUsername = async (username: string) => {
    let valid = true;
    try {
        await authApi.verifyUsername(username);
        valid = true;
        console.log('Deu bom');
    } catch (error) {
        valid = false;
        console.log('Não deu bom');
    }
    console.log(valid);
    return valid;
};
