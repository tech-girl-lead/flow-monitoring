import { Component } from '@angular/core';
import { Types } from './interfaces/filter-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedTypes: Types[] = [];

  onApplyChanges(updatedTypes: Types[]) {
    this.selectedTypes = updatedTypes;
  }
}
