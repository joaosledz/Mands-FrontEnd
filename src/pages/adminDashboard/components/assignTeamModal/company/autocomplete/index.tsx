/* eslint-disable no-use-before-define */
import React, { Dispatch, SetStateAction, useState, memo } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import debounce from 'awesome-debounce-promise';

import { TypeMember, TypeUser, userApi } from '../../../../../../services';
import useStyles from './styles';

type Props = {
    value: TypeUser | null;
    setValue: Dispatch<SetStateAction<TypeUser | null>>;
    selectedValues?: TypeMember[];
};

const Autocompletar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const { value, setValue } = props;
    // const [value, setValue] = React.useState<Array<TypeMember>>();
    const [inputValue, setInputValue] = React.useState('');
    const [employees, setEmployees] = useState<TypeUser[]>([]);

    const searchUserDebounced = debounce(userApi.show, 500);

    const handleTextChange = async (text: string) => {
        setInputValue(text);
        if (inputValue)
            try {
                const { data } = await searchUserDebounced(inputValue);
                const auxData = [{ ...data }];
                setEmployees(auxData);
            } catch (error) {}
    };

    return (
        <div className={classes.root}>
            <Autocomplete
                fullWidth
                id="multiple-limit-tags"
                options={employees}
                value={value}
                onChange={(event: any, newValue: TypeUser | null) =>
                    setValue(newValue)
                }
                onInputChange={(event, newInputValue) =>
                    handleTextChange(newInputValue)
                }
                getOptionLabel={(option: TypeUser) =>
                    `${option.name} ${option.surname} - ${option.username}`
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Procure o nome"
                        placeholder="Pessoas"
                        // inputProps={{ 'data-cy': 'users-autocomplete' }}
                    />
                )}
                noOptionsText={'Nenhuma pessoa disponível foi identificada.'}
                data-cy="users-autocomplete"
            />
        </div>
    );
};
export default memo(Autocompletar);
