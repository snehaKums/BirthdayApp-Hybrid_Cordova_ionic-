import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBirthdaysPage } from './add-birthdays';

@NgModule({
  declarations: [
    AddBirthdaysPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBirthdaysPage),
  ],
})
export class AddBirthdaysPageModule {}
