import { useContext } from 'react';
import ProjectContext from '../contexts/project/project';

const useProject = () => {
    const context = useContext(ProjectContext);
    return context;
};

export default useProject;
