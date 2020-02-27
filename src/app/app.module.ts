import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AddBirthdaysPage} from '../pages/add-birthdays/add-birthdays'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BirthdayProvider } from '../providers/birthday/birthday';
import { SQLite } from '@ionic-native/sqlite';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMS } from '@ionic-native/sms';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddBirthdaysPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddBirthdaysPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SMS,
    SplashScreen,
    LocalNotifications,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BirthdayProvider
  ]
})
export class AppModule {}
