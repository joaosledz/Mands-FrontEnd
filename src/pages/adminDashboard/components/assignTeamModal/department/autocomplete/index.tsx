/* eslint-disable no-use-before-define */
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    memo,
} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { TypeMember, companyApi } from '../../../../../../services';
import useCompany from '../../../../../../hooks/useCompany';
import snackbarUtils from '../../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';

type Props = {
    value: Array<TypeMember>;
    setValue: Dispatch<SetStateAction<TypeMember[]>>;
    selectedValues?: TypeMember[];
};

const Autocompletar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const { company } = useCompany();
    const { value, setValue, selectedValues = [] } = props;
    // const [value, setValue] = React.useState<Array<TypeMember>>();
    // const [inputValue, setInputValue] = React.useState('');
    const [employees, setEmployees] = useState<TypeMember[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (company) {
                try {
                    const {
                        data: response,
                    } = await companyApi.findAllEmployees(company.companyId);
                    if (selectedValues.length === 0) setEmployees(response);
                    else if (selectedValues.length === response.length) return;
                    else {
                        // console.log('all: ', response);
                        // console.log('selected: ', selectedValues);
                        const auxData = response.filter(employee =>
                            selectedValues.some(
                                selectedEmployee =>
                                    employee.userId !== selectedEmployee.userId
                            )
                        );
                        // console.log('auxData: ', selectedValues);
                        setEmployees(auxData);
                    }
                } catch (error) {
                    snackbarUtils.error(error.message);
                }
            }
        };
        fetchEmployees();
    }, [company, selectedValues]);

    return (
        <div className={classes.root}>
            <Autocomplete
                fullWidth
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={employees}
                value={value}
                onChange={(event: any, newValue: Array<TypeMember>) =>
                    setValue(newValue)
                }
                getOptionLabel={(option: TypeMember) => option.name}
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
