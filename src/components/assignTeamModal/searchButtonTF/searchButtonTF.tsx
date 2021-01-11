import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import { Search as SearchIcon } from '@styled-icons/icomoon';
import useStyles from './styles';

const SearchButtonTF: React.FC = () => {
    const classes = useStyles();

    const myTextField = useRef<HTMLInputElement>(null);

    const [showSearch, setShowSearch] = useState(false);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
        setTimeout(() => {
            myTextField.current?.focus();
        }, 100);
    };

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
                        label="Pesquise uma pessoa"
                        inputRef={myTextField}
                    />
                </Grow>
            </Grid>
        </Grid>
    );
};

export default SearchButtonTF;
