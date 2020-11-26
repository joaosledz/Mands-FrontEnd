/* eslint-disable no-use-before-define */
import React, { Dispatch, SetStateAction } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TypeTeam } from '../../../../../models/department';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(4),
            },
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    })
);

type Props = {
    data: Array<TypeTeam>;
    value: Array<TypeTeam>;
    setValue: Dispatch<SetStateAction<Array<TypeTeam>>>;
};

const Autocompletar: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { data, value, setValue } = props;
    // const [value, setValue] = React.useState<Array<TypeTeam>>();
    // const [inputValue, setInputValue] = React.useState('');

    return (
        <div className={classes.root}>
            {console.log(value)}
            <Autocomplete
                fullWidth
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={data}
                value={value}
                onChange={(event: any, newValue: Array<TypeTeam>) => {
                    setValue(newValue);
                }}
                getOptionLabel={(option: TypeTeam) => option.name}
                defaultValue={[]}
                renderInput={params => (
                    <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label="Procure por usuário, e-mail, ou CPF"
                        placeholder="pessoas"
                    />
                )}
            />
        </div>
    );
};
export default Autocompletar;
