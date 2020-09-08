import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import useStyles from './styles';

/**
 * Abre um modal que permite recortar uma imagem .
 * @param {object} src Blob da imagem.
 * @param {object} handleImage Função que gerencia o armazenamento da imagem.
 * @param {boolean} isOpen Boolean que indica a visibilidade do modal.
 * @param {object} setIsOpen Função que fecha o modal.
 **/
export default function CropImageModal(props) {
    const { src, isOpen, setIsOpen, handleImage } = props;
    const classes = useStyles();
    const pixelRatio = 4;

    const [upImg, setUpImg] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        aspect: 1 / 1,
    });
    const [completedCrop, setCompletedCrop] = useState(null);

    useEffect(() => {
        function createImageURL() {
            if (src) setUpImg(URL.createObjectURL(src));
        }
        createImageURL();
    }, [src]);

    const getResizedCanvas = () => {
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = Math.ceil(crop.width * scaleX);
        tmpCanvas.height = Math.ceil(crop.height * scaleY);

        const ctx = tmpCanvas.getContext('2d');
        const image = imgRef.current;
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return tmpCanvas;
    };

    const onLoad = useCallback(img => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;
        if (canvas.width && canvas.height) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }
    }, [completedCrop]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleReturnImage = (previewCanvas, crop) => {
        if (!crop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

        canvas.toBlob(
            blob => {
                blob.name = src?.name;
                const previewUrl = URL.createObjectURL(blob);
                handleImage(blob, previewUrl);
                setIsOpen(false);
            },
            'image/png',
            1
        );
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '5%' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper className={classes.paper}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={c => setCrop(c)}
                    onComplete={c => setCompletedCrop(c)}
                />
                <Box style={{ display: 'none' }}>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            width: completedCrop?.width ?? 0,
                            height: completedCrop?.height ?? 0,
                        }}
                    />
                </Box>
                <Box>
                    <Button
                        data-cy={'crop-image-button'}
                        variant="contained"
                        color="primary"
                        disabled={
                            !completedCrop?.width || !completedCrop?.height
                        }
                        className={classes.cropButton}
                        onClick={() =>
                            handleReturnImage(
                                previewCanvasRef.current,
                                completedCrop
                            )
                        }
                    >
                        Recortar Imagem
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
}
