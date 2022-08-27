import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular'
import { FormsModule } from '@angular/forms';

import { NibrasListComponent } from './nibras-list/nibras-list.component';

@NgModule({
  declarations: [NibrasListComponent],
  imports: [
    CommonModule,
      FormsModule,
    IonicModule.forRoot()
  ]
  
  ,exports: [NibrasListComponent]
})
export class ComponentsModule { }
