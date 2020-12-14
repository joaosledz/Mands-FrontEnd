import { Dispatch, SetStateAction } from 'react';
import { authApi } from '../../../../../services';

export const validateUsername = async (
    username: string,
    setValidUser: Dispatch<SetStateAction<Boolean>>
) => {
    let valid = true;
    try {
        await authApi.verifyUsername(username);
        setValidUser(true);
        valid = true;
        console.log('Deu bom');
    } catch (error) {
        setValidUser(false);
        valid = false;
        console.log('Não deu bom');
    }
    console.log(valid);
    return valid;
};
