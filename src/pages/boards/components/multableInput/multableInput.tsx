import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import TextField from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

type Props = {
    value: string;
    valueSet: any;
    id: any;
};

const MutableInput: React.FC<Props> = ({ value, valueSet, id }) => {
    const classes = useStyles();
    const [edit, editSet] = useState(false);

    //* Changes size of text area as more text is added
    function auto_grow(e: any) {
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    //* Enter key & outsideclick handler
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' || e === 'outside') {
            if (value === '') {
                valueSet('Sem título', id);
            }
            editSet(false);
        }
    };

    //* Handles value change & trims spaces in the beginning
    const handleInputChange = (e: any) => {
        valueSet(e.target.value.trimStart(), id);
    };

    return (
        <OutsideClickHandler onOutsideClick={() => handleKeyPress('outside')}>
            <div className={classes.mainDiv}>
                {edit ? (
                    <TextField
                        rowsMax={2}
                        className={classes.title}
                        name="firstName"
                        color="primary"
                        onInput={auto_grow}
                        onKeyPress={handleKeyPress}
                        value={value}
                        onChange={handleInputChange}
                    />
                ) : (
                    <div onClick={() => editSet(true)} id="mi-div">
                        <Typography className={classes.title}>
                            {value}
                        </Typography>
                    </div>
                )}
            </div>
        </OutsideClickHandler>
    );
};

export default MutableInput;
