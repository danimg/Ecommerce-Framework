import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { FormatPipe } from './../../pipes/format.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export enum NgbTableColumnType {
  string,
  date,
  datetime,
  time,
  money,
  bool,
  number,
  color,
  html
}

export enum NgbTableFilterType {
  input,
  select,
  checkbox
}

export enum NgbTableFilterCondition {
  Contendo = 1,
  Igual = 2,
  Diferente = 3
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngb-table',
  templateUrl: 'table.html',
  styleUrls: ['table.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
// tslint:disable-next-line: component-class-suffix
export class NgbTable implements OnInit {

  @Input() disabledActions = false;
  @Input() disabledFilters = false;
  @Input() groupActions = true;
  @Input() columns: Array<NgbTableColumn>;
  @Input() actions: Array<NgbTableAction>;
  @Input() dataRow: NgbTableDataRow;
  @Input() pageSize: number[] = [1, 3, 5, 10, 15, 20, 30, 50, 75, 100];
  @Input() pagedList: NgbTablePagedList<any>;
  @Input() minWidthColumn = 100;
  @Output() tableChange = new EventEmitter<NgbTablePagedList<any>>();

  public expandedElement = {};
  constructor(
    private modal: NgbModal,
    private formatPipe: FormatPipe,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.pagedList.sort = [];
  }

  onResize(event) {
    let width = event.contentRect.width;
    if (this.actions) {
      if (this.actions.length > 0) {
        width -= 150;
      }
    }
    if (this.hasColumnHidden()) {
      width -= 25;
    }
    this.toggleColumns(width);
  }

  toggleColumns(tableWidth: number) {
    this.columns.forEach(column => {
      const columnWidth = column.minWidth ? column.minWidth : this.minWidthColumn;
      column.hidden = tableWidth < columnWidth;
      tableWidth -= columnWidth;
    });
  }

  public prepareColumn(column: NgbTableColumn) {

    if (column.minWidth && column.maxWidth) {
      return { 'min-width.px': column.minWidth, 'max-width.px': column.maxWidth };
    }
    if (column.minWidth) {
      return { 'min-width.px': column.minWidth };
    }
    if (column.maxWidth) {
      return { 'max-width.px': column.maxWidth };
    }
    return {};
  }

  public prepareValue(column: NgbTableColumn, data: any) {
    const value = data[column.fieldName];
    if (column.type === NgbTableColumnType.string && column.mask) {
      return this.formatPipe.transform(value, column.mask);
    } else if (column.type === NgbTableColumnType.bool) {
      return value ? 'Sim' : 'Não';
    } else if (column.type === NgbTableColumnType.date) {
      return this.datePipe.transform(value, 'dd/MM/yyyy', 'pt');
    } else if (column.type === NgbTableColumnType.time) {
      return this.datePipe.transform(value, 'HH:mm:ss', 'pt');
    } else if (column.type === NgbTableColumnType.datetime) {
      return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm', 'pt');
    } else if (column.type === NgbTableColumnType.color) {
      const element = `
      <div
        style="background-color: ${value};
        width: 25px;
        height: 25px;
        border: 1px solid grey;
        border-radius: 20%;">
      </div>`;

      return this.sanitizer.bypassSecurityTrustHtml(element);
    } else if (column.type === NgbTableColumnType.html) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    } else {
      return value;
    }
  }

  public prepareRouter(action: NgbTableAction, data: any): string {
    if (action.routerLink) {
      let router = action.routerLink;
      for (let index = 0; index < action.filedsName.length; index++) {
        router = router.replace('{' + index + '}', data[action.filedsName[index]]);
      }
      return router;
    } else {
      return '';
    }
  }

  public prepareAction(action: NgbTableAction, data: any, index: number) {
    if (action.condition) {
      return action.condition(data, index);
    }
    return true;
  }

  public prepareDataRow(data: any) {
    if (this.dataRow && this.dataRow.style) {
      return this.dataRow.style(data);
    }
  }

  public prepareFilterItemText(col: NgbTableColumn, item: any) {
    return item[col.filterDataFieldText];
  }

  public prepareFilterItemValue(col: NgbTableColumn, item: any) {
    return item[col.filterDataFieldValue];
  }

  onActionClick(action: NgbTableAction, data: any, index: number) {
    if (action.click) {
      action.click(data, index);
    }
  }

  isBool(column: NgbTableColumn) {
    return column.type === NgbTableColumnType.bool;
  }

  isFilterCheckbox(column: NgbTableColumn) {
    return column.filterType === NgbTableFilterType.checkbox;
  }

  isFilterSelect(column: NgbTableColumn) {
    return column.filterType === NgbTableFilterType.select;
  }

  onSort(sort: NgbTableSort) {
    this.pagedList.sort.forEach((item, index) => {
      if (item.column === sort.column) {
        this.pagedList.sort.splice(index, 1);
      }
    });
    if (sort.direction !== '') {
      this.pagedList.sort.push(sort);
    }
    this.onTableChange();
  }

  onTableChange() {
    this.tableChange.emit({
      page: this.pagedList.page,
      pageSize: this.pagedList.pageSize,
      recordCount: this.pagedList.recordCount,
      filter: this.pagedList.filter,
      sort: this.pagedList.sort
    });
  }

  setDirection(fieldName: string): string {
    let direction = '';
    this.pagedList.sort.forEach(item => {
      if (item.column === fieldName) {
        direction = item.direction;
      }
    });
    return direction;
  }

  onFilter() {
    const filter = this.modal.open(NgbTableFilterBy, { size: 'lg' });
    filter.componentInstance.columns = this.columns;
    filter.componentInstance.filters = this.pagedList.filter;
    filter.result.then(result => {
      this.pagedList.filter = result;
      this.onTableChange();
    }).catch(error => { });
  }

  addFiltro(campo: string, tipo: NgbTableColumnType, condicao: NgbTableFilterCondition, filtro: string) {
    this.pagedList.filter = this.pagedList.filter.filter(t => t.column.fieldName !== campo);

    if (filtro && filtro !== 'null') {
      this.pagedList.filter.push({
        column: {
          fieldName: campo, type: tipo, title: campo, hidden: false,
        },
        condition: condicao, search: filtro.toString()
      });
    }
  }
  filtrarContendo(col: NgbTableColumn, $event) {
    this.addFiltro(col.fieldName, col.type, NgbTableFilterCondition.Contendo, $event.target.value);
    this.onTableChange();
  }

  filtrarIgual(col: NgbTableColumn, $event) {
    this.addFiltro(col.fieldName, col.type, NgbTableFilterCondition.Igual, $event.target.value);
    this.onTableChange();
  }

  onFilterClear(): void {
    this.pagedList.filter = [];
    this.onTableChange();
  }
  hasFilters() {
    let hasColumnFilter = false;
    this.columns.forEach(col => {
      if (col.filterable == null || col.filterable) {
        hasColumnFilter = true;
        return;
      }
    });
    return hasColumnFilter;
  }

  hasColumnHidden() {
    return this.columns.some(t => t.hidden);
  }
}

export interface NgbTableAction {
  name?: string;
  title?: string;
  icon?: string;
  filedsName?: string[];
  routerLink?: string;
  className?: string;
  paginaOrigem?: string;
  claimKey?: string;
  claimValue?: string;
  condition?: (data, index) => {};
  click?: (data, index) => {};
  target?: string;
}

export interface NgbTableColumn {
  fieldName: string;
  title: string;
  type: NgbTableColumnType;
  hidden?: boolean;
  mask?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: NgbTableFilterType;
  filterData?: any[];
  filterDataFieldText?: string;
  filterDataFieldValue?: string;

  maxWidth?: number;
  minWidth?: number;
}

export interface NgbTableDataRow {
  style?: (data) => {};
  class?: (data) => {};
}

export interface NgbTableFilter {
  column: NgbTableColumn;
  condition: NgbTableFilterCondition;
  search: string;
}

export interface NgbTablePagedList<T> {
  page: number;
  pageSize?: number;
  recordCount?: number;
  sort?: NgbTableSort[];
  filter?: NgbTableFilter[];
  items?: T[];
  tipoAtendimento?: T[];
}

export interface NgbTablePagination {
  page: number;
  pageSize: number;
  recordCount?: number;
  sortColumn?: string;
  sortDirection?: string;
  filters?: NgbTablePaginationFilter[];
}

export interface NgbTablePaginationFilter {
  column: string;
  search: any;
}

export interface NgbTableSort {
  column: string;
  direction: string;
}

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: string;
  direction: SortDirection;
}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngb-table-filter',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Filtrar</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <div class="form-row">
        <div class="form-group col-sm-4">
          <label>Campo</label>
          <select [(ngModel)]="filter.column" class="form-control form-control-sm" (change)="onChange()">
            <ng-container *ngFor="let column of columns">
              <option *ngIf="isFiltrable(column)" [ngValue]="column" [label]="column.title"></option>
            </ng-container>
          </select>
        </div>
        <div class="form-group col-sm-2">
          <label>Condição</label>
          <select [(ngModel)]="filter.condition" class="form-control form-control-sm">
            <option *ngFor="let key of keys" [ngValue]="key" [label]="filtercondition[key]"></option>
          </select>
        </div>
        <div class="form-group col-sm-4">
        <label>Filtro</label>
          <input [(ngModel)]="filter.search" [type]="type" class="form-control form-control-sm" *ngIf="type !== 'bool'">
          <select [(ngModel)]="filter.search" class="form-control form-control-sm" *ngIf="type === 'bool'">
            <option [value]="true">Sim</option>
            <option [value]="false">Não</option>
          </select>
        </div>
        <div class=" form-group col-sm-2 pt-4">
          <button class="btn btn-primary btn-ff" (click)="onAdd()" [disabled]="isInvalid()">
            <ngb-icon name="plus"></ngb-icon> Adicionar
          </button>
        </div>
      </div>
      <div class="form-row">
        <table class="table table-striped table-bordered mt-2 table-responsive-sm">
          <thead>
            <th> Campo </th>
            <th> Condição </th>
            <th> Filtro </th>
            <th></th>
          </thead>
          <tbody>
            <tr *ngIf="_filters.length == 0">
              <td class="text-center" colspan="4">Nenhum filtro adicionado.
              </td>
            </tr>
            <tr *ngFor="let item of _filters">
              <td>{{item.column.title}}</td>
              <td>{{filtercondition[item.condition]}}</td>
              <td>{{item.search}}</td>
              <td>
                <button class="btn btn-sm btn-danger" (click)="onRemove(item)"><ngb-icon name="trash-alt"></ngb-icon></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-light" (click)="onClear()"><ngb-icon name="eraser"></ngb-icon>Limpar</button>
    <button type="button" class="btn btn-primary" (click)="onFilter()"><ngb-icon name="check"></ngb-icon>Aplicar</button>
  </div>
`
})
// tslint:disable-next-line: component-class-suffix
export class NgbTableFilterBy implements OnInit {


  @Input() columns: Array<NgbTableColumn>;
  @Input() filters: Array<NgbTableFilter>;

  keys: number[] = [];
  _filters: Array<NgbTableFilter> = [];

  filtercondition = NgbTableFilterCondition;
  filter: NgbTableFilter;
  type = 'text';

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.keys = Object.keys(this.filtercondition).filter(Number).map(Number);
    this._filters = Object.assign([], this.filters);
    this.resetFilter();
  }

  resetFilter(): void {
    let column;
    this.columns.forEach(col => {
      if ((col.filterable == null || col.filterable) && column == null) {
        column = col;
      }
    });

    this.filter = { column: column, condition: NgbTableFilterCondition.Igual, search: null };
    this.onChange();
  }

  onChange() {
    if (this.filter.column.type === NgbTableColumnType.date) {
      this.type = 'date';
    } else if (this.filter.column.type === NgbTableColumnType.datetime) {
      this.type = 'datetime-local';
    } else if (this.filter.column.type === NgbTableColumnType.number) {
      this.type = 'number';
    } else if (this.filter.column.type === NgbTableColumnType.bool) {
      this.type = 'bool';
    } else if (this.filter.column.type === NgbTableColumnType.color) {
      this.type = 'color';
    } else {
      this.type = 'text';
    }
  }

  onAdd(): void {
    this._filters.push(this.filter);
    this.resetFilter();
  }

  onRemove(filter: NgbTableFilter) {
    this._filters.forEach((item, index) => {
      if (item === filter) {
        this._filters.splice(index, 1);
      }
    });
  }
  onFilter(): void {
    this.activeModal.close(this._filters);
  }
  onClear(): void {
    this._filters = [];
  }
  isInvalid() {
    return this.filter.search === null || this.filter.column === null;
  }

  isFiltrable(column: NgbTableColumn): boolean {
    return column.filterable == null || column.filterable;
  }
}

