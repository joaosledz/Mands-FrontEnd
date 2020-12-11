export type PostImageType = {
    path: string;
    imageName: string;
    imageData: string;
};
export type ImageType = {
    imageId: number;
    path: string;
    extension: string;
    name: string;
    size: string;
};
export type ImageErrorType = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
};
