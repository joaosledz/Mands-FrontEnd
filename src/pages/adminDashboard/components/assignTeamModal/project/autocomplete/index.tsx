import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    memo,
} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import debounce from 'awesome-debounce-promise';
import TextField from '@material-ui/core/TextField';
import { TypeMember, departmentApi } from '../../../../../../services';
// import useCompany from '../../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';
import useCompany from '../../../../../../hooks/useCompany';
import useDepartment from '../../../../../../hooks/useDepartment';

type Props = {
    value: Array<TypeMember>;
    setValue: Dispatch<SetStateAction<TypeMember[]>>;
    selectedValues?: TypeMember[];
};

const Autocompletar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    // const searchUserDebounced = debounce(departmentApi.listEmployees, 500);
    // const { company } = useCompany();
    const { value, setValue, selectedValues = [] } = props;
    const { company } = useCompany();
    const { department } = useDepartment();
    // const [value, setValue] = React.useState<Array<TypeMember>>();
    // const [inputValue, setInputValue] = React.useState('');
    const [employees, setEmployees] = useState<TypeMember[]>([]);
    // const [inputValue, setInputValue] = useState<string>();

    // const handleTextChange = async (text: string) => {
    //     setInputValue(text);
    //     if (company && department)
    //         try {
    //             const { data } = await searchUserDebounced(companyId, departmentId);
    //             const auxData = [{ ...data }];
    //             setEmployees(auxData);
    //         } catch (error) {}
    // };

    useEffect(() => {
        console.log(selectedValues);
        const fetchEmployees = async () => {
            if (department && company) {
                try {
                    const {
                        data: response,
                    } = await departmentApi.listEmployees(
                        company.companyId,
                        department.departmentId
                    );
                    console.log(response);
                    if (selectedValues.length === 0) setEmployees(response);
                    else if (selectedValues.length === response.length) return;
                    else {
                        console.log('all: ', response);
                        console.log('selected: ', selectedValues);
                        const auxData = response.filter(employee =>
                            selectedValues.some(
                                selectedEmployee =>
                                    employee.userId !== selectedEmployee.userId
                            )
                        );
                        console.log('auxData: ', selectedValues);
                        setEmployees(auxData);
                    }
                } catch (error) {
                    snackbarUtils.error(error.message);
                }
            }
        };
        fetchEmployees();
    }, [department, company, selectedValues]);

    return (
        <div className={classes.root}>
            <Autocomplete
                fullWidth
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={employees}
                value={value}
                // onInputChange={(e, value) => {
                //     // console.log(value);
                //     handleTextChange(value);
                //     // setInputValue(value);
                // }}
                onChange={(event: any, newValue: Array<TypeMember>) =>
                    setValue(newValue)
                }
                // onInputChange={(event, newInputValue) =>
                //     handleTextChange(newInputValue)
                // }
                getOptionLabel={(option: TypeMember) => `${option.username}`}
                // defaultValue={selectedValues}
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
