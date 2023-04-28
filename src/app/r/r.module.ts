import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RPage } from './r.page';
import { ComponentsModule } from '../components/components.module';
import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';
import { Storage } from '@ionic/storage';


const routes: Routes = [
  {
    path: '',
    component: RPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [RPage]
})
export class RPageModule {

}


