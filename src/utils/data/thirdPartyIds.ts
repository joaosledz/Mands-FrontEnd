type TypeIds = {
    client_id: string;
    client_secret?: string;
};

interface ThirdPartyIds {
    github: TypeIds;
    google: TypeIds;
    facebook: TypeIds;
}

const thirdPartyIds: ThirdPartyIds = {
    github: {
        client_id: '16319b8c9137874f787f',
        client_secret: 'dd857ad6823404aefa06921364e14f9b2e6c9481',
    },
    google: {
        client_id:
            '845723374128-pjov5coumjkfcsqdnoe80fsvkpuab8j3.apps.googleusercontent.com',
    },
    facebook: {
        client_id: '3947509128634052',
    },
};

export default thirdPartyIds;
