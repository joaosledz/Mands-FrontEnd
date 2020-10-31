import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { EllipsisH as EllipsisIcon } from '@styled-icons/fa-solid';

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
    DeleteColumn: any;
    columnID: string;
};
export default function SimplePopover(props: PopoverProps) {
    const { DeleteColumn, columnID } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        DeleteColumn(columnID);
                    }}
                >
                    Apagar
                </Typography>
            </Popover>
        </div>
    );
}
