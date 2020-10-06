import React, { useState, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Camera as CameraIcon } from '@styled-icons/icomoon';

import IconSelectionModal from '../modal';

import useStyles from './styles';

type Props = {
    image?: string;
    setImage?: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabled?: boolean;
    styles?: string;
};

const IconSelectionInput: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { image, setImage, disabled, styles } = props;

    const [imagePreview, setImagePreview] = useState<string | undefined>(image);

    const [showModal, setShowModal] = useState(false);

    const IconModal = useMemo(() => {
        return (
            <IconSelectionModal
                isOpen={showModal}
                setIsOpen={setShowModal}
                setImage={setImage}
                setImagePreview={setImagePreview}
            />
        );
    }, [showModal, setImage]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <Box
            className={
                styles
                    ? [classes.avatarContainer, styles].join(' ')
                    : classes.avatarContainer
            }
        >
            <Typography
                component={Button}
                disabled={disabled}
                onClick={handleOpenModal}
                className={
                    !imagePreview
                        ? classes.avatarButton
                        : `${classes.avatarButton} active`
                }
                style={{
                    backgroundImage: `url(${imagePreview})`,
                }}
            >
                <CameraIcon size="25" />
                <Box id="avatar-blur" className={classes.avatarBlur} />
            </Typography>
            {IconModal}
        </Box>
    );
};

export default IconSelectionInput;
