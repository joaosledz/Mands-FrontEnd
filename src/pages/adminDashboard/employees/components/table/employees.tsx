import React, { createRef } from 'react';
import MaterialTable from 'material-table';
import { /*Button,*/ Grid } from '@material-ui/core';
// import DeleteCupom from '../../components/Dialogs/DeleteCupom';
import Localization from './config/localization';
import { TypeEmployee } from '../../../../../models/department';

import tableIcons from './config/icons'
type Props = {
    data: Array<TypeEmployee>;
};

const TableEmployees: React.FC<Props> = (props: Props) => {
    const {data} = props;
    const tableRef = createRef();

    return (
        
        <MaterialTable
            icons={tableIcons}
            //onRowClick={(event, rowData) => console.log(rowData)}
            isLoading={data.length === 0}
            localization={Localization}
            title="Cupoms cadastrados"
            options={{
                headerStyle: {
                    backgroundColor: '#F5F5F5',
                    color:'gray',
                },
                rowStyle: {
                    backgroundColor: '#F5F5F5',
                  },
                padding: 'default',
                pageSizeOptions: [5, 10, 20, 30],
            }}
            tableRef={tableRef}
            columns={[
                {
                    title: 'Imagem',
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
                        cellStyle: { textAlign: 'left' },
                    },
                    {
                        title: 'Cargo',
                        field: 'jobTitle',
                        sorting: true,
                        type: 'date',
                        cellStyle: { textAlign: 'left' },
                    },
                // {
                //     title: 'Deletar',
                //     sorting: false,
                //     field: 'url',
                //     width: 20,
                //     render: (rowData) => (
                //         <DeleteCupom
                //             handleChangeData={handleChangeData}
                //             cupomId={rowData.id}
                //             code={rowData.code}
                //         />
                //     ),
                // },
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
                //     title: 'ID',
                //     field: 'id',
                //     type: 'numeric',
                //     width: 20,
                // },
                // { title: 'Código', field: 'code', type: 'string' },
                // {
                //     title: 'Permitido uso conjunto?',
                //     field: 'recursive',
                //     sorting: false,
                //     type: 'string',
                //     lookup: { 0: 'NÃO', 1: 'SIM' },
                //     cellStyle: { textAlign: 'center' },
                // },
                // {
                //     title: 'Desconto',
                //     field: 'discont',
                //     type: 'string',
                // },
                // { title: 'Quantidade', field: 'quantity', type: 'numeric' },
                // {
                //     title: 'Início Validade',
                //     field: 'valid_from',
                //     type: 'datetime',
                //     dateSetting: { locale: 'pt-BR' },
                // },
                // {
                //     title: 'Data Expiração',
                //     field: 'valid_until',
                //     type: 'datetime',
                //     dateSetting: { locale: 'pt-BR' },
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
                Toolbar: () => (
                    <Grid
                        style={{
                            paddingLeft: '22px',
                            paddingTop: '7px',
                            marginBottom: '7px',
                        }}
                    >
                        <h2 style={{ marginBottom: '0px' }}>
                            Meus Funcionários &nbsp;
                        </h2>
                        
                    </Grid>
                ),
            }}
        />
    );
}

export default TableEmployees;
