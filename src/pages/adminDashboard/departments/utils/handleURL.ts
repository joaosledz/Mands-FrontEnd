const handleURL = (pathname: string, current: string, to: string) => {
    const baseURL = pathname.split(current);
    const url = `${baseURL[0]}${to}`;
    return url;
};

export default handleURL;