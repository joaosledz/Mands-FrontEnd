import { updateModel } from '../../../../../../services';

export const validLink = (data: updateModel) => {
    let dataAux = data;
    if (
        dataAux.gitHub.substring(0, 8) !== 'https://' &&
        dataAux.gitHub.length > 0
    )
        dataAux.gitHub = 'https://' + dataAux.gitHub;
    if (
        dataAux.linkedin.substring(0, 8) !== 'https://' &&
        dataAux.linkedin.length > 0
    )
        dataAux.linkedin = 'https://' + dataAux.linkedin;
    return dataAux;
};
