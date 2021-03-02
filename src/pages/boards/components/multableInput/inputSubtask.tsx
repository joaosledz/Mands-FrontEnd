import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import TextField from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import { sessionApi, sessionType } from '../../../../services';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

type Props = {
    value: string;
    valueSet: any;
    id: any;
    inputStyle?: string;
    companyId: number;
    projectId: number;
    departmentId: number;
    index: number;
    updateSubtaskAPI: (index: number) => void;
};

const MutableInput: React.FC<Props> = ({
    value,
    valueSet,
    id,
    inputStyle,
    companyId,
    departmentId,
    projectId,
    index,
    updateSubtaskAPI,
}) => {
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
        valueSet(e.target.value.trimStart(), index);
    };

    // const updateSessionSocket = (title: string) => {
    //     let data: sessionType = {
    //         title,
    //         description: '',
    //         companyId,
    //         departmentId,
    //     };
    //     sessionApi
    //         .update(projectId, id, data)
    //         .then(response => {
    //             console.log(response);
    //             snackbarUtils.success('Session atualizada com sucesso');
    //         })
    //         .catch(error => {
    //             snackbarUtils.error('Erro ao tentar editar o título');
    //         });
    // };

    return (
        <OutsideClickHandler onOutsideClick={() => handleKeyPress('outside')}>
            <div className={classes.mainDiv}>
                {edit ? (
                    <TextField
                        rowsMax={4}
                        className={
                            inputStyle
                                ? [classes.title, inputStyle].join(' ')
                                : classes.title
                        }
                        name="firstName"
                        color="primary"
                        onInput={auto_grow}
                        onKeyPress={handleKeyPress}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={() => updateSubtaskAPI(index)}
                    />
                ) : (
                    <div
                        onClick={() => editSet(true)}
                        className={classes.mainDiv}
                        id="mi-div"
                    >
                        <Typography
                            className={
                                inputStyle
                                    ? [classes.title, inputStyle].join(' ')
                                    : classes.title
                            }
                        >
                            {value}
                        </Typography>
                    </div>
                )}
            </div>
        </OutsideClickHandler>
    );
};

export default MutableInput;
