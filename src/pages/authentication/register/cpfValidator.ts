//Código modificado
//Retirado do código fonte do site da receita federal
const CpfValidator = (strCPF: string) => {
    var Soma, Resto, i;
    let CPF = strCPF.replace(/\D/g, '');

    Soma = 0;
    //Eliminação de CPFs falsos conhecidos
    // if (strCPF == '00000000000') return false;
    // eslint-disable-next-line
    switch (CPF) {
        case '11111111111':
            return false;
        case '22222222222':
            return false;
        case '33333333333':
            return false;
        case '44444444444':
            return false;
        case '55555555555':
            return false;
        case '66666666666':
            return false;
        case '77777777777':
            return false;
        case '88888888888':
            return false;
        case '99999999999':
            return false;
        case '00000000000':
            return false;
    }
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(CPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(CPF.substring(10, 11))) return false;
    return true;
};

export default CpfValidator;
