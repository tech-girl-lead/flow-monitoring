import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { DashboardFilterModalComponent } from './components/dashboard-filter-modal/dashboard-filter-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    DashboardFilterModalComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule,
    COMPONENTS_MATERIALS,
  ],
})
export class HomeModule {}
