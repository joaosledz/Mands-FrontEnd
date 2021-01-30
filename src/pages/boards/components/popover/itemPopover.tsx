import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { EllipsisH as EllipsisIcon } from '@styled-icons/fa-solid';
import BoardContext from '../../../../contexts/board';
import {
    SubmitDeleteTask,
    // SubmitTaskType,
    taskApi,
} from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(1),
            fontFamily: 'roboto',
            fontSize: '1rem',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        iconTask: {
            color: '#6E6E6E',
            width: '14px',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
    })
);
type PopoverProps = {
    itemID: string;
    columnID: string;
    departmentId: number;
    projectId: number;
    companyId: number;
};
export default function SimplePopover(props: PopoverProps) {
    const { itemID, /*columnID,*/ departmentId, projectId, companyId } = props;
    const {
        /*DeleteTask*/
    } = useContext(BoardContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const DeleteTaskSocket = () => {
        let data: SubmitDeleteTask = {
            companyId,
            departmentId,
            projectId,
        };
        taskApi
            .delete(parseInt(itemID.replace('task_', '')), data)
            .then(response => {
                // console.log(response);
                snackbarUtils.success('Tarefa deletada com sucesso');
            })
            .catch(error => {
                snackbarUtils.error('Erro ao tentar deletar tarefa');
            });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <EllipsisIcon
                aria-describedby={id}
                className={classes.iconTask}
                onClick={handleClick}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography
                    className={classes.typography}
                    onClick={() => {
                        DeleteTaskSocket();
                    }}
                >
                    Apagar
                </Typography>
            </Popover>
        </div>
    );
}
