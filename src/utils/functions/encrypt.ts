import md5 from 'md5';

const encrypt = (text: string) => {
    return md5(text);
};

export default encrypt;
