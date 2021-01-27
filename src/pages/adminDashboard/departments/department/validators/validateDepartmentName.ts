import { departmentApi } from '../../../../../services';

export const validateDeparmentName = async (
    companyId: number,
    name: string
) => {
    let valid = true;
    try {
        await departmentApi.verifyName(companyId, name);
        valid = true;
    } catch (error) {
        valid = false;
    }
    console.log(valid);
    return valid;
};
