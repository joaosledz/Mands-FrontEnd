import React from 'react';

import TextField from '@material-ui/core/TextField';

interface TextFieldProps {
    label: string;
    type?: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = props => {
    const { label, type } = props;
    return (
        <TextField
            id="outlined-basic"
            type={type ? type : 'text'}
            label={label}
            variant="outlined"
            style={{ width: '100%' }}
            inputProps={{
                style: inputStyle,
            }}
        />
    );
};

const inputStyle = {
    paddingLeft: 5,
    fontFamily: 'Roboto',
};

export default TextFieldComponent;
