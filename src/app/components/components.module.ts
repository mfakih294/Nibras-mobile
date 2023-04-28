import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms';

import { NibrasListComponent } from './nibras-list/nibras-list.component';
import { PlainListComponent } from './plain-list/plain-list.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [NibrasListComponent, PlainListComponent, TableListComponent],
  imports: [
    CommonModule,
      FormsModule,
    IonicModule.forRoot()
  ]
  
  ,exports: [NibrasListComponent, PlainListComponent, TableListComponent]
})
export class ComponentsModule { }
