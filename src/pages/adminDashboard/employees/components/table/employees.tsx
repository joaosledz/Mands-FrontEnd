import React, { createRef, useState } from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import pt from 'date-fns/locale/pt-BR';
import { withStyles } from '@material-ui/core/styles';
import { Key as KeyIcon } from '@styled-icons/ionicons-sharp';
import { PersonRemove as RemoveUserIcon } from '@styled-icons/material';

import { TypeEmployee } from '../../../../../models/department';
import Localization from './config/localization';
import MTableFilterRow from '../filter';
import tableIcons from './config/icons';

import HiringModal from '../hiring/modal';
import PermissionModal from '../../../../../components/permission/modal';
import useStyles from './styles';
// import DeleteCupom from '../../components/Dialogs/DeleteCupom';

type Props = {
    data: Array<TypeEmployee>;
};

const TableEmployees: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const PurpleSwitch = withStyles({
        switchBase: {
            color: ' #8D297E',
            '&$checked': {
                color: '#8D297E',
            },
            '&$checked + $track': {
                backgroundColor: '#8D297E',
            },
        },
        checked: {},
        track: {},
    })(Switch);
    const { data } = props;
    const tableRef = createRef();
    const [filter, setFilter] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<TypeEmployee>(
        data[0]
    );
    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(!filter);
    };
    const handleOpenDetails = () => {
        console.log('Modal Abrir Aqui');
    };
    const handleRemove = (id: number, name: string) => {
        console.log(`Funcionário ${name} deletado (id: ${id})`);
    };
    //Hiring Modal
    const [showHiringModal, setShowHiringModal] = useState<boolean>(false);
    const handleOpenHiringModal = () => {
        setShowHiringModal(true);
    };
    //Permission Modal
    const [showPermissionModal, setShowPermissionModal] = useState<boolean>(
        false
    );
    const handleOpenPermissionModal = (rowData: TypeEmployee) => {
        setSelectedEmployee(rowData);
        setShowPermissionModal(true);
    };
    return (
        <>
            <MaterialTable
                icons={tableIcons}
                //onRowClick={(event, rowData) => console.log(rowData)}
                isLoading={data.length === 0}
                localization={Localization}
                title="Cupoms cadastrados"
                options={{
                    filtering: true,
                    headerStyle: {
                        backgroundColor: '#F5F5F5',
                        color: 'gray',
                    },
                    rowStyle: {
                        backgroundColor: '#F5F5F5',
                        fontFamily: 'Roboto-slab',
                        color: 'gray',
                        fontSize: '1rem',
                    },
                    padding: 'default',
                    pageSizeOptions: [5, 10, 20, 30],
                }}
                tableRef={tableRef}
                columns={[
                    {
                        title: 'Imagem',
                        width: 20,
                        field: 'url',
                        sorting: false,
                        filtering: false,
                        render: data => (
                            <img
                                src={data.image}
                                style={{ width: 50, borderRadius: '50%' }}
                                alt="Imagem"
                            />
                        ),
                    },
                    {
                        title: 'Nome',
                        field: 'name',
                        sorting: true,
                        type: 'string',
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'CPF',
                        field: 'cpf',
                        sorting: false,
                        type: 'string',
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Admissão',
                        field: 'admission',
                        sorting: true,
                        type: 'date',
                        dateSetting: { locale: 'pt-BR' },
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Cargo',
                        field: 'jobTitle',
                        sorting: true,
                        type: 'string',
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Permissões',
                        filtering: false,
                        sorting: false,
                        field: 'url',
                        width: 20,
                        render: rowData => (
                            <Button
                                className={classes.button}
                                onClick={() =>
                                    handleOpenPermissionModal(rowData)
                                }
                            >
                                <KeyIcon size={21} color={'white'} />
                            </Button>
                        ),
                    },

                    {
                        title: 'Remover',
                        filtering: false,
                        sorting: false,
                        field: 'url',
                        width: 20,
                        render: rowData => (
                            <Button
                                className={classes.button}
                                onClick={() =>
                                    handleRemove(rowData.id, rowData.name)
                                }
                            >
                                <RemoveUserIcon size={20} color={'white'} />
                            </Button>
                        ),
                    },
                ]}
                data={data}
                components={{
                    FilterRow: props => {
                        return (
                            <MTableFilterRow
                                {...props}
                                localization={{
                                    dateTimePickerLocalization: pt,
                                }}
                                filter={filter}
                            />
                        );
                    },
                    Toolbar: () => (
                        <Grid className={classes.header} container item xs={12}>
                            <Grid item xs={4}>
                                <Typography className={classes.tableTitle}>
                                    Meus Funcionários
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControlLabel
                                    control={
                                        <PurpleSwitch
                                            checked={filter}
                                            onChange={handleChangeFilter}
                                            name="checkedA"
                                        />
                                    }
                                    label="Filtrar"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    className={classes.button}
                                    onClick={handleOpenHiringModal}
                                >
                                    Contratar Funcionário
                                </Button>
                            </Grid>
                        </Grid>
                    ),
                }}
            />
            <HiringModal
                isOpen={showHiringModal}
                setIsOpen={setShowHiringModal}
            />
            <PermissionModal
                isOpen={showPermissionModal}
                setIsOpen={setShowPermissionModal}
                employee={selectedEmployee}
            />
        </>
    );
};

export default TableEmployees;
