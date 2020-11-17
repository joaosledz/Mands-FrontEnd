import { TypeDepartment } from '../services';

const useDepartment = () => {
    const departmentDataAux = sessionStorage.getItem('@Mands:department');
    if (departmentDataAux) {
        const departmentData: TypeDepartment = JSON.parse(departmentDataAux);
        return departmentData;
    } else return null;
};

export default useDepartment;
