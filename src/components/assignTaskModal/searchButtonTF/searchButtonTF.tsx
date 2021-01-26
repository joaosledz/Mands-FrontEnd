import React, {
    useState,
    useRef,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import { Search as SearchIcon } from '@styled-icons/icomoon';
import useStyles from './styles';
import { TypeMember } from '../../../services';

type Props = {
    employees: Array<TypeMember>;
    setEmployees: Dispatch<SetStateAction<TypeMember[]>>;
};

const SearchButtonTF: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { employees, setEmployees } = props;

    const myTextField = useRef<HTMLInputElement>(null);

    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [employeesState] = useState(employees);

    useEffect(() => {
        const handleSearch = () => {
            const filteredEmployees = employeesState.filter(employee =>
                employee.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setEmployees(filteredEmployees);
            // console.log('search: ', searchText);
            // console.log('filtered: ', filteredEmployees);
        };

        if (searchText) handleSearch();
        else setEmployees(employeesState);
    }, [searchText, setEmployees, employeesState]);

    const handleShowSearch = useCallback(() => {
        setShowSearch(!showSearch);
        setTimeout(() => {
            myTextField.current?.focus();
        }, 100);
    }, [showSearch]);

    return (
        <Grid
            container
            item
            alignItems="center"
            xs={12}
            className={classes.container}
        >
            <Grid item xs={2} md={1}>
                <IconButton
                    onClick={handleShowSearch}
                    className={classes.searchButton}
                >
                    <SearchIcon color="white" size={20} />
                </IconButton>
            </Grid>
            <Grid item xs={9} md={10}>
                <Grow in={showSearch}>
                    <TextField
                        variant="standard"
                        label="Pesquise uma pessoa pelo nome"
                        inputRef={myTextField}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Grow>
            </Grid>
        </Grid>
    );
};

export default SearchButtonTF;
