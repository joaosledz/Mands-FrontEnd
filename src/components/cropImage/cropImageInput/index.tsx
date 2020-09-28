import React, {
    useState,
    useMemo,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Camera as CameraIcon } from '@styled-icons/icomoon';

import CropImageComponent from '../cropImageModal';

import useStyles from './styles';

type Props = {
    title?: string;
    image: File | undefined;
    setImage: Dispatch<SetStateAction<File | undefined>>;
    styles?: string;
};

const CropImageInput: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { title, image, setImage, styles } = props;

    const [imagePreview, setImagePreview] = useState<string>('');

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files![0]);
        setShowCropModal(true);
    };

    const handleImageReturn = (blob: File, image_url: string) => {
        setImage(blob);
        setImagePreview(image_url);
    };

    const [showCropModal, setShowCropModal] = useState(false);

    const CropImageModal = useMemo(() => {
        return (
            <CropImageComponent
                src={image}
                handleImage={handleImageReturn}
                isOpen={showCropModal}
                setIsOpen={setShowCropModal}
            />
        );
        // eslint-disable-next-line
    }, [showCropModal]);

    return (
        <Box
            mt={3}
            className={
                styles
                    ? [classes.avatarContainer, styles].join(' ')
                    : classes.avatarContainer
            }
        >
            {title && (
                <Typography
                    component="label"
                    htmlFor="avatar-input"
                    style={{ color: '#505050' }}
                >
                    {title}
                </Typography>
            )}
            <Typography
                component="label"
                htmlFor="avatar-input"
                className={
                    !imagePreview
                        ? classes.avatarInputLabel
                        : `${classes.avatarInputLabel} active`
                }
                style={{
                    backgroundImage: `url(${imagePreview})`,
                }}
            >
                <CameraIcon size="25" />
                <Box id="avatar-blur" className={classes.avatarBlur} />
                <input
                    id="avatar-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{
                        display: 'none',
                    }}
                    onChange={handleChangeImage}
                />
            </Typography>
            {CropImageModal}
        </Box>
    );
};

export default CropImageInput;
