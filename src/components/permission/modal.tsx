import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    memo,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    Paper,
    Modal,
    Grid,
    Typography,
    Avatar,
    Tooltip,
} from '@material-ui/core';
import SubmitButton from '../mainButton';
import useStyles from './styles';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid';
import { TypeEmployee } from '../../models/department';
import ChooseRole from './components/role/radio';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    employee: TypeEmployee;
};

const HiringModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, employee } = props;
    const history = useHistory();

    useEffect(() => {}, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const handleSubmit = () => {
        let body = {
            roleValue,
        };
        console.log(body);
        handleCloseModal();
    };

    const [roleValue, setRoleValue] = React.useState('funcionario');
    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleValue((event.target as HTMLInputElement).value);
    };

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleCloseModal}
            // style={{ paddingTop: '5%', minHeight: '400px' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={4}
                >
                    <CloseIcon
                        className={classes.iconClose}
                        onClick={handleCloseModal}
                    />

                    <Grid
                        item
                        xs={12}
                        className={classes.title}
                        component={Typography}
                    >
                        Permissões de {employee.name}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        className={classes.title}
                        component={Typography}
                    >
                        <Avatar
                            variant="rounded"
                            src={employee.image}
                            className={classes.largeAvatar}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: 'left' }}>
                        <ChooseRole
                            roleValue={roleValue}
                            handleChangeRole={handleChangeRole}
                        />
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        className={classes.submitButton}
                    >
                        <SubmitButton
                            text="Salvar"
                            // disabled={!itemChanged}
                            onClick={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </>
        </Modal>
    );
};

export default memo(HiringModal);
