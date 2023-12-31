import { NgModule } from '@angular/core';
import { COMPONENTS } from './components/components.const';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerService } from './datepicker.service';
import { CustomTimepickerComponent } from './components/custom-timepicker/custom-timepicker.component';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/dateFormat.pipe';

@NgModule({
  declarations: [
    COMPONENTS,
    CustomTimepickerComponent,
    DateFormatPipe,
  ],
  exports: [
    CommonModule,
    COMPONENTS,
    COMPONENTS_MATERIALS,
    FlexLayoutModule,
    DateFormatPipe,
  ],
  imports: [CommonModule, FlexLayoutModule, COMPONENTS_MATERIALS],
  providers: [DatepickerService, DateFormatPipe],
})
export class SharedModule {}
