import * as React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import products from './products.json';

class ExcelDownload extends React.Component {
    export = () => {
        {
            this._export.save();
        }
    };

    render() {
        return ;
    }

}
export default ExcelDownload;