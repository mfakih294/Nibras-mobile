import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Autostart } from '@ionic-native/autostart/ngx';


import { ViewEncapsulation, Input, ViewChild } from '@angular/core';
import {  IonInput } from '@ionic/angular';

//import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChild('searchBar', {static: true}) searchInput: IonInput;

  public appPages = [
    //{
    //  title: 'Home',
    //  type: 'home',
    //  url: '/home',
    //  icon: 'home'
    //},
     //
     //{
     //  title: 'Opr',
     //  type: 'O',
     //  url: '/o',
     //  icon: 'search'
     //},
      {
          title: 'Notes',
          type: 'N',
          url: '/n',
          icon: 'clipboard'
      },
      {
          title: 'Writings',
          type: 'W',
          url: '/w',
          icon: 'clipboard'
      },
{
      title: 'Plans',
      type: 'P',
      url: '/p',
      icon: 'alarm'
    },
    // {
    //   title: 'Todo',
    //   type: 'Todo',
    //   url: '/todo',
    //   icon: 'checkmark'
    // },
    {
      title: 'Tasks',
      type: 'T',
      url: '/t',
      icon: 'checkmark'
    },
    // {
    //   title: 'Calendar',
    //   type: 'Cal',
    //   url: '/cal',
    //   icon: 'checkmark'
    // },
	  
  
	  {
      title: 'Goals',
      type: 'G',
      url: '/g',
      icon: 'flag'
    },

      {
      title: 'Journal',
      type: 'J',
      url: '/k',
      icon: 'clock'
    },
	{
      title: 'Resources',
      type: 'R',
      url: '/r',
      icon: 'book'
    }

    //,
    //{
  //title: 'Excerpts',
  //type: 'E',
  //url: '/e',
  //icon: 'bookmark'
//}
  //    ,
	// {
  //     title: 'Articles',
  //     type: 'Art',
  //     url: '/art',
  //     icon: 'bookmarks'
  //   } 
	// ,	 
	// {
  //     title: 'News',
  //     type: 'Nws',
  //     url: '/nws',
  //     icon: 'logo-rss'
  //   } 

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private autostart: Autostart
    //private backgroundMode: BackgroundMode
  ) {
    this.initializeApp();


    

    
  }

    focusOnSearch(){
        this.searchInput.setFocus();
    }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
      this.autostart.enable();
      //this.backgroundMode.enable();
      //this.backgroundMode.setEnabled(true);
      //  console.log('is active ' , this.backgroundMode.isEnabled()); // => boolean
      //  this.backgroundMode.overrideBackButton();
    });
  }
}
