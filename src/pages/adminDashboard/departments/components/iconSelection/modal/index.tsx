import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import { imageApi, TypeIcon } from '../../../../../../services';

import useStyles from './styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setImage?: Dispatch<SetStateAction<TypeIcon | undefined>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const IconSelection: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, setImage, setImagePreview } = props;

    const [icons, setIcons] = useState<Array<TypeIcon>>([]);

    useEffect(() => {
        const getIcons = async () => {
            try {
                const { data } = await imageApi.listIcons();
                setIcons(data);
            } catch (err) {
                console.log(err);
            }
        };
        getIcons();
    }, []);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSelectIcon = (icon: TypeIcon) => {
        setImage!(icon);
        setImagePreview(icon.path);
        handleCloseModal();
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
                <Typography variant="h1" id="iconModal-title">
                    Selecione um ícone:
                </Typography>
                <Grid
                    container
                    className={classes.iconsGridContainer}
                    justify="center"
                >
                    {icons.map(icon => (
                        <Grid
                            key={icon.imageId}
                            item
                            xs={3}
                            component={Button}
                            onClick={() => handleSelectIcon(icon)}
                            className={classes.iconGridItem}
                        >
                            <img src={icon.path} alt="ícone" />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Modal>
    );
};

export default IconSelection;
