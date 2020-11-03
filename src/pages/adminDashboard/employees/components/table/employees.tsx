import React, { createRef, useState } from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, FormControlLabel, Switch } from '@material-ui/core';
import pt from "date-fns/locale/pt-BR";
// import DeleteCupom from '../../components/Dialogs/DeleteCupom';
import Localization from './config/localization';
import { TypeEmployee } from '../../../../../models/department';
import MTableFilterRow from '../filter'
import tableIcons from './config/icons'
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import {InfoCircle as InfoIcon} from '@styled-icons/bootstrap' 
import {RemoveUser as RemoveUserIcon} from '@styled-icons/entypo'
import { withStyles } from '@material-ui/core/styles';

type Props = {
    data: Array<TypeEmployee>;
};

const TableEmployees: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const PurpleSwitch = withStyles({
        switchBase: {
          color:' #8D297E',
          '&$checked': {
            color:'#8D297E',
          },
          '&$checked + $track': {
            backgroundColor: '#8D297E',
          },
        },
        checked: {},
        track: {},
      })(Switch);
    const {data} = props;
    const tableRef = createRef();
    const [filter, setFilter] = useState<boolean>(false)
    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(!filter)
      };
    const handleOpenDetails = () =>{
        console.log('Modal Abrir Aqui')
    }
    const handleRemove = (id:number, name: string) =>{
        console.log(`Funcionário ${name} deletado (id: ${id})`)
    }
    return (
        
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
                    color:'gray',
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
                    render: (data) => (
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
                        filtering: true,
                        sorting: true,
                        type: 'string',
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'CPF',
                        field: 'cpf',
                        filtering: true,
                        sorting: false,
                        type: 'string',
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Admissão',
                        field: 'admission',
                        filtering: true,
                        sorting: true,
                        type: 'date',
                        dateSetting: { locale: 'pt-BR' },
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Cargo',
                        field: 'jobTitle',
                        filtering: true,
                        sorting: true,
                        type: 'date',
                        cellStyle: { textAlign: 'left' },
                    },
                {
                    title: 'Detalhes',
                    sorting: false,
                    field: 'url',
                    width: 20,
                    render: (rowData) => (
                        <Button
                            className={classes.button}
                            onClick={handleOpenDetails}
                        >
                            <InfoIcon className={classes.iconButton}/>
                        </Button>

                    ),
                },
            
                {
                    title: 'Remover',
                    sorting: false,
                    field: 'url',
                    width: 20,
                    render: (rowData) => (
                        <Button
                            className={classes.button}
                            onClick={()=>handleRemove(rowData.id, rowData.name)}
                        >
                            <RemoveUserIcon className={classes.iconButton}/>
                        </Button>

                    ),
                },
                // {
                //     title: 'Editar',
                //     sorting: false,
                //     field: 'url',
                //     filtering: false,
                //     width: 20,
                //     render: (rowData) => (
                //         <Button
                //             color="danger"
                //             style={{
                //                 width: '10px',
                //             }}
                //             onClick={() => handleChangeView('edit', rowData.id)}
                //         >
                //             <InfoIcon style={{ marginLeft: '-12px' }} />
                //         </Button>
                //     ),
                // },
                // {
                //     title: 'Permitido uso conjunto?',
                //     field: 'recursive',
                //     sorting: false,
                //     type: 'string',
                //     lookup: { 0: 'NÃO', 1: 'SIM' },
                //     cellStyle: { textAlign: 'center' },
                // },
              
            ]}
            data={data}
            // actions={[
            //     {
            //         icon: 'refresh',
            //         tooltip: 'Refresh Data',
            //         isFreeAction: true,
            //         onClick: () => setChangeData(!changeData),
            //     },
            // ]}
            components={{
                FilterRow: (props) => {
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
                    <Grid
                    className={classes.header}
                    container
                    item
                    xs={12}
                    >
                        <Grid item xs={4}>
                        <Typography className={classes.tableTitle}>
                            Meus Funcionários
                        </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <FormControlLabel
        control={<PurpleSwitch checked={filter} onChange={handleChangeFilter} name="checkedA" />}
        label="Filtrar"
      />
                        </Grid>
                        <Grid item xs={3}>
                            <Button className={classes.button}>
                                Contratar Funcionário
                            </Button>
                        </Grid>
                        
                        
                    </Grid>
                ),
            }}
        />
    );
}

export default TableEmployees;
