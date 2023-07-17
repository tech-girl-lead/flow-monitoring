import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DateRange,
  MatCalendar,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { DatepickerService } from 'src/app/shared/datepicker.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  APP_DATE_FORMATS,
  AppDateAdapter,
} from '../../constants/app-date-formats.const';
import { ExampleHeaderComponent } from './example-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatCalendar,
      useClass: MatCalendar,
    },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class CustomDatepickerComponent implements OnInit, OnDestroy {
  constructor(
    private _datepickerService: DatepickerService,
    private _fb: FormBuilder,
  ) {
    this.rangeForm = this._fb.group({
      start: [new Date()],
      end: [new Date()],
    });

    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);

    this.rangeForm.patchValue({
      end: this.startDate,
      start: this.endDate,
    });
  }
  showInputs = true;
  // selectedDate: string | null = null;
  selectedDate: Date | null = null;
  formattedDate: string | null = null;

  private subscription: Subscription | null = null;
  openDatepicker(): void {
    this.showInputs = false;
  }

  formatDate(date: Date): string {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear()
    );
  }

  rangeForm: FormGroup;
  startDate!: Date;
  endDate!: Date;

  onDateChange(event: MatDatepickerInputEvent<DateRange<Date>>) {
    if (event.value?.start && event.value.end) {
      this.rangeForm.setValue({
        start: event.value.start,
        end: event.value.end,
      });
    }
  }

  updateDateRange() {
    this.rangeForm.patchValue({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  single = true;
  exampleHeader = ExampleHeaderComponent;

  ngOnInit(): void {
    const now = new Date();

    this.selectedDate = now;
    this._datepickerService.selectedDate = now.toISOString();

    this.updateFormattedDate();

    this.subscription = this._datepickerService
      .onSelectedDateChange()
      .subscribe((date: string | null) => {
        this.selectedDate = date ? new Date(date) : this.selectedDate;
        this.updateFormattedDate();
        this._datepickerService.formattedDate = this.formattedDate;
      });
  }
  //make the input field of header  format dd//MM/YYYY
  updateFormattedDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    this.formattedDate = this.selectedDate
      ? new Intl.DateTimeFormat('en-GB', options).format(
          this.selectedDate,
        )
      : null;
  }
  updateSelectedDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    const dateString = selectedDate
      ? selectedDate.toISOString()
      : null;
    this._datepickerService.selectedDate = dateString;

    this.updateFormattedDate();
    this._datepickerService.formattedDate = this.formattedDate;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
