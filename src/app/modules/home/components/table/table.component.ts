import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnsInterface } from '../../interfaces/columns.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() columns: ColumnsInterface[] = [];
  expandedElements = new Set<string | number>();

  toggleDetails(element: any) {
    if (this.expandedElements.has(element['ID Number'])) {
      this.expandedElements.delete(element['ID Number']);
    } else {
      this.expandedElements.add(element['ID Number']);
    }
    console.log(this.expandedElements);
  }

  get displayColumns(): string[] {
    return ['expand', ...this.columnNames];
  }

  get columnNames(): string[] {
    return this.columns
      ? this.columns
          .filter((col) => col.selected)
          .map((col) => col.name)
      : [];
  }

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _httpClient: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('columns' in changes) {
      // Fetch data from JSON server when columns change
      this._httpClient
        .get<any[]>('http://localhost:3000/data')
        .subscribe(
          (data) => {
            // Filter data based on selected columns
            const filteredData = data.map((item) => {
              const newItem: any = {};
              for (const column of this.columns) {
                if (column.selected) {
                  newItem[column.name] = item[column.name];
                }
              }
              return newItem;
            });

            this.dataSource = new MatTableDataSource<any>(
              filteredData,
            );
            this.dataSource.paginator = this.paginator; // Move the paginator assignment here
          },
          (error) => {
            console.error('Error: ' + error);
          },
        );
    }
  }
  applyFilter(column: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const val = data[column];
      return val != null && val.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Showing';

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `of ${length}`;
    }

    return `of ${length}`;
  };
}
