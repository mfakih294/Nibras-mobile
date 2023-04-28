import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NgCalendarModule  } from 'ionic2-calendar';

import { ComponentsModule } from '../components/components.module';

import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';
import { PlainListComponent } from '../components/plain-list/plain-list.component';
import { TableListComponent } from '../components/table-list/table-list.component';


import { HomePage } from './home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    ComponentsModule,

    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
