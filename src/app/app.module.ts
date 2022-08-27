import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';



import { FileOpener } from "@ionic-native/file-opener/ngx";

// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

// import { HttpModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ComponentsModule } from './components/components.module';
//import { NibrasListComponent } from './components/nibras-list/nibras-list.component';
import { Autostart } from '@ionic-native/autostart/ngx';
//import { NtableComponent } from './ntable/ntable.component';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ExampleModalPageModule } from './example-modal/example-modal.module';

import { MultipleDocumentsPicker } from '@awesome-cordova-plugins/multiple-document-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
 //   NtableComponent,
  ComponentsModule,
  IonicModule.forRoot(), 
      IonicStorageModule.forRoot(),
  AppRoutingModule,
  ExampleModalPageModule
], 
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    Autostart,
     File,
     FileOpener,
      HTTP,
     InAppBrowser,
      MultipleDocumentsPicker,
    // AndroidPermissions,
     Clipboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
//