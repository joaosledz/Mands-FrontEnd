import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    memo,
} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'awesome-debounce-promise';
import TextField from '@material-ui/core/TextField';
import { TypeMember, userApi } from '../../../../../../services';
// import useCompany from '../../../../../../hooks/useCompany';
// import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';

type Props = {
    value: Array<TypeMember>;
    setValue: Dispatch<SetStateAction<TypeMember[]>>;
    selectedValues?: TypeMember[];
};

const Autocompletar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const searchUserDebounced = debounce(userApi.find, 500);
    // const { company } = useCompany();
    const { value, setValue, selectedValues = [] } = props;
    // const [value, setValue] = React.useState<Array<TypeMember>>();
    // const [inputValue, setInputValue] = React.useState('');
    const [employees, setEmployees] = useState<TypeMember[]>([]);
    const [inputValue, setInputValue] = useState<string>();

    const handleTextChange = async (text: string) => {
        setInputValue(text);
        if (inputValue)
            try {
                const { data } = await searchUserDebounced(inputValue);
                const auxData = [{ ...data }];
                setEmployees(auxData);
            } catch (error) {}
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            if (inputValue) {
                try {
                    const { data: response } = await userApi.find(inputValue);
                    console.log(response);
                    // if (selectedValues.length === 0) setEmployees(response);
                    // else if (selectedValues.length === response.length) return;
                    // else {
                    // console.log('all: ', response);
                    // console.log('selected: ', selectedValues);
                    // const auxData = response.filter(employee =>
                    //     selectedValues.some(
                    //         selectedEmployee =>
                    //             employee.userId !== selectedEmployee.userId
                    //     )
                    // );
                    // console.log('auxData: ', selectedValues);
                    setEmployees([response]);
                    // }
                } catch (error) {
                    // snackbarUtils.error(error.message);
                }
            }
        };
        fetchEmployees();
    }, [inputValue, selectedValues]);

    return (
        <div className={classes.root}>
            <Autocomplete
                fullWidth
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={employees}
                value={value}
                onInputChange={(e, value) => {
                    // console.log(value);
                    handleTextChange(value);
                    // setInputValue(value);
                }}
                onChange={(event: any, newValue: Array<TypeMember>) =>
                    setValue(newValue)
                }
                // onInputChange={(event, newInputValue) =>
                //     handleTextChange(newInputValue)
                // }
                getOptionLabel={(option: TypeMember) => `${option.username}`}
                defaultValue={[]}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Procure por usuário, e-mail, ou CPF"
                        placeholder="Pessoas"
                    />
                )}
                noOptionsText={'Nenhuma pessoa disponível foi identificada.'}
            />
        </div>
    );
};
export default memo(Autocompletar);
