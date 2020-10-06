import React, { useState, Dispatch, SetStateAction } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import IconsData from '../../../../../../utils/data/icons';

import useStyles from './styles';

type TypeIcon = {
    id: number;
    path: string;
};

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setImage?: Dispatch<SetStateAction<string | undefined>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const IconSelection: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, setImage, setImagePreview } = props;

    const [icons] = useState<Array<TypeIcon>>(IconsData);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSelectIcon = (icon: string) => {
        setImage!(icon);
        setImagePreview(icon);
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
                    spacing={3}
                    className={classes.iconsGridContainer}
                >
                    {icons.map(icon => (
                        <Grid
                            key={icon.id}
                            item
                            xs={4}
                            component={Button}
                            onClick={() => handleSelectIcon(icon.path)}
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
