import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TypeMember } from '../../../../../../../../services';

type Props = {
    open: boolean;
    user: TypeMember;
    handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleRemove: () => Promise<void>;
};

const DeleteDialog: React.FC<Props> = (props: Props) => {
    const { open, user, handleOpen, handleRemove } = props;

    return (
        <Dialog
            open={open}
            onClose={handleOpen}
            aria-labelledby="dialogo-de-confirmação-de-exclusão"
            aria-describedby="confirme-a-exclusão-desse-usuário-do-departamento"
        >
            <DialogTitle>
                Deseja realmente retirar {user.name} deste projeto?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A retirada deste usuário do projeto irá desassocia-lo do
                    projeto e tarefas atreladas a ele.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpen} color="primary">
                    Cancelar
                </Button>
                <Button
                    data-cy="confirm-disassociation-button"
                    onClick={handleRemove}
                    color="primary"
                    autoFocus
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(DeleteDialog);
