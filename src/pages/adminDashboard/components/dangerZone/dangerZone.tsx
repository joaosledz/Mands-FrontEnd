import React, { useState, Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

type TypeDescription = 'company' | 'department' | 'project';

type Props = {
    type: TypeDescription;
    modalIsOpen: boolean;
    handleModal: Dispatch<SetStateAction<boolean>>;
    style?: string;
};

const handleDescription = (type: TypeDescription) => {
    const description = [
        {
            name: 'empresa',
            description: 'esta empresa',
        },
        {
            name: 'departamento',
            description: 'este departamento',
        },
        {
            name: 'projeto',
            description: 'este projeto',
        },
    ];

    switch (type) {
        case 'company':
            return description[0];
        case 'department':
            return description[1];
        case 'project':
            return description[2];
        default:
            return description[0];
    }
};

const DangerZone: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { type, modalIsOpen, handleModal, style } = props;

    const [description] = useState(handleDescription(type));

    return (
        <Grid
            container
            direction="column"
            justify="flex-end"
            className={[classes.container, style].join(' ')}
        >
            <Grid container component={Typography} variant="h2">
                Área Perigosa
            </Grid>
            <Grid id="danger-zone-container" container>
                <Grid container component={Typography} variant="h3">
                    Deletar {description.name}
                </Grid>
                <Grid container component={Typography}>
                    Uma vez deletado {description.description}, não tem volta.
                    Por favor, tenha certeza.
                </Grid>
                <Grid
                    data-cy="delete-modal-button"
                    container
                    item
                    xs={12}
                    md={6}
                    component={Button}
                    variant="outlined"
                    onClick={() => handleModal(!modalIsOpen)}
                >
                    Deletar {description.description}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DangerZone;
