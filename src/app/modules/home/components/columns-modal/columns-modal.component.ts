import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ColumnsInterface } from '../../interfaces/columns.interface';

@Component({
  selector: 'app-columns-modal',
  templateUrl: './columns-modal.component.html',
  styleUrls: ['./columns-modal.component.scss'],
})
export class ColumnsModalComponent {
  searchText = '';
  isAllSelected!: boolean;
  updatedColumns: ColumnsInterface[];
  @Input() columns: ColumnsInterface[] = [];
  @Output() applyChanges = new EventEmitter<ColumnsInterface[]>();

  get filteredColumns(): ColumnsInterface[] {
    return this.updatedColumns.filter((col) =>
      col.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  get isSomeSelected(): boolean {
    return (
      !this.isAllSelected &&
      this.filteredColumns.some((col) => col.selected)
    );
  }

  get columnsClone(): ColumnsInterface[] {
    return this.columns.map((col) => ({ ...col }));
  }

  constructor() {
    this.columns = [
      { name: 'Type1', selected: false },
      { name: 'Type2', selected: false },
      { name: 'Type3', selected: false },
      { name: 'Type4', selected: false },
      { name: 'Type5', selected: false },
      { name: 'Type6', selected: false },
      { name: 'Type1', selected: false },
      { name: 'Type2', selected: false },
      { name: 'Type3', selected: false },
    ];
    this.updatedColumns = this.columnsClone;
  }

  selectAllTypes(): void {
    this.updatedColumns.forEach((col) => {
      col.selected = this.isAllSelected;
    });
  }

  onCheckboxChange(): void {
    this.isAllSelected = this.filteredColumns.every(
      (col) => col.selected,
    );
  }

  handleCancel(): void {
    this.updatedColumns = this.columnsClone;
    this.searchText = '';
  }

  handleApply(): void {
    this.applyChanges.emit(this.updatedColumns);

    this.handleCancel();
  }
}
