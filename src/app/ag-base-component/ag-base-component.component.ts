import { Component, Input } from '@angular/core';
import { AgDataService } from '../services/ag-data.service';

@Component({
  selector: 'app-ag-base-component',
  templateUrl: './ag-base-component.component.html',
  styleUrls: ['./ag-base-component.component.css'],
})
export class AgBaseComponentComponent {
  @Input() rowData: any;
  @Input() defaultColDef: any;
  @Input() columnDefs: any;
  @Input() pagination: boolean = false;
  @Input() paginationPageSize: number = 0;
  @Input() paginationPageSizeSelector: any;
  @Input() gridApi: any;
  @Input() gridColumnApi: any;
  gridOptions: any = {};

  colDefs: any;

  refreshGrid() {
    this.gridApi.refreshCells({
      force: false,
      suppressFlash: false,
    });
  }

  onGridReady(params: import('ag-grid-community').GridReadyEvent) {
    this.gridOptions.showLoadingOverlay = false;
    this.gridApi = params.api;
    this.gridApi.updateGridOptions({
      rowData: this.rowData,
      columnDefs: this.columnDefs,
    });
  }

  onCellValueChanged = (
    event: import('ag-grid-community').CellValueChangedEvent
  ) => {
    console.log(`New Cell Value: ${event.value}`);
  };
}
