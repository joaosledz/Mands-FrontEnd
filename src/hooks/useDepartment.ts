import { useContext } from 'react';
import DepartmentContext from '../contexts/department/department';

const useDepartment = () => {
    const context = useContext(DepartmentContext);
    return context;
};

export default useDepartment;
