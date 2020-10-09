const handleUrlParamName = (param: string): string => {
    const urlParam = param.replace(/\s/g, '').toLowerCase();
    return urlParam;
};

export default handleUrlParamName;
