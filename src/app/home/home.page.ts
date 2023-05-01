import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


//import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';
 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
 import { FormsModule } from '@angular/forms';
 import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
   import { File } from '@ionic-native/file/ngx';
 // import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { version } from '../../../package.json';

 import { ViewEncapsulation, Input, ViewChild } from '@angular/core';
 import {  IonInput } from '@ionic/angular';
 import {  IonTextarea } from '@ionic/angular';

import {ChangeDetectorRef} from '@angular/core'
import {  Screenshot } from '@ionic-native/screenshot/ngx';

import { MultipleDocumentsPicker } from '@awesome-cordova-plugins/multiple-document-picker/ngx';

import { CalendarComponent } from 'ionic2-calendar/calendar';

//import pretty from 'pretty-time'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

//import { Downloader } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
  // encapsulation: ViewEncapsulation.None
})


export class HomePage {

   @ViewChild('searchBar', {static: true}) searchBar: IonInput;
   @ViewChild('summaryInput', {static: true}) summaryInput: IonInput;

  ipA;
  ipRepo;
    allowedExtensions;
    username;
    ids = []
  //  String fullPlatform = 'android';

    currentDate = new Date();
    currentMonth: string;
    @ViewChild(CalendarComponent, {static: true}) myCalendar: CalendarComponent;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        startingDayWeek: 1
    }
    allEvents = [];
  //ipTemp = '192.168.0.102:1441/';
  //ipF;
    private downloadedFile;
  nk;

    repositoryState = 'red'
    // options

    physicalDelete = false
    collectFiles = false


    resourceNestedById = false
    resourceNestedByType = false


    lastSyncDate
    lastSyncDateTime
    lastSyncDiff
    //lastSyncDateReal


    departments = []
    modules = []

    //coverPath =  'cdvfile://localhost/persistent/' + this.file.externalRootDirectory + '/Nibras/R/19187/cover.jpg'
    covers = []
    coversPaths = []
    // new consistant fields set
    operationId;
    department;
    ecode = 'o';
    summary;
    description;
    module = 'n';
    resourceType;
    priority = '2';
    language;
    date;
    textDate;
    nbFiles = 0;
    filesList;
    //////////////////////////////////////


    totalNbFiles = 0;
  withFolder;
    withScreenshot;
  grabAll;
  nkt;
    formSummary;
    formDescription;
    formModule;
    formDate;
    formPriority = 2;

  nkd;
  nktype = 'n';

  //public nbFiles = 0;
    public files2: string[] = [];


  selectedFiles: string[] = [];


  nklog = '';
  searchTerm = '';
  items = [];

  itemsMega = [];
    public filesToDownload = [];
    public filesToDownloadTotal = 0;
    public   progress = 1;
    public filesProcessed = 0
  //itemsR = [];
  //itemsJ = [];
  //itemsP = [];
  //itemsW = [];
  //itemsN = [];
  //itemsG = [];
  //
  //itemsE = [];

  searchItems = [];
  nklogt = '';

  isOffline = true;
    status = 'offline';
    repoStatus = 'offline';
  tosyncText;
  // public version: string = version;
  
  //PreviewAnyFile: any;


    appTypes = [];



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
         {
           title: 'Events',
           type: 'V',
           url: '/v',
           icon: 'checkmark'
         },
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



    loading: any;

  constructor(private http: HttpClient,  private file: File,
              private httpp: HTTP,
              //private downloader: Downloader,
        //      private sqlite: SQLite,
              private changeRef: ChangeDetectorRef,
              private multipleDocumentsPicker: MultipleDocumentsPicker,
    private iab: InAppBrowser,
public platform: Platform,
    public alertController: AlertController,
    private screenshot: Screenshot,
              //private render: Renderer, private elementRef: ElementRef,
    // private fileOpener: FileOpener,
//private androidPermissions: AndroidPermissions,
    private storage: Storage,
              public dms: DomSanitizer,
              private localNotifications: LocalNotifications ){

    // Schedule a single notification

    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      // console.log('Directory doesnt exist'));
      //const textarea = ref(IonTextarea);


   //   this.bNkinput = bNkinput;


      /*
      //db =
          this.sqlite.create({
          name: 'datanibras.db',
          location: 'default'
      }).then((db: SQLiteObject) => {
              db.executeSql('create table danceMoves(name VARCHAR(32))', [])
                  .then(() => console.log('Executed SQL'))
                  .catch(e => console.log(e));

              db.close();

          })
          .catch(e => console.log(e))

*/

      //console.log('cover path', this.coverPath)


      this.checkRepo()






              if(this.platform.is('android')) {

          this.file.checkFile(this.file.externalRootDirectory,  'Nibras').then(_ => {}).catch(err => {

              this.file.createDir(this.file.externalRootDirectory, 'Nibras', false).catch(err => {
                  //document.getElementById('connectionLog').innerHTML  = 'Error creating the folder Nibras: ' + err.message;
                  //console.log('Error creating the folder Nibras2');
              }).then(_ => {

// todo for each
                  for (let t of ['R', 'T', 'J', 'P', 'W', 'N', 'G']) {
                      this.file.createDir(this.file.externalRootDirectory + '/' + 'Nibras', t, false).catch(err => {
                          //document.getElementById('connectionLog').innerHTML = 'Error creating the folder ' + t + ' in Nibras ' + err.message;
                          //console.log('Error creating the folder ' + t + ' in  Nibras');
                      })
                  }
              })
          })

          this.file.checkFile(this.file.externalRootDirectory,  'New').then(_ => {}).catch(err => {
      this.file.createDir(this.file.externalRootDirectory, 'New', false).catch(err => {
          //document.getElementById('connectionLog').innerHTML  = 'Error creating the folder New: ' + err.message;
          //console.log('Error creating the folder New');
      })
      })

      }

      this.rebuildItems()


      this.appTypes = [
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
          //{
          //    title: 'Excerpts',
          //    type: 'E',
          //    url: '/e',
          //    icon: 'bookmark'
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


      this.storage.get('lastSyncDate').then(val => {
      this.lastSyncDate = val
    });
  this.storage.get('lastSyncDateTime').then(val => {
      this.lastSyncDateTime = val
      //this.storage.get('lastSyncDiff').then(val => {
      this.lastSyncDiff = formatDistanceToNowStrict(Date.parse(this.lastSyncDateTime)) + ' ago'
      //});
    });



      this.storage.get('nklog').then(val => {
      this.nklog = val
    });

    //this.storage.get('withFolder').then(val => {
    //  this.withFolder = val
    //});

    this.storage.get('formSummary').then(val => {
      this.summary = val
    });

    this.storage.get('formDescription').then(val => {
      this.description = val
    });


    this.storage.get('formDate').then(val => {
      this.date = val
    });


 this.storage.get('formModule').then(val => {
  if (!val || val == 'null' || val == null){
      this.module = 'n'
  }
  else {
  this.module = val
  this.storage.set('formModule', 'n')
  }
    });

      this.storage.get('username').then((val) => {
          // console.log('ipa 0: ' + val)
          if (!val || val == 'null' || val == '' || val == null) {
              // console.log('here1111 0: ' + val)
              this.username = '*'
              //this.ipTemp = '192.168.0.11:1441/nibras'
          } else {
              // this.ipA = 'localhost/nibras'
              this.username = val;
              //this.ipTemp = val;
          }

      })


this.appTypes.forEach((t) =>{
    this.storage.get('mytext' + t.type).then((val) => {
        this.itemsMega[t.type] = val.sort( (a,b) => (a.id < b.id) ? 1 : -1);
    });
});




      // this.storage.get('ipF').then((val) => {
    //   this.ipF = val;
    // });

    this.storage.get('ipRepo').then((val) => {
        // console.log('ipa 0: ' + val)
        if (!val || val == 'null' || val == '' || val == null) {
            // console.log('here1111 0: ' + val)
            //this.ipRepo = 'localhost:1441/'
            //this.ipTemp = '192.168.0.11:1441/nibras'
        } else {
            // this.ipA = 'localhost/nibras'
            this.ipRepo = val;
            //this.ipTemp = val;
        }

    })

  this.storage.get('allowedExtensions').then((val) => {
        // console.log('ipa 0: ' + val)
        if (!val || val == 'null' || val == '' || val == null) {
            // console.log('here1111 0: ' + val)
            this.allowedExtensions = '*'
            //this.ipTemp = '192.168.0.11:1441/nibras'
        } else {
            // this.ipA = 'localhost/nibras'
            this.allowedExtensions = val;
            //this.ipTemp = val;
        }

    })


      this.storage.get('departments').then((val) => {
          if (val){
              this.departments = val
          }

          else {
              this.storage.set('departments', [])
          }
      });

   this.storage.get('modules').then((val) => {
          if (val){
              this.modules = val
          }

          else {
              this.storage.set('modules', [])
          }
      });


 this.storage.get('ipA').then((val) => {
      // console.log('ipa 0: ' + val)
       if (!val || val == 'null' || val == '' || val == null){
        // console.log('here1111 0: ' + val)
       // this.ipA = 'localhost:1441/'
       //this.ipTemp = '192.168.0.11:1441/nibras'
       } else {
           // this.ipA = 'localhost/nibras'
           this.ipA = val;
           //this.ipTemp = val;
       }

   
  //  this.ipA = 'localhost/nibras'
  //  this.storage.set('ipA', 'localhost/nibras')

    if(this.platform.is('android')) {

        this.file.createFile(this.file.externalRootDirectory + '/Nibras/', 'reader-log.txt', true).catch(err => {
            document.getElementById('logAreaNotes').innerHTML = 'Error creating the log file.' + err.message;
            console.error(err);
        })

    }


    //this.refresh()
    //this.syncData()
        //if(this.platform.is('android')) {
        //    this.moveFiles();
        //}


      //  this.countNewFiles();


   // this.syncAll();

    }).catch(()=> {
      //console.log('===================error catch' )
      // this.ipA = 'localhost:1441/'
      //this.storage.set('ipA', 'localhost:1441/')
    }).then( ()=>{
     /////

this.updateDepartments()


  this.updateTypes()


  this.summaryInput.setFocus()




             ////
 });


  //    var subPart
  //    if (this.ipRepo.indexOf(':') != -1)
  //        subPart = this.ipRepo
  //    else
  //        subPart = this.ipRepo + ':1441/nibras/'
  //
  //
  //
  //    var link = "https://" + this.ipA + "/page/heartbeatJson"
  //
  //  this.http.get(link,{}).subscribe(response => {
  //    if (response['result'] == 'ok')
  //    //document.getElementById('logAreaNotes').innerHTML =   'Nibras PKM online';
  //    document.getElementById('connectionLog').innerHTML =   'Nibras PKM online';
  //    this.isOffline = false
  //          this.status = 'online'
  //      //    this.syncDone();
  //    //console.log ('res' + response['result'])
  //  },
  //  err => {
  //  //document.getElementById('logAreaNotes').innerHTML =   'Nibras Desktop  offline';
  //  document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline';
  //      //if(this.platform.is('android')) {
  //      //    this.syncData();
  //      //}
  //    //  this.status = 'offline'
  //// this.ipA = '192.168.0.11:1441/nibras'
  //
  //
  //  })


   this.storage.get('tosyncText').then((val) => {
      if (val){
        this.tosyncText = val
      } else {
        this.storage.set('tosyncText', [])
      }
      });

     //setTimeout(() =>  {
  //    if(this.platform.is('android')) {
  //        this.moveFilesJob();
  //    }
     //}, 1000);



   //   this.syncData()

      this.checkRepo();

      setInterval(()=> {
          this.lastSyncDiff = formatDistanceToNowStrict(Date.parse(this.lastSyncDateTime)) + ' ago'
          this.checkRepo()
          }, 30000);

     // todo: enable again
   //  setInterval(()=> { this.countNewFiles();}, 12000);
   //  setInterval(()=> {this.syncData();

         //var link = "https://" + this.ipA + "/page/heartbeatJson"

         //this.http.get(link,{}).subscribe(response => {
         //    if (response['result'] == 'ok')
    //             this.syncFiles();
    //     })



    //     this.moveFilesJob();

     //}, 140000);


      //this.storage.get('covers').then((val) => {
      //    this.covers = val
      //})





    if(this.platform.is('android')) {
        this.storage.forEach((value, key, index) => {
            if (key.startsWith('c-')) {
//let data = Buffer.from(JSON.stringify(value)).toString('base64')
////////////////////

                this.file.checkFile(value + '/', 'cover.jpg').then(_ => {
                    this.file.readAsDataURL(value + '/', 'cover.jpg').then(data => {
                        //this.covers[parentDirectory.toLong()] = this.dms.bypassSecurityTrustUrl(data); // "data:image/jpeg;base64," +
                        this.covers[key.substring(2)] = this.dms.bypassSecurityTrustUrl(data)
                        //console.log('Ok cover data ');
                        //this.changeRef.detectChanges()
                    }).catch(err => {
                        console.error('Cover error', err)
                    });
                })


                ////////////////


                //this.covers[key.substring(2)] = (value);
                //console.log('Loaded a cover with id ', key.substring(2), ' with path ', value);
                //console.log('found cover ', key.substring(2), );
            }

        })
    }

} // end of constructor


    onViewTitleChanged(title: string) {
        this.currentMonth = title;
    }


    moduleChange(){

let name = this.modules.filter(rows => rows.id == this.module.toUpperCase())[0].name.toLowerCase();

        document.getElementById('addOperation').innerHTML = '<span style="color: black">' + '</span>Add <span style="color: darkgreen; font-weight: bold;">' + name + '</span> with priority <span style="color: darkgreen; font-weight: bold;">' + this.priority  + '</span>' + (this.department ? ' and department <span style="color: darkgreen; font-weight: bold;">' + this.department.toUpperCase() +'</span>': '');
        this.summaryInput.setFocus();
    }

    rebuildItems(){


        console.log('Inside rebuild items...');

        //document.getElementById('addOperation').innerHTML = '<br/><span style="color: darkgreen">' + 'Add note with priority ' + this.priority;


        this.items = []
        this.storage.forEach((value, key, index) => {
            if (key.startsWith('r-'))
                this.items.unshift(value)
            //console.log('found key ', key);
        })

        //this.covers = []
    }






refresh(){

    this.clearLog()
    this.ids = []

    const channel1 = {
        id: 'filesCount',
        name: 'Files count'
    }

    const channel2 = {
        id: 'planner',
        name: 'Planner'
    }

    //LocalNotifications.createChannel(channel1)
    //LocalNotifications.createChannel(channel2)


    /*
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  );
  */

    //this.storage.forEach((value, key, index) => {
    //    if (key.startsWith('r-'))

        //console.log('found note ', key, ' value ' , value);
    //})



    //this.clearAllForm()

    this.selectedFiles = []
    this.allEvents = []


    //itemsR = [];


    //this.rebuildItems()

    //setTimeout(() =>  {
    //if(this.platform.is('android')) {
    //    this.countNewFiles();
    //}
    //}, 30000);


  //  console.log('refresh clicked...  1')


    var subPart
    if (this.ipRepo.indexOf(':') != -1)
        subPart = this.ipA
    else
        subPart = this.ipA + ':1441/nibras/'


    this.storage.get('ipA').then((val) => {
    this.ipA = val;
    var link = "https://" + subPart + "/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => { // todo, later, to speed responce. .pipe(timeout(2)
      if (response['result'] == 'ok')
      //document.getElementById('connectionLog').innerHTML =   'Nibras Desktop online';
            document.getElementById('connectionLog').innerHTML = '<br/><span style="color: darkgreen">' + 'Nibras Desktop online</span><br/>';
         //   this.syncDone()

      this.isOffline = false
            this.status = 'online'

            this.storage.get('username').then((val) => {
                // console.log('ipa 0: ' + val)
                if (!val || val == 'null' || val == '' || val == null) {
                    // console.log('here1111 0: ' + val)
                    this.username = '*'
                    //this.ipTemp = '192.168.0.11:1441/nibras'
                } else {
                    // this.ipA = 'localhost/nibras'
                    this.username = val;
                    //this.ipTemp = val;
                }

            })


            //console.log('before syncdone, username ', this.username)

            //setTimeout(() =>  {
            //this.syncDone()
            //}, 5000);



            this.storage.get('ipRepo').then((val) => {
                this.ipRepo = val;

                var subPart
                if (this.ipRepo.indexOf(':') != -1)
                    subPart = this.ipRepo
                else
                    subPart = this.ipRepo + ':1441/files/'



                var link2 = "https://" + subPart + "/keep.json" // .replace('files', '')
// todo: fix, always offline


                this.http.get(link2,{}).subscribe(response => { // todo, later, to speed responce. .pipe(timeout(2)
                        if (response['result'] == 'ok')
                        //document.getElementById('connectionLog').innerHTML +=   'File Repository online';
                            document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkgreen">' + 'File Repository online</span><br/>';

                        this.syncData(); // test, new, for faster responce
                        //this.syncDone()

                        this.isOffline = false
                        this.repoStatus = 'online'
                        this.changeRef.detectChanges()
                        //console.log ('res' + response['result'])
                    },
                        err => {
                        //document.getElementById('connectionLog').innerHTML +=   'File repository offline. '  + err.message;
                        //document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkred">' + 'File Repository offline</span><br/>';
                        //this.syncDone();
                        this.isOffline = true
                        this.repoStatus = 'offline'
                        this.changeRef.detectChanges()
                    })
            })


            //console.log ('res' + response['result'])
    },
    err => {               
     //document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline'//  + err.message;
        document.getElementById('connectionLog').innerHTML = '<br/><span style="color: darkred">' + 'Nibras Desktop offline</span><br/>';
     this.syncData();
     this.isOffline = true
        this.status = 'offline'
    })
  })



    //this.countNewFiles();


  // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGEs.androidPermissions.PERMISSION.GET_ACCOUNTS]);
}


    syncFiles() {

        this.clearLog()


        //this.syncData()

    setTimeout(() =>  {
        //this.filesToDownload = [];
        this.filesToDownloadTotal = 0;
        this.progress = 0;
        this.filesProcessed = 0


        console.log('In syncFiles()...')

        document.getElementById('connectionLog').innerHTML += ('<br/>Syncing files...<br/>');


        var subPart
        if (this.ipRepo.indexOf(':') != -1)
            subPart = this.ipRepo
        else
            subPart = this.ipRepo + ':1441/files/'



        let recordsFiles = []
        for (let t of ['T', 'J', 'P', 'W', 'N', 'G']) {
            this.storage.get('mytext' + t).then((val) => {
                for (var e of val) {

                    //console.log('In sync file: record ' + t + ' ' + e.id)
                    if (e.filesList) {
                        //console.log('In sync file: record ' + t + ' ' + e.id + ' has files: ' + e.filesList)
                        for (var f of e.filesList.split('\n')) {
                            // to do comment out
                            console.log('Found for id ' + e.id + ', file ' + f.split('|')[0])

                            //document.getElementById('connectionLog').innerHTML += ('Downloading: ' + f.split('|')[0] + '<br/>');

                            //document.getElementById('connectionLog').innerHTML += ('at url : ' + "https://" + this.ipRepo + '/' + t + '/' + e.id + "/" + f.split('|')[0] + '<br/>');
                            this.filesToDownloadTotal++




                            this.filesToDownload.push(["https://" + subPart + '/' + t + '/' + e.id + "/" + encodeURIComponent(f.split('|')[0]),
                                e.id,
                                f.split('|')[0],
                                f.split('|')[1],
                                f.split('|')[0].split('.')[1],
                                t])

                            recordsFiles.push(f.split('|')[0])
                            /*this.download("https://" + this.ipRepo + '/' + t + '/' + e.id + "/" + encodeURIComponent(f.split('|')[0]),
                             e.id,
                             f.split('|')[0],
                             f.split('|')[1],
                             f.split('|')[0].split('.')[1],
                             t);
                             // .replace('nibras', 'files')
                             */

                        }
                        //console.log('record ' , t , ' of id ', e.id , ' has files ', recordsFiles.join(','))


                        //if(this.platform.is('android')) {
                        //    setTimeout(() =>  {
                        //console.log('ids in ', type , ' are ' , ids.join(','))
                        //this.clearFolder('/Nibras/' + t, e.id.toString(), recordsFiles)
                        //}, 6 * 1000);
                        //}


                        recordsFiles = []
                    }
                }
            });
        }



        for (let t of ['R']) {
            this.storage.get('mytext' + t).then((val) => {
                recordsFiles = []
                for (var e of val) {
                    console.log('In sync file: record R ' + t + ' ' + e.id)
                    if (e.filesList) {
                        //console.log('In sync file: record ' + t + ' ' + e.id + ' has files: ' + e.filesList)
                        //document.getElementById('connectionLog').innerHTML += '*';
                        //    document.getElementById('connectionLogEnd').scrollIntoView({behavior: 'smooth'});
                        for (var f of e.filesList.split('\n')) {
                            //document.getElementById('connectionLog').innerHTML += '<br/>' + 'Downloading: ' + "https://" + this.ipRepo + '/' + t + '/' + e.resourceType + '/' + Math.floor(e.id/100).toString() + '' +
                            //this.filesToDownload.push(["https://" + this.ipRepo + '/' + t + '/' +
                            //'/' + e.id + "/" + encodeURIComponent(f.split('|')[0])  + '<br/>';;
                            this.filesToDownloadTotal++
                            this.filesToDownload.push(["https://" + subPart + '/' + t + '/' +
                            (this.resourceNestedByType ? e.resourceType + '/' : '') +
                            (this.resourceNestedById ? Math.floor(e.id / 100).toString() + '/' : '') +
                            //'' +
                                //this.filesToDownload.push(["https://" + this.ipRepo + '/' + t + '/' +
                            '/' + e.id + "/" + encodeURIComponent(f.split('|')[0]), //todo encodeURIComponent...
                                e.id,
                                f.split('|')[0],
                                f.split('|')[1],
                                f.split('|')[0].split('.')[1],
                                t]);
                            /*this.download("https://" + this.ipRepo + '/' + t + '/' + e.resourceType + '/' + Math.floor(e.id/100).toString() + '' +
                             '/' + e.id + "/" + encodeURIComponent(f.split('|')[0]), //todo encodeURIComponent...
                             e.id,
                             f.split('|')[0],
                             f.split('|')[1],
                             f.split('|')[0].split('.')[1],
                             t);

                             */

                            recordsFiles.push(f.split('|')[0])

                        }
                        //console.log('record ' , t , ' of id ', e.id , ' has files ', recordsFiles.join(','))
                        //this.clearFolder('/Nibras/' + t, e.id.toString(), recordsFiles)
                        // todo: above line temporarily off
                        recordsFiles = []
                    }
                }
            });
        } // end of R

        //this.syncData();
        //document.getElementById('connectionLog').innerHTML += ('<br/>Before downloading...<br/>');

        //console.log('files to download 0' , this.filesToDownload)

        setTimeout(() => {
            this.downloadFilesList();
        }, 4000);


        document.getElementById('connectionLogEnd').scrollIntoView({behavior: 'smooth'});
        //   this.filesToDownloadTotal = this.filesToDownload.length


    }, 4000)


    } // end of syncFiles

    downloadFilesList(){
        //console.log('files to download 1' , this.filesToDownload)
        let file = this.filesToDownload.pop()
        //console.log('files to download 2' , this.filesToDownload)
        //console.log('Current file', file)
        document.getElementById('connectionLog').innerHTML += ('<br/>Downloading start...<br/>');
        this.download(file[0],file[1],file[2],file[3],file[4],file[5])
        //this.filesProcessed++
        //this.progress = this.filesProcessed * 100 / this.filesToDownload.length
            //.then(res=> {
        //this.downloadFilesList();
        //});
    }

 download(url, parentDirectory, filename, size, ext, type) {


     //document.getElementById('connectionLog').innerHTML += ('<br/>Inside dwl: ' + url);

     this.filesProcessed++
     this.progress = this.filesProcessed / this.filesToDownloadTotal;

     /*

      {{filesToDownload.length}} files to check.

      {{filesProcessed}}
      */

this.changeRef.detectChanges()
    var url = url;
    this.httpp.setServerTrustMode('nocheck');
    //this.httpp.setRequestTimeout(600000);

//console.log('files to download', this.filesToDownload)
    //
    //
    //await this.httpp.sendRequest(url, {method: "get", timeout: 600000,  responseType: 'arraybuffer'}).then( //responseType: "arraybuffer",
    //        httpResponse => {
    //        console.log("File dowloaded successfully ", filename)
    //        document.getElementById('connectionLog').innerHTML = 'File dowloaded successfully: ' + filename;
    //        //document.getElementById('logArea').innerHTML = 'ile dowloaded successfully.' + filename;
    //        this.downloadedFile = new Blob([httpResponse.data], {type: 'application/' + ext});
    //        //document.getElementById('logArea').innerHTML  = ' the folder to be:' + parentDirectory.toString();
    //        this.createParent(parentDirectory.toString(), filename, type);
    //        this.createFile(parentDirectory.toString(), filename, type);
    //        this.writeToFile(parentDirectory.toString(), filename, type);
    //
    //    }
    //).catch(err => {
    //        console.log('Error downloading: ', filename ); // , err.error
    //        document.getElementById('connectionLog').innerHTML = 'Error downloading: ' + filename;
    //        //console.error(err);
    //    })

     //+ type + '/' + parentDirectory + '/' + filename

     console.log('inside download: ', filename);


     // generating coversw

     if (filename == 'cover.jpg') {

         //console.log('Generating covers for parent', parentDirectory)
         document.getElementById('connectionFileLog').innerHTML = '<span style="color: #c6a668">' + 'Found cover for ' + parentDirectory + '</span>' + '...';
         this.file.checkFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory + '/', 'cover.jpg').then(_ => {
             this.file.readAsDataURL(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory + '/', 'cover.jpg').then(data => {
                 //this.covers[parentDirectory.toLong()] = this.dms.bypassSecurityTrustUrl(data); // "data:image/jpeg;base64," +

                 this.covers[parentDirectory] = this.dms.bypassSecurityTrustUrl(data)

                 this.storage.set('c-' + parentDirectory, this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory).then(val => {

                     //console.log('Saved cover data ', parentDirectory, ' with path ', val);
                 });
                 //console.log('Ok cover data ');
                 //this.changeRef.detectChanges()
             }).catch(err => {
                 console.log('Cover error', err)
             });
         })

     }

//console.log('before create parent')

     this.createParent(parentDirectory.toString(), filename, type).then(res=> {

            //this.createFile(parentDirectory.toString(), filename, type);

                this.file.createFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename, true).then(res=> {


         this.file.checkFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/', filename).then(_ => {
                 //console.log('File exists', filename, ' checking file size')

                 this.file.resolveLocalFilesystemUrl(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + encodeURIComponent(filename)).then(
                     (file) => {
                         file.getMetadata((meta) => {
                                 //console.log('in resolving ', meta.size, ' ', filename, this.allowedExtensions )
				 //document.getElementById('connectionLog').innerHTML += '*';
                  //               document.getElementById('connectionLogEnd').scrollIntoView({behavior: 'smooth'});
                                 if (meta.size != size && (this.allowedExtensions == '*' || this.allowedExtensions.indexOf(filename.split('.').pop()) != -1)) { // download again, duplicate code, todo


// duplicate code, fix
                                 //    document.getElementById('connectionLog').innerHTML += '<br/>' + 'Downloading: ' + filename + '...' + '<br/>';
				                                                  document.getElementById('connectionFileLog').innerHTML = '<br/><span style="color: #c6a668">' + 'Downloading: </span>' + url + '...<br/>';
                                     //document.getElementById('connectionLogEnd').scrollIntoView({behavior: 'smooth'});
                                     //console.log('Downloading: ', filename, ' with ext ', filename.split('.').pop(), ' and allowed ext. ', this.allowedExtensions)
                                     this.httpp.downloadFile(url, {}, {
                                             'method': "get",
                                             'timeout': '60',
                                             'responseType': 'arraybuffer'
                                         },
                                         this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + encodeURIComponent(filename)).then( //responseType: "arraybuffer",
                                             httpResponse => {
                                             console.log("Dowloaded successfully ", filename)
                                             document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkgreen">' + 'Downloaded: </span>' + filename + '.<br/>';
                                                 document.getElementById('connectionFileResultLog').scrollIntoView({behavior: 'smooth'});


                                                 let file = this.filesToDownload.pop()
                                                 this.download(file[0],file[1],file[2],file[3],file[4],file[5])

                                                 //.then(res=> {
                                                 //this.downloadFilesList();

                                             //document.getElementById('logArea').innerHTML = 'ile dowloaded successfully.' + filename;
                                             //this.downloadedFile = new Blob([httpResponse.data], {type: 'application/' + ext});
                                             //document.getElementById('logArea').innerHTML  = ' the folder to be:' + parentDirectory.toString();
                                             //this.createParent(parentDirectory.toString(), filename, type);
                                             //this.createFile(parentDirectory.toString(), filename, type);
                                             //this.writeToFile(parentDirectory.toString(), filename, type);

                                         }
                                     ).catch(err => {

                                             console.log('Error downloading: ', filename, ' in record ', parentDirectory, err.error)
                                             console.error(err.status, err.error, filename);


                                             document.getElementById('connectionLog').innerHTML += '<br/>' + 'Error downloading: ' + filename + ' in record ' + parentDirectory + ' with url: ' + url;

                                             let file = this.filesToDownload.pop()
                                             this.download(file[0],file[1],file[2],file[3],file[4],file[5])


                                             //console.error(err.status);
                                             //console.error(err.message);
                                             //console.error(err);
                                             //console.error(err.toString());
                                         })


                                 }
                                 else {
                                     //document.getElementById('connectionLogEnd').scrollIntoView({behavior: 'smooth'});
                                     let file = this.filesToDownload.pop()
                                     this.download(file[0],file[1],file[2],file[3],file[4],file[5])
                                 }
                             }
                         )
                     });
             }
         ).catch(err => {
                 console.log('File does not exist. Proceeding to download it...', filename)
                 // duplicate code, fix
                 //this.createParent(parentDirectory.toString(), filename, type).then(_ => {
// todo: need to create the file firrst?!
                 this.file.createFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename, true).then(res => {
                     //

                     //    console.log('in resolving ', meta.size, ' ', filename, this.allowedExtensions )
                         if (this.allowedExtensions == '*' || this.allowedExtensions.indexOf(filename.split('.').pop()) != -1) { // download again, duplicate code, todo
                             document.getElementById('connectionFileLog').innerHTML = '<span style="color: #c6a668">' + 'Downloading: </span>' + filename + '...';


                             console.log('Downloading: ', filename)
                             this.httpp.downloadFile(url, {}, {
                                     'method': "get",
                                     'timeout': '60',
                                     'responseType': 'arraybuffer'
                                 },
                                 this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + filename).then( //responseType: "arraybuffer",
                                     httpResponse => {
                                     console.log("File dowloaded successfully ", filename)
                                     document.getElementById('connectionFileLog').innerHTML = '<br/>' + 'File downloaded successfully: ' + filename + '<br/>';

                                         let file = this.filesToDownload.pop()
                                         this.download(file[0],file[1],file[2],file[3],file[4],file[5])


                                         //document.getElementById('logArea').innerHTML = 'ile dowloaded successfully.' + filename;
                                     //this.downloadedFile = new Blob([httpResponse.data], {type: 'application/' + ext});
                                     //document.getElementById('logArea').innerHTML  = ' the folder to be:' + parentDirectory.toString();
                                     //this.createParent(parentDirectory.toString(), filename, type);
                                     //this.createFile(parentDirectory.toString(), filename, type);
                                     //this.writeToFile(parentDirectory.toString(), filename, type);

                                 }
                             ).catch(err => {
                                     console.log('Error downloading: ', filename, err.error);
                                     document.getElementById('connectionLog').innerHTML += '<br/>' + 'Error downloading: ' + filename + '<br/>';
                                     console.error(err.status, ' ', err.error, filename);

                                     let file = this.filesToDownload.pop()
                                     this.download(file[0],file[1],file[2],file[3],file[4],file[5])


                                     //console.error(err.status);
                                     //console.error(err.message);
                                     //console.error(err);
                                     //console.error(err.toString());
                                 })

                             //
                         }
                 }).catch(err => {
                     document.getElementById('connectionLog').innerHTML += '<br/>' + 'Error creating the file: ' + filename + '<br/>';
                     //err.message;
                     //console.error( err);
                     console.log('Error creating the file', filename);
                     let file = this.filesToDownload.pop()
                     this.download(file[0],file[1],file[2],file[3],file[4],file[5])

                 })
             }
         );



     }).catch(err => {
         document.getElementById('connectionLog').innerHTML  += 'Error creating the file: ' + filename;//err.message;
         //console.error( err);
         console.log('Error creating the file', filename);
                    let file = this.filesToDownload.pop()
                    this.download(file[0],file[1],file[2],file[3],file[4],file[5])

                })


     })


          //, error => {
          //        console.log('error resolving ', error)
          //    }
          //)
          //});
             //});
     //}).catch(err => {
     //    document.getElementById('connectionLog').innerHTML += '<br/>' + 'Error creating the folder: ' + parentDirectory + '<br/>';
         //err.message;
         //console.error( err);
         //console.log('Error creating the folder', parentDirectory);
     //});

 /*

     var request = {
         uri: url,
         title: 'MyDownload',
         description: '',
         mimeType: '',
         visibleInDownloadsUi: false,
         notificationVisibility: 0,//NotificationVisibility.VisibleNotifyCompleted,
         destinationInExternalPublicDir: {
             dirType: 'Nibras',
             subPath: 'R'
         }
     };

     this.downloader.download(request)
         .then((location: string) => console.log('File downloaded at:'+ location))
         .catch((error: any) => console.error(error));



 */

 }

    createParent(parentDirectory, filename, type) {
    //document.getElementById('logArea').innerHTML  =
    //console.log('Creating the folder:' + parentDirectory)
    return this.file.createDir(this.file.externalRootDirectory + '/Nibras/' + type + '/', parentDirectory.toString(), true).catch(err => {
        document.getElementById('connectionLog').innerHTML  += 'Error creating the folder: ' + err.message;
        console.log('Error creating the folder', filename);
    })
}
    createFile(parentDirectory, filename, type) {
       // console.log(' creating the folder:' + parentDirectory + ' ; ' + filename)
    return this.file.createFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename, true).catch(err => {
        document.getElementById('connectionLog').innerHTML  += 'Error creating the file: ' + filename;//err.message;
        //console.error( err);
        console.log('Error creating the file', filename);
    })

}

    writeToFile(parentDirectory, filename, type) {
        return this.file.writeFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename,
            this.downloadedFile,
            { replace: true, append: false }).then(createdFile => {
            //console.log('File written successfully:', filename);
            //document.getElementById('connectionLog').innerHTML  += 'File written successfully: ' + filename;
            //console.log(createdFile)
        }).catch(err => {
                console.log('** File NOT written successfully:', filename);
                document.getElementById('connectionLog').innerHTML  = '** File NOT written successfully:' + filename
            //console.error(err);
        });
    }



    async clearSync(){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to clear all the records and updates that you have entered? This action CANNOT be undone!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {


            this.storage.set('tosyncText', [])

            this.tosyncText = []

            this.storage.forEach((value, key, index) => {
                if (key.startsWith('r-') || key.startsWith('u-')) {
                    this.storage.remove(key)
                    //console.log('removed key ', key);
                }
            })




  //this.storage.set('nklog', '')
  //this.storage.set('nklogt', '')
  this.items = []

  document.getElementById('connectionLog').innerHTML  = 'All entered records have been cleared.';


          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
  let result = await alert.onDidDismiss();
  console.log(result);


  
}



change() 
{
  // <br /><i style="font-size: small">Format: .
 let v = prompt("Nibras PKM IP (<code>IP(:port)/app-name</code>, e.g.: 192.168.1.23)", this.ipA)
 if (v){
 this.ipA = v
 this.storage.set('ipA', this.ipA);
 }
 else console.log('Cancelled');    
 // todo : if cancelled, null taken!!



}
/*
changeF() 
{
 let v = prompt("Nibras Files IP", this.ipF)
 if (v){
 this.ipF = v
 this.storage.set('ipF', this.ipF);
 }
 else console.log('cancelled');    
 // todo : if cancelled, null taken!!
}

*/


saveIp2(){



    this.storage.set('ipA', this.ipA);
    //this.ipA = this.ipTemp;
    document.getElementById('connectionLog').innerHTML  = '<br/>Nibras PKM IP has been updated to ' + this.ipA + '<br/>';

    this.checkRepo()


    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
}

saveIpRepo(){

    this.storage.set('ipRepo', this.ipRepo);
    //this.ipA = this.ipTemp;
    document.getElementById('connectionLog').innerHTML  = '<br/>Nibras repository IP has been updated to ' + this.ipRepo + '<br/>';
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')

    this.checkRepo()


    this.storage.get('ipRepo').then((val) => {
        this.ipRepo = val;

        var subPart
        if (this.ipRepo.indexOf(':') != -1)
            subPart = this.ipRepo
        else
        subPart = this.ipRepo + ':1441/files/'


        var link2 = "https://" + subPart + "/keep"
// todo: fix, always offline
        this.http.get(link2,{}).subscribe(response => { // todo, later, to speed responce. .pipe(timeout(2)
                console.error('===, repo' , response , '===');
                document.getElementById('connectionFileLog').innerHTML = (response + '===');

                if (response == 'ok')
                //document.getElementById('connectionLog').innerHTML +=   'File Repository online';
                //    document.getElementById('connectionLog').innerHTML += (response + '===');
                    //document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkgreen">' + 'File Repository online</span><br/>';

                this.syncData(); // test, new, for faster responce
                //this.syncDone()

                //this.isOffline = false
                this.repoStatus = 'online'
                this.changeRef.detectChanges()
                //console.log ('res' + response['result'])
            },
                err => {

                //document.getElementById('connectionLog').innerHTML +=   'File repository offline. '  + err.message;
                //document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkred">' + 'File Repository offline</span><br/>';
                //this.syncDone();
                //this.isOffline = true
                    console.error('===, repo' , err , '===');
                this.repoStatus = 'offline'
                this.changeRef.detectChanges()
            })
    })





}
    saveAllowedExtensions(){

    this.storage.set('allowedExtensions', this.allowedExtensions);
    //this.ipA = this.ipTemp;
    document.getElementById('connectionLog').innerHTML  = '<br/>Allowed extensions has been updated to ' + this.allowedExtensions + '<br/>';
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
}
    saveUsername(){

    this.storage.set('username', this.username);
    //this.ipA = this.ipTemp;
    document.getElementById('connectionLog').innerHTML  = '<br/>Username has been updated to ' + this.username + '<br/>';
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
}


    savekWithFile(){
        this.savek()

           //document.getElementById('logArea').innerHTML  =


        let current_datetime
        if (this.nkd)
            current_datetime = new Date(this.nkd)
        else
            current_datetime = new Date()


        let date =
            current_datetime.getDate().toString().padStart(2, '0') + "." + (current_datetime.getMonth() + 1).toString().padStart(2, '0')  + "." +
            current_datetime.getFullYear() + '_' +
            current_datetime.getHours().toString().padStart(2, '0') + "" + current_datetime.getMinutes().toString().padStart(2, '0')




    }

    savekNew(){



        if (!this.summary && !this.description){
            document.getElementById('logAreaNotes').innerHTML = 'No contents to add';

        }
        else {


            let current_datetime

            if (this.date) {
                current_datetime = new Date(this.date)
                console.log('has date ', this.date)
            }
            else {
                current_datetime = new Date()
                console.log('has NO date ', this.date)
            }

            let operationId =
                current_datetime.getFullYear() + '.' +
                (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "." +
                current_datetime.getDate().toString().padStart(2, '0') + "_" +

                current_datetime.getHours().toString().padStart(2, '0') + "" + current_datetime.getMinutes().toString().padStart(2, '0')
                + "" + current_datetime.getSeconds().toString().padStart(2, '0')

            let textDate =
                current_datetime.getDate().toString().padStart(2, '0') + "." +
                (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "." +
                current_datetime.getFullYear() + '_' +
                current_datetime.getHours().toString().padStart(2, '0') + "" +
                current_datetime.getMinutes().toString().padStart(2, '0')
            //+ " " + current_datetime.getSeconds().toString().padStart(2, '0')

            this.textDate = textDate

            let record = {
                id: operationId,
                operationId: operationId,
                ecode: 'o',
                module: this.module,
                department: this.department,
                rtype: this.module == 'r' ? 'doc' : '',
                //meta: this.priority ? this.priority : 2,
                priority: parseInt(this.priority ? this.priority : '2'),
                nbFiles: this.selectedFiles.length,
                freshRecord: true,
                filesList: this.selectedFiles, // todo: in case of screenshots // this.withScreenshot ? ['screenshot.jpg'] :
                date: current_datetime,
                textDate: textDate,
                language: 'ar',
                summary: this.summary ? this.summary : 'Untitled',
                description: this.description != null ? this.description : ''
            }

            console.log('new: record' + this.summary, ' record', record);
            console.log('new: its module' + this.module);


            if(this.module == 'p'){

                    let date = current_datetime;
                    var id = this.items.length;//new Date().valueOf();
                    var title = this.summary;
                    var body = this.description;



                    this.localNotifications.schedule({
                        id: 23,
                        text: (body ? body : ''),
                        title: 'Plan now: ' + title,
                        trigger: {at: new Date(this.date)},
                        group: 'Nibras',
                        //channel: 'planner',
                        vibrate: true,
                        wakeup: true,
                        sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                        led: 'FF0000'
                        //, sound: null
                    });

                    date = current_datetime;
                    date.setTime(date.getTime() - (20 * 60000)) // - 1 hour
                    this.localNotifications.schedule({
                        id: 231,//new Date().valueOf(),
                        text: (body ? body : ''),
                        title: 'Plan in 1h: ' + title,
                        trigger: {at: date},
                        group: 'Nibras',
                        vibrate: true,
                        wakeup: true,

                        sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',

                        //channel: 'planner',
                        led: 'FF0000'
                        //, sound: null
                    });

                console.log('sch 1 h hour' + date);


                date = current_datetime;
                    date.setTime(date.getTime() - (3 * 60000)) // - 1 hour
                console.log('here in - 5 min')
                    this.localNotifications.schedule({
                        id: 2,//new Date().valueOf(),
                        text: (body ? body : ''),
                        title: 'Plan in 5min: ' + title,
                        trigger: {at: date},
                        group: 'Nibras',
                        wakeup: true,

                        sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',

                        //channel: 'planner',
                        vibrate: true,
                        led: 'FF0000'
                        //, sound: null
                    });
                }

                    //     (<HTMLInputElement>document.getElementById('nkinputt')).focus();

            this.storage.set('r-' + operationId, record).then(val => {

                this.items.unshift(val)
                //this.items = []
                //this.storage.forEach((value, key, index) => {
                //    if (key.startsWith('r-'))
                //        this.items.unshift(value)
                //    //console.log('found key ', key);
                //})

                setTimeout(() => {
                    this.clearAllForm();
                }, 1000);

                setTimeout(() => {
                     this.summaryInput.setFocus();
                }, 2000);
            });

            let summaryTemp = this.summary

            if (summaryTemp && this.withScreenshot){
                //  console.log('Folder created');
                return this.file.createDir(this.file.externalRootDirectory + '/New/', operationId + ' ' + summaryTemp, false).then(_ => {
                        //console.log('here call grab all');
                        if(this.platform.is('android')) {

                            console.log('Grabbing all files...')

                            //setTimeout(() => {

                                //this.screenshot.save('jpg', 90, 'screenshot').then(res=> {

                                    //this.selectedFiles = ['screenshot.jpg']

                                this.file.listDir(this.file.externalRootDirectory, 'New').then(
                                        res => {
                                        res.forEach((f) => { // all files
                                            if (f.isFile){//.startsWith('Screenshot')) {
                                                console.log('Found file ', f.name)
                                                this.selectedFiles.push(f.name)
                                            }
                                            else
                                                console.log('Found directory ', f.name)
                                        })
                                        });

                                        console.log('Grabbed screenshots. Ok!')

                                    //setTimeout(() => {
                                    //    this.moveFilesJob();
                            if(this.platform.is('android')) {
                                setTimeout(() => {
                                    this.grabAllMoveFilesNew(operationId + ' ' + summaryTemp)
                                    setTimeout(() => {
                                        this.selectedFiles = []
                                    }, 2000);
                                }, 2000);
                            }
                                    //}, 2000);

                                //}).catch(err=> {
                                //    console.log('error creating screenshot', err)
                                //})

                            //}, 500);
                        }

                        //setTimeout(() => {
                        //    this.clearAllForm();
                        //    this.summaryInput.setFocus();
                        //}, 2000);

                    }
                ).catch(err => {
                        document.getElementById('connectionLog').innerHTML   += '<br/>' + 'Error creating the folder' + err.message + '<br/>';
                        console.error(err.error);
                    })
            }

            if (this.summary && this.withFolder){
                //  console.log('Folder created');
                return this.file.createDir(this.file.externalRootDirectory + '/New/', operationId + ' ' + this.summary, false).then(_ => {
                            //console.log('here call grab all');
                            if(this.platform.is('android')) {
                                console.log('calling grabAllMoveFilesNew', operationId + ' ' + this.summary)
                                this.grabAllMoveFilesNew(operationId + ' ' + this.summary)
                            }

                        setTimeout(() => {
                        this.clearAllForm();
                            // //this.summaryInput.setFocus();
                            this.selectedFiles = []
                            }, 1000);
                  //setTimeout(() => {
                  //          this.summaryInput.setFocus();
                  //          }, 3000);

                    }
                ).catch(err => {
                        document.getElementById('connectionLog').innerHTML   += '<br/>' + 'Error creating the folder' + err.message + '<br/>';
                        console.error(err.error);
                    })
            } else {

                setTimeout(() => {
                    this.clearAllForm();
                }, 500);
  //setTimeout(() => {
  //                  this.summaryInput.setFocus();
  //              }, 2000);


            }


        }

    }

    focusOnAdd(){
        this.summaryInput.setFocus();
        document.getElementById('add').scrollIntoView({behavior: 'smooth'});
    setTimeout(() => {
        document.getElementById('add').scrollIntoView({behavior: 'smooth'});
              }, 500);

    }
   focusOnSearch(){
        //document.getElementById('nkinput').focus()
       this.searchBar.setFocus();
       setTimeout(() => {
           document.getElementById('search').scrollIntoView({behavior: 'smooth'});
       }, 500);

    }

 focusOnCalendar(){
        //document.getElementById('nkinput').focus()
       //this.searchBar.setFocus();
     //document.getElementById('calendar').scrollIntoView({behavior: 'smooth'});
     setTimeout(() => {
         document.getElementById('calendar').scrollIntoView({behavior: 'smooth'});
     }, 500);
    }

 focusOnSync(){
        //document.getElementById('nkinput').focus()
       //this.searchBar.setFocus();
     setTimeout(() => {
         document.getElementById('sync').scrollIntoView({behavior: 'smooth'});
     }, 500);

    }



savek(){

  //document.getElementById('nkinput').focus();

    console.log('selected in save k ', this.selectedFiles)


  this.storage.get('nklog').then(val => {
    if (!this.nk && !this.nkt){
    document.getElementById('logAreaNotes').innerHTML = 'No text to append';
   // console.log('new:' + this.nk);
    }
    else {


      let current_datetime
      if (this.nkd)
     current_datetime = new Date(this.nkd)
    else
     current_datetime = new Date()

let date =
current_datetime.getDate().toString().padStart(2, '0') + "." + (current_datetime.getMonth() + 1).toString().padStart(2, '0')  + "." +
current_datetime.getFullYear() + '_' +
current_datetime.getHours().toString().padStart(2, '0') + "" + current_datetime.getMinutes().toString().padStart(2, '0') + " " + current_datetime.getSeconds().toString().padStart(2, '0')

    this.nklog = 'A ' + (this.nktype == 'r' ? this.nktype + ' #doc' :  this.nktype ) + ' p' + (this.priority ? this.priority : 2) + ' d- (' + date +
      ' -- ' + (this.nkt ? this.nkt : 'Untitled') + ' :: \n'  + (this.nk != null ? this.nk : '') + '\n***\n'
        + val + '\n'
   //     (<HTMLInputElement>document.getElementById('nkinputt')).focus();

    this.storage.set('nklog', this.nklog)

    // document.getElementById('logAreaNotes').innerHTML = 'Note saved...'// '<b>' + 'A ' + (this.nktype == 'r' ? this.nktype + 'r #doc' :  this.nktype ) + ' p2 d- (' + date +
                                                                //' -- ' + (this.nkt ? this.nkt : 'Untitled') + ' :: \n'  + (this.nk != null ? this.nk : '') + '\n***\n' +'</b><br/>';


        if (this.nkt && this.withFolder){
            //  console.log('Folder created');
            return this.file.createDir(this.file.externalRootDirectory + '/New/' + '/', date + ' ' + this.nkt, true).then(_ => {
                    if (this.nkt && this.grabAll) {
                        //console.log('here call grab all');
                        if(this.platform.is('android')) {
                            this.grabAllMoveFiles(date + ' ' + this.nkt)
                        }
                    }

              this.clearAllForm();
                }
            ).catch(err => {
                document.getElementById('logAreaNotes').innerHTML  = 'Error creating the folder' + err.message;
                console.error(err);
            })
        } else {

            this.nk = ''
            this.nkt = ''
            this.nkd = ''
            this.priority = '2'
            this.withFolder = false
            this.grabAll = false

            this.storage.get('nk').then(val => {
                this.storage.set('nk', '')
            })

            this.storage.get('nktype').then(val => {
                this.storage.set('nktype', this.nktype)
            })
            this.storage.get('nkt').then(val => {
                this.storage.set('nkt', '')
            })

            this.storage.get('nkd').then(val => {
                this.storage.set('nkd', '')
            })



        }




        //(<HTMLInputElement>document.getElementById('nkinputt')).focus();


    }



  })

  //setTimeout(() => {
      //document.getElementById('nkinputt').focus(); document.getElementById('nkinput').focus();
     // console.log('trying to focus');
      //this.bNkinput.nativeElement.focus();
      //this.bNkinput.setFocus();
      //this.bNkinput.setFocus();
      //this.nkinput.focus();

  //     }, 1000);







} // end of savek


    clearAllForm(){
        this.summary = ''
        this.description = ''
        this.date = ''
        this.priority = '2'
        this.withFolder = false
        this.grabAll = false
        this.withScreenshot = false

        /*
        this.storage.get('summary').then(val => {
            this.storage.set('summary', '')
        })

        this.storage.get('module').then(val => {
            this.storage.set('module', this.nktype)
        })
        this.storage.get('description').then(val => {
            this.storage.set('description', '')
        })

        this.storage.get('date').then(val => {
            this.storage.set('date', '')
        })
*/

    }


    grabAllMoveFiles(subFolder){
        if(this.platform.is('android')) {
            this.file.listDir(this.file.externalRootDirectory, 'New').then(
                    res => {
                    res.forEach((f) => {
                            console.log('outside selection found: ', this.selectedFiles, ' and f.name', f.name, ' selection ', this.selectedFiles)
                            if (this.selectedFiles && this.selectedFiles.includes(f.name)) {
                                console.log('inside selection: ', this.selectedFiles, ' and f.name', f.name)
                                this.file.moveFile(this.file.externalRootDirectory + '/New',
                                    f.name, this.file.externalRootDirectory + '/New/' + subFolder,
                                    f.name).then(
                                        success => {
                                        //console.log('moved file: ', f.name);
                                        document.getElementById('connectionFileLog').innerHTML = '<br/><span style="color: #c6a668">' + 'Moving: </span>' + f.name + '...<br/>';
                                        //this.countNewFiles();
                                        //this.nbFiles = 0;

                                    },
                                        error => {
                                        console.error('error in moving selected files: ', error);
                                    }
                                ) // end of move file
                            }
                        }
                        // end of for each file
                    );

                },
                    err => console.log('Error loading files: ', err)
            );
        }
        //this.nbFiles = 0;
        //this.moveFiles();

        //setTimeout(() =>  {

        //}, 1000);



    }


    grabAllMoveFilesNew(subFolder){
        if(this.platform.is('android')) {
            console.log('calleding grabAllMoveFilesNew inside')
            this.file.listDir(this.file.externalRootDirectory, 'New').then(
                    res => {
                    res.forEach((f) => {
                            console.log('outside selection found: ', this.selectedFiles, ' and f.name', f.name)
                            if (this.selectedFiles && this.selectedFiles.includes(f.name)) {
                                console.log('inside selection: ', this.selectedFiles, ' and f.name', f.name)
                                this.file.moveFile(this.file.externalRootDirectory + '/New/',
                                    f.name, this.file.externalRootDirectory + '/New/' + subFolder + '/',
                                    f.name).then(
                                        success => {
                                        //console.log('moved file: ', f.name);
                                        document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name
                                        //this.countNewFiles();
                                        //this.nbFiles = 0;

                                    },
                                        error => {
                                        console.error('error in moving file: ', error, ' name ', this.file.externalRootDirectory + '/New/' + subFolder + '/' + f.name);
                                    }
                                ) // end of move file
                            }
                        }
                        // end of for each file
                    );

                },
                    err => console.log('error loading files: ', err)
            );
        }
        //this.nbFiles = 0;
        //this.moveFiles();

        //setTimeout(() =>  {

        //}, 1000);



    }


    moveFiles(file) {


        document.getElementById('logAreaNotes').innerHTML = ''

        let map = [
            ['/DCIM', 'Screenshots'],
            ['/DCIM', 'Camera'],
            ['/', 'SoundRecorder'],
            ['/', 'Pictures'],
            ['/', 'Download'],
            ['/Music', 'Voice Recorder'],
            ['/Recordings', 'Voice Recorder'],
            ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', 'Private'],
            ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Images', 'Private'],
            ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Audio', 'Private'],
            ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Video', 'Private'],
            ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Documents'],
            ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Images'],
            ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Audio'],
            ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Video']
        ]

        map.forEach((d) => {
            //console.log('Moving files in directory: ', d[0], ' in ', d[1]);

            this.file.listDir(this.file.externalRootDirectory + d[0], d[1]).then(
                    res => {
                    res.forEach((f) =>
                              //    console.log('listing file: ', f.name)
                            this.file.moveFile(this.file.externalRootDirectory + d[0] + '/' + d[1],
                                f.name, this.file.externalRootDirectory + '/New/',
                                f.name).then(
                                    success => {
                                    //console.log('moved file: ', f.name);
                                    document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name;
                                    //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                },
                                    error => {
                                    console.log('error moving files: ', error, ' with name: ', f.name);
                                }
                            ) // end of move file
                        // end of for each file
                    )
                },
                    err => {
                        //console.log('error loading files: ', err)
                        console.log('Error list files in: ', this.file.externalRootDirectory, d[0], d[1], ' with error ', err)

                    }
            )
        }) // end of for each directory

        //this.nbFiles = 0
        //setTimeout(() =>  {
        //    this.countNewFiles();
        //}, 1000);
        //

        if (file && file.target.checked) {
            this.selectedFiles = []

            this.multipleDocumentsPicker.pick(2)
                .then(res => {
                    //console.log('res =================', res);
                    //console.log('res =================', JSON.parse(res));
                    for (let f of  JSON.parse(res)) {
                        console.log('selected file ', f.name)
                        this.selectedFiles.push(f.name)
                        console.log('selected files ', this.selectedFiles)
                    }
                }
            ).catch((error:any) => console.error(error));
        }
        else if (file && !file.target.checked) {
            this.selectedFiles = []
        }

    }

    enablePhysicalDelete(option){

        if (option && option.target.checked) {
            this.physicalDelete = true
            document.getElementById('connectionLog').innerHTML += ('<br/>Physical deletion is enabled...<br/>');
        }
        else if (option && !option.target.checked) {
            document.getElementById('connectionLog').innerHTML += ('<br/>Physical deletion is disabled...<br/>');
            this.physicalDelete = false
        }

    }
    enableCollectFiles(option){

        if (option && option.target.checked) {
            this.collectFiles = true
            document.getElementById('connectionLog').innerHTML += ('<br/>Collect files is enabled...<br/>');
        }
        else if (option && !option.target.checked) {
            document.getElementById('connectionLog').innerHTML += ('<br/>Collect files is disabled...<br/>');
            this.collectFiles = false
        }

    }
    moveFilesJob() {

        if (this.collectFiles) {
            document.getElementById('logAreaNotes').innerHTML = ''

            document.getElementById('connectionLog').innerHTML += ('<br/>Moving new files...<br/>');

            let map = [
                ['/DCIM', 'Screenshots'],
                ['/DCIM', 'Camera'],
                ['/', 'SoundRecorder'],
                ['/', 'Pictures'],
                ['/', 'Download'],
                ['/Music', 'Voice Recorder'],
                ['/Recordings', 'Voice Recorder'],
                ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', 'Private'],
                ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Images', 'Private'],
                ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Audio', 'Private'],
                ['/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Video', 'Private'],
                ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Documents'],
                ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Images'],
                ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Audio'],
                ['/Android/media/com.whatsapp/WhatsApp/Media', 'WhatsApp Video']

            ]

            map.forEach((d) => {
                console.log('Moving files in directory: ', d[0], ' in ', d[1]);

                this.file.listDir(this.file.externalRootDirectory + d[0], d[1]).then(
                        res => {
                        res.forEach((f) =>
                                //      console.log('listing file: ', f.name)
                                this.file.moveFile(this.file.externalRootDirectory + d[0] + '/' + d[1],
                                    f.name, this.file.externalRootDirectory + '/New/',
                                    f.name).then(
                                        success => {
                                        //console.log('moved file: ', f.name);

                                            document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkgreen">' + 'Moved: </span>' + f.name + '.<br/>';
                                            document.getElementById('connectionFileResultLog').scrollIntoView({behavior: 'smooth'});
                                        //document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name
                                        //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                    },
                                        error => {
                                        console.log('error: ', error);
                                    }
                                ) // end of move file
                            // end of for each file
                        )
                    },
                        err => console.log('error loading files: ', err)
                )
            }) // end of for each directory

        }

        this.nbFiles = 0
        setTimeout(() =>  {
            this.countNewFiles();
        }, 1000);
        //this.selectedFiles = []


        setTimeout(() =>  {
if (this.totalNbFiles >= 300) {
    console.log('Setting new files notification')
    let date = new Date();
    //date.setTime(date.getTime() + (2 * 1000)) // - 1 hour
    this.localNotifications.schedule({
        id: 1,
        text: this.totalNbFiles + ' new files to settle ',
        title: this.totalNbFiles + ' new files to settle',
        trigger: {at: date},
        group: 'Nibras',
        //vibrate: true,
        //importance: 6,
        led: 'FF0000',

        //foreground: true,
        wakeup: false,

        //sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
        //silent: true,
        badge: this.totalNbFiles
        //, sound: null
    });
}

else if (this.totalNbFiles < 30) {
    console.log('Removing the notification...')
    //let date = new Date();
    //date.setTime(date.getTime() + (2 * 1000)) // - 1 hour
    this.localNotifications.clear(1).then((result)=> {
        console.log('Successfully cleared notification',result);
    }).catch((err)=> {
        console.log('Failed clearing notification notification  ',err);
    })
}
        }, 3000);




    }


    countNewFiles(){

      //  this.nbFiles = 0
        //this.files = []
        console.log('Counting files now...')

        this.totalNbFiles = 0
        this.files2 = []


        //setTimeout(() =>  {


            this.file.listDir(this.file.externalRootDirectory, 'New').then(
                    res => {
                    res.forEach((f) => {
                            //f.isFile ?
                            if (f.isFile) {
                                this.totalNbFiles = this.totalNbFiles + 1
                                //console.log('found file ', f.name)
                                this.files2.push(f.name)
                            }
                        }
                        //}
                    )
                })



        //}, 1000);

    }

  /*  ionViewDidEnter(){
        setTimeout(() =>  {
            //document.getElementById('nkinputt').focus(); document.getElementById('nkinput').focus();
            console.log('hhhhhhhhhhh trying to focus');
            //this.bNkinput.nativeElement.focus();
            //this.bNkinput.focus();
            //this.nkinput.focus();

        }, 1000);
    }
    */

    //ngAfterViewChecked(){
    //    setTimeout(() => {
    //        //document.getElementById('nkinputt').focus(); document.getElementById('nkinput').focus();
    //        console.log('hhhhhhhhhhhhhhhhhtrying to focus');
    //        this.bNkinput.nativeElement.focus();
    //        this.bNkinput.setFocus();
    //        //this.nkinput.focus();
    //
    //    }, 1000);
    //}


    pickFile(file){
    console.log('picked file', file.target.value)
        if (file.target.checked) {
            this.selectedFiles.push(file.target.value)
            console.log('file check', file.target.value)
            console.log('selected', this.selectedFiles)
        }
        //else
        //    this.selectedFiles.pop(file.target.value)

    }


saveForm(){


  //document.getElementById('nkinput').focus();

  this.storage.get('formSummary').then(val => {
    this.storage.set('formSummary', this.formSummary)
  })

  this.storage.get('formDescription').then(val => {
    this.storage.set('formDescription', this.formDescription)
  })
  this.storage.get('formModule').then(val => {
    this.storage.set('formModule', this.formModule)

  })
 this.storage.get('formPriority').then(val => {
    this.storage.set('formPriority', this.formPriority)

  })
 this.storage.get('formDate').then(val => {
    this.storage.set('formDate', this.formDate)

  })


}


    async syncDone(){


        this.clearLog()


        this.storage.get('ipA').then(val => {
            this.ipA = val



            //this.storage.get('tosyncText').then((val) => {


            this.storage.forEach((value, key, index) => {

                if (key.startsWith('u-')) {


                    const params = new HttpParams()

                    var headers = new HttpHeaders();
                    headers.append("Accept", 'application/json');
                    headers.append('Content-Type', 'application/json' );
                    const httpOptions = { headers: headers };

                    let postData = {
                        "username": this.username,
                        key: key,
                        value: value
                    }

                    var ipp = this.ipA
                    var subPart
                    if (this.ipA.indexOf(':') != -1)
                        subPart = this.ipA
                    else
                        subPart = this.ipA + ':1441/nibras/'

                    var link = "https://" + subPart + "/sync/mobilePushSplit"

                    this.http.post(link, postData, httpOptions).subscribe(response => {
                            document.getElementById('connectionLog').innerHTML = '<br/>' + response['result'] + '<br/>';
                            //this.http.get(link,{params: params}).subscribe(response => {
                            // document.getElementById('logArea').innerHTML = response + ' synced.'
                          //  this.storage.set('tosyncText', [])
                        },
                            err => {
                            //document.getElementById('logArea').innerHTML = 'Not synced'//  + err.message
                            document.getElementById('connectionLog').innerHTML = '<br/>Error syncing the updates<br/>' //+ err;
                            console.error('updates sync err', err)
                        })




                }








            }); // end of storage



            setTimeout(() => {
                this.syncData();
            }, 4000);

        });


} // end of syncDone






async syncWritings()
 {
     ////
     const alert = await this.alertController.create({
     header: 'Confirm!',
     message: 'Are you sure you want to move the notes to Nibras Desktop?',
     buttons: [
         {
             text: 'Cancel',
             role: 'cancel',
             cssClass: 'secondary',
             handler: (blah) => {
               //  console.log('Confirm Cancel: blah');
             }
         }, {
             text: 'Ok',
             handler: () => {

                 this.storage.get('ipA').then(val => {
                     this.ipA = val

                     this.storage.get('nklog').then((val) => {
                         const params = new HttpParams()

                         //.set('tosync', val.replace('\n', ' ').replace('&', ' and ').replace('/', ' fs '));


                         var headers = new HttpHeaders();
                         headers.append("Accept", 'application/json');
                         headers.append('Content-Type', 'application/json' );
                         const httpOptions = { headers: headers };



                         //  const httpOptions = {
                         //    headers: new Headers({
                         //     'Content-Type':  'application/json',
                         //     "Accept": 'application/json'
                         //     })
                         //      , params
                         //    };


                         let postData = {
                             "data": val.replace(/<br\/>/g, '\n'),
                             "username": this.username
                         }
                         var ipp = this.ipA
                         var link = "https://" + ipp + "/sync/mobileWritings"

                         this.http.post(link, postData, httpOptions).subscribe(response => {
                                 document.getElementById('logAreaNotes').innerHTML = response['result']// + ' You need to manually delete the notes list after verifying its successful sync.'
                                 document.getElementById('newEntry').innerHTML = ''

                                 return this.file.writeFile(this.file.externalRootDirectory + '/Nibras/',  'reader-log.txt',
                                     val,
                                     { replace: false, append: true }).then(createdFile => {
                                         console.log('Backup written successfully.');
                                         document.getElementById('logAreaNotes').innerHTML  = 'Backup written successfully.';
                                         this.storage.set('nklog', '')
                                         this.nklog = ''

                                         //console.log(createdFile)
                                     }).catch(err => {
                                         console.error(err);
                                     });

                                 this.syncData();
                             },
                                 err => {
                                 //document.getElementById('logAreaNotes').innerHTML = 'Not synced: ' + err.message
                             })
                     });
                 });


                 //  console.log('Confirm Okay');
             }
         }
     ]
 });

     await alert.present();
     let result = await alert.onDidDismiss();
    // console.log(result);

     ////






 }

async syncWritingsNew()
 {
     ////
     const alert = await this.alertController.create({
     header: 'Confirm!',
     message: 'Are you sure you want to move the entered records to Nibras Desktop?',
     buttons: [
         {
             text: 'Cancel',
             role: 'cancel',
             cssClass: 'secondary',
             handler: (blah) => {
               //  console.log('Confirm Cancel: blah');
             }
         }, {
             text: 'Ok',
             handler: () => {

                 this.storage.get('ipA').then(val => {
                     this.ipA = val

                     //this.storage.get('nklog').then((val) => {
                         const params = new HttpParams()

                         //.set('tosync', val.replace('\n', ' ').replace('&', ' and ').replace('/', ' fs '));


                         var headers = new HttpHeaders();
                         headers.append("Accept", 'application/json');
                         headers.append('Content-Type', 'application/json' );
                         const httpOptions = { headers: headers };



                         //  const httpOptions = {
                         //    headers: new Headers({
                         //     'Content-Type':  'application/json',
                         //     "Accept": 'application/json'
                         //     })
                         //      , params
                         //    };


                         let postData = {
                             "data": this.items,// val.replace(/<br\/>/g, '\n')
                             "username": this.username
                         }
                         var ipp = this.ipA
                         var link = "https://" + ipp + "/sync/mobileWritingsNew"

                         this.http.post(link, postData, httpOptions).subscribe(response => {
                                 document.getElementById('logAreaNotes').innerHTML =
                                     '<span style="color: darkgreen">' +
                                     response['result']
                                     + '</span><br/>';
                                 // + ' You need to manually delete the notes list after verifying its successful sync.'
                                 document.getElementById('newEntry').innerHTML = ''
                             if(this.platform.is('android')) {

                                 //let itemTexts = ''
                                 //this.items.forEach((r) => {
                                 //    itemTexts += r.toString()
                                 //})


                                 return this.file.writeFile(this.file.externalRootDirectory + '/Nibras/',  'reader-log.txt',
                                     this.items.toString(),
                                     { replace: false, append: true }).then(createdFile => {
                                         console.log('Backup written successfully.');
                                         document.getElementById('logAreaNotes').innerHTML  = 'Backup written successfully.';
                                         //this.storage.set('nklog', '')
                                         this.items = []
                                         this.storage.forEach((value, key, index) => {
                                             if (key.startsWith('r-'))
                                                 this.storage.remove(key)

                                             //console.log('found key ', key);
                                         })

                                         //console.log(createdFile)
                                     }).catch(err => {
                                         console.error(err);
                                     });

                                 this.syncData();
                             }
                             },
                                 err => {
                                 //document.getElementById('logAreaNotes').innerHTML = 'Not synced: ' + err.message
                             })
                     });
                 //});


                 //  console.log('Confirm Okay');
             }
         }
     ]
 });

     await alert.present();
     let result = await alert.onDidDismiss();
    // console.log(result);

     ////

 }


    checkRepo() {



        this.storage.get('ipA').then((val) => {
            this.ipA = val;

            var subPart
            if (this.ipA.indexOf(':') != -1)
                subPart = this.ipA
            else
                subPart = this.ipA + ':1441/nibras/'



            var link = "https://" + subPart + "/page/heartbeatJson"

            this.http.get(link,{}).subscribe(response => { // todo, later, to speed responce. .pipe(timeout(2)
                    if (response['result'] == 'ok')
                    //document.getElementById('connectionLog').innerHTML =   'Nibras Desktop online';
                        document.getElementById('connectionLog').innerHTML = '<br/><span style="color: darkgreen">' + 'Nibras Desktop online</span><br/>';
                    //   this.syncDone()

                    this.isOffline = false
                    this.status = 'online'

                    this.storage.get('username').then((val) => {
                        // console.log('ipa 0: ' + val)
                        if (!val || val == 'null' || val == '' || val == null) {
                            // console.log('here1111 0: ' + val)
                            this.username = '*'
                            //this.ipTemp = '192.168.0.11:1441/nibras'
                        } else {
                            // this.ipA = 'localhost/nibras'
                            this.username = val;
                            //this.ipTemp = val;
                        }

                    })


                    //console.log('before syncdone, username ', this.username)

                    //setTimeout(() =>  {
                    //this.syncDone()
                    //}, 5000);





                    link = "https://" +subPart + "/sync/nibrasFilesNestedById"

                    this.http.get(link,{}).subscribe(response => {
                            if (response['result'] == 'yes') {
                                console.log('Resources nested by id')
                                this.resourceNestedById = true
                                this.storage.set('resourceNestedById', true)
                            }
                        }, err => {
                            this.storage.get('resourceNestedById').then((val) => {
                                if (val){
                                    this.resourceNestedById = val
                                }
                            });
                        }
                    )

                    link = "https://" + subPart + "/sync/nibrasFilesNestedByType"

                    this.http.get(link,{}).subscribe(response => {
                            if (response['result'] == 'yes') {
                                console.log('Resources nested by type')
                                this.resourceNestedByType = true
                                this.storage.set('resourceNestedByType', true)
                            }
                        }, err => {
                            this.storage.get('resourceNestedByType').then((val) => {
                                if (val){
                                    this.resourceNestedByType = val
                                }
                            });
                        }
                    )





                    //console.log ('res' + response['result'])
                },
                    err => {
                    //document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline'//  + err.message;
                    document.getElementById('connectionLog').innerHTML = '<br/><span style="color: darkred">' + 'Nibras Desktop offline</span><br/>';
                    //this.syncData();
                    this.isOffline = true
                    this.status = 'offline'
                })
        })





        this.storage.get('ipRepo').then((val) => {
    this.ipRepo = val;

            var subPart
            if (this.ipRepo.indexOf(':') != -1)
                subPart = this.ipRepo
            else
                subPart = this.ipRepo + ':1441/files/'


            var link2 = "https://" + subPart + "keep.json" // .replace('files', '')
// todo: fix, always offline
//console.error('repo keep at ', link2)

    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = { headers: headers };


    this.httpp.setServerTrustMode('nocheck');
    //this.httpp.setRequestTimeout(600000);

//console.log('files to download', this.filesToDownload)
    //
    //
    this.httpp.sendRequest(link2, {method: "get", timeout: 600000,  responseType: 'json'}).then( //responseType: "arraybuffer",
    httpResponse => {
    //console.error(' in httppppppp',    httpResponse)
    if (httpResponse.data['result'] == 'ok') {
    //document.getElementById('connectionLog').innerHTML +=   'File Repository online';
    //document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkgreen">' + 'File Repository online</span><br/>';

    //this.syncData(); // test, new, for faster responce
    //this.syncDone()
    //this.isOffline = false
    this.repoStatus = 'online'
}
}
).catch(err => {
    this.repoStatus = 'offline'
 //  console.error(err);
})

/*

 this.http.get(link2, httpOptions).subscribe(response => { // todo, later, to speed responce. .pipe(timeout(2)
 console.error('repo res ', response)
 if (response['result'] == 'ok')
 //document.getElementById('connectionLog').innerHTML +=   'File Repository online';
 document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkgreen">' + 'File Repository online</span><br/>';

 this.syncData(); // test, new, for faster responce
 //this.syncDone()

 //this.isOffline = false
 this.repoStatus = 'online'
 //this.changeRef.detectChanges()
 //console.log ('res' + response['result'])
 },
 err => {
 document.getElementById('connectionLog').innerHTML +=   'File repository offline. '  + err;
 document.getElementById('connectionLog').innerHTML += '<br/><span style="color: darkred">' + 'File Repository offline</span><br/>';
 //this.syncDone();
 //this.isOffline = true
 console.log('repo error ', err)
 this.repoStatus = 'offline'
 //this.changeRef.detectChanges()
 })
 })
 */

})
}
syncData()
 {

     this.checkRepo()
     this.clearLog()


     this.updateDepartments()


     this.updateTypes()

 //
 //    this.allEvents = []
     //this.myCalendar.loadEvents();

    //this.syncDone()
    this.storage.get('ipA').then(val => {

      if (!val || val == 'null' || val == null){
        // console.log('here1111 0: ' + val)
       this.ipA = '192.168.0.2'
       } else

      // this.ipA = '192.168.0.11:1441/nibras'
   this.ipA = val;

   // this.ipA = val

        var subPart
        if (this.ipRepo.indexOf(':') != -1)
            subPart = this.ipRepo
        else
            subPart = this.ipRepo + ':1441/nibras/'


        var link = "https://" + subPart + "/page/heartbeatJson"

      this.http.get(link,{}).subscribe(response => {
          if (response['result'] == 'ok') {

              this.lastSyncDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()// 'dd.MM.yyy HH:mm')
              this.lastSyncDiff = 'now'//pretty(Date.now())
              this.lastSyncDateTime = new Date() // .getTime()//now()

              this.storage.set('lastSyncDate', this.lastSyncDate);
              this.storage.set('lastSyncDateTime', this.lastSyncDateTime);
              //this.storage.set('lastSyncDiff', this.lastSyncDiff);


              document.getElementById('connectionLog').innerHTML = '<br/><span style="color: darkgreen">' + 'Nibras Desktop online</span><br/>';
          //'Nibras Desktop online';
          //document.getElementById('logAreaNotes').innerHTML =   '<br/><span style="color: darkgreen">' + 'Nibras Desktop online</span><br/>';
          this.status = 'online'
          // this.syncType('Todo', 'Todo')

          this.syncType('T', 'Tasks')
          this.syncType('V', 'Events')
          //this.syncType('Cal', 'Calendar')
          this.syncType('P', 'Planner')
          this.syncType('J', 'Journal')

          this.syncType('G', 'Goals')
          //this.syncType('O', 'Operations')
          //this.syncType('E', 'Excerpts')
          this.syncType('N', 'Notes')
          this.syncType('W', 'Writings')
          //this.syncType('Nws', 'News')
          //this.syncType('Art', 'Articles')
          this.syncType('R', 'Resources')


          setTimeout(() => {
              //document.getElementById('connectionLog').innerHTML += ('<br/>Loading the calendar...<br/>');
              this.myCalendar.loadEvents();

              if (this.platform.is('android')) {

                  this.syncFiles();//.loadEvents();


                  //this.moveFilesJob();


                  this.changeRef.detectChanges();
              }
          }, 7000);


          let current_datetime = new Date()

          let date =
              current_datetime.getDate().toString().padStart(2, '0') + "." + (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "." +
              current_datetime.getFullYear() + '_' +
              current_datetime.getHours().toString().padStart(2, '0') + ":" + current_datetime.getMinutes().toString().padStart(2, '0') + ":" + current_datetime.getSeconds().toString().padStart(2, '0')


          document.getElementById('connectionLog').innerHTML =
              '<br/><span style="color: darkgreen">' + 'Records synced on ' + date + '.</span><br/>';

          //document.getElementById('logAreaNotes').innerHTML = 'Records synced on ' + date + '.'
      }
      },
      err => {
       document.getElementById('connectionLog').innerHTML =  'Nibras Desktop offline'//  + err.message;
       //document.getElementById('logAreaNotes').innerHTML =  'Nibras Desktop offline'//  + err.message;

          this.status = 'offline'

      //  this.syncType('Todo', 'Todo')
    this.allEvents = []
       this.syncType('T', 'Tasks')
          this.syncType('V', 'Events')
   //    this.syncType('Cal', 'Calendar')
       this.syncType('P', 'Planner')
       this.syncType('J', 'Journal')
          //this.syncType('O', 'Operations')
       this.syncType('G', 'Goals')
      //  this.syncType('K', 'Nk piles')
      //  this.syncType('E', 'Excerpts')
       this.syncType('N', 'Notes')
   this.syncType('W', 'Writings')
   //this.syncType('Nws', 'News')
   //this.syncType('Art', 'Articles')
   this.syncType('R', 'Resources')
      })

        setTimeout(() =>  {
            //document.getElementById('connectionLog').innerHTML += ('Loading the calendar...<br/>');
            this.myCalendar.loadEvents();
            //this.syncFiles();//.loadEvents();
            if(this.platform.is('android')) {
                //document.getElementById('connectionLog').innerHTML += ('Moving new files...<br/>');

                    //this.moveFilesJob();
            }
        }, 1000);


    //  console.log('Result from server was ok!', types[t])
    //  },
    //  err => {
      // document.getElementById('logArea').innerHTML = 'Offline'
    //  })
  //  }
//

   });




  } // end of sync

  syncType(type, label){


      this.storage.get('username').then((val) => {
          // console.log('ipa 0: ' + val)
          if (!val || val == 'null' || val == '' || val == null) {
              // console.log('here1111 0: ' + val)
              this.username = '*'
              //this.ipTemp = '192.168.0.11:1441/nibras'
          } else {
              // this.ipA = 'localhost/nibras'
              this.username = val;
              //this.ipTemp = val;
          }

      })
//console.log('before sync type, username ', this.username)

      var subPart
      if (this.ipA.indexOf(':') != -1)
          subPart = this.ipA
      else
          subPart = this.ipA + ':1441/nibras/'


      this.http.get("https://" + subPart + "/sync/exportJson" + type + '/?id=' + this.username).subscribe(response => {
  let t = type;
this.storage.set('mytext' + t, response['data'].sort( (a,b) => (a.id < b.id) ? 1 : -1));

// document.getElementById('menuItem' + t).innerHTML =   label + ' (' +  response['data'].length + ')'

// Update menu item count
//document.getElementById('menuItem' + t).innerHTML =
//'&nbsp' + t + ' ' + response['data'].length

        if (type != 'V') {
            document.getElementById(type + 'badge').firstChild['data'] =
                response['data'].length
        }




        response['data'].forEach((e) => {

            this.ids.push(e.id.toString())

        })



//  type + '<sup>' + response['data'].length + '</sup>'

  // Schedule delayed notification


        //if (this.status == 'online'){

            //if(this.platform.is('android')) {
                //setTimeout(() =>  {
                //console.log('ids in ', type , ' are ' , ids.join(','))
                //this.clearFolder('/Nibras/', type, this.ids)
                //}, 30 * 1000);
                //}


                if (type == 'P' || type == 'V') {

                    response['data'].forEach((e) => {

                            var d = []
                            if (type == 'V' && e.date != null && e.date != 'null') {
                                d = e.date.split('-');
                            }
                            if (type == 'P' && e.meta) {
                                d = e.meta.split('-');
                            }
                            var date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0);
                            var id = e.id
                            var title = e.summary;
                            var body = e.description;
                            //console.log('creating an event: ' + title,  ' at date '  + date);
                            //    if(type == 'V') {
                            let newEvent = {
                                title: title,
                                description: body,
                                imageURL: 'example.com',
                                startTime: date,
                                endTime: date,
                                allDay: false
                            };
                            this.allEvents.push(newEvent)
                            //   }


                            if (this.platform.is('android')) {
                                this.localNotifications.schedule({
                                    id: id,
                                    text: (body ? body : ''),
                                    title: 'Plan now: ' + title,
                                    trigger: {at: date},
                                    group: 'Nibras',
                                    wakeup: true,
                                    sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                                    //channel: 'planner',
                                    vibrate: true,
                                    led: 'FF0000'
                                    //, sound: null
                                });

                                date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0);
                                date.setTime(date.getTime() - (60 * 60000)) // - 1 hour
                                this.localNotifications.schedule({
                                    id: id,
                                    text: (body ? body : ''),
                                    title: 'Plan in 1h: ' + title,
                                    trigger: {at: date},
                                    group: 'Nibras',
                                    wakeup: true,
                                    sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                                    vibrate: true,
                                    //channel: 'planner',
                                    led: 'FF0000'
                                    //, sound: null
                                });

                                date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0);
                                date.setTime(date.getTime() - (5 * 60000)) // -5min
                                this.localNotifications.schedule({
                                    id: id,
                                    text: (body ? body : ''),
                                    title: 'Plan in 5min: ' + title,
                                    trigger: {at: date},
                                    group: 'Nibras',
                                    //channel: 'planner',
                                    vibrate: true,
                                    wakeup: true,
                                    sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                                    led: 'FF0000'

                                    //, sound: null
                                });
                                date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0);
                                date.setDate(date.getDate() - 1)
                                this.localNotifications.schedule({
                                    id: id,
                                    text: (body ? body : ''),
                                    title: 'Plan in 1 day: ' + title,
                                    trigger: {at: date},
                                    group: 'Nibras',
                                    wakeup: true,
                                    sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                                    //channel: 'planner',
                                    vibrate: true,
                                    led: 'FF0000'
                                    //, sound: null
                                });


                            }
                        }
                    )


                }

}, err => {
//  let t = type;

  this.storage.get('mytext' + type).then((val) => {

      if (type != 'V') {
          document.getElementById(type + 'badge').firstChild['data'] =
              val.length
      }

      this.itemsMega[type] = val

      if(type == 'P' || type == 'V'){

          val.forEach((e) =>
              {
                  var d = []
                  if(type == 'V' && e.date != null && e.date != 'null'){
                      d = e.date.split('-');
                  }
                  if(type == 'P' && e.meta) {
                      d = e.meta.split('-');
                  }
                  var date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
                  var id = e.id
                  var title = e.summary;
                  var body = e.description;
                  //console.log('creating an event: ' + title,  ' at date '  + date);

                  let newEvent = {
                      title: title,
                      description: body,
                      imageURL: 'example.com',
                      startTime: date,
                      endTime: date,
                      allDay: false
                  };
                  this.allEvents.push(newEvent)
                  //this.myCalendar.loadEvents();



                  this.localNotifications.schedule({
                      id: id,
                      text: (body ? body : ''),
                      title: 'Plan now: ' + title,
                      trigger: {at: date},
                      group: 'Nibras',
                      wakeup: true,
                      sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                      //channel: 'planner',
                      vibrate: true,
                      led: 'FF0000'
                      //, sound: null
                  });

                  date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
                  date.setTime(date.getTime() - (60*60000)) // - 1 hour
                  this.localNotifications.schedule({
                      id: id,
                      text: (body ? body : ''),
                      title: 'Plan in 1h: ' + title,
                      trigger: {at: date},
                      group: 'Nibras',
                      wakeup: true,
                      sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                      vibrate: true,
                      //channel: 'planner',
                      led: 'FF0000'
                      //, sound: null
                  });

                  date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
                  date.setTime(date.getTime() - (5*60000)) // -5min
                  this.localNotifications.schedule({
                      id: id,
                      text: (body ? body : ''),
                      title: 'Plan in 5min: ' + title,
                      trigger: {at: date},
                      group: 'Nibras',
                      //channel: 'planner',
                      vibrate: true,
                      wakeup: true,
                      sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                      led: 'FF0000'

                      //, sound: null
                  });
                  date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
                  date.setDate(date.getDate() - 1)
                  this.localNotifications.schedule({
                      id: id,
                      text: (body ? body : ''),
                      title: 'Plan in 1 day: ' + title,
                      trigger: {at: date},
                      group: 'Nibras',
                      wakeup: true,
                      sound: this.file.externalRootDirectory + '/Nibras/mdd/alarms/1-chime.mp3',
                      //channel: 'planner',
                      vibrate: true,
                      led: 'FF0000'
                      //, sound: null
                  });


              }


          )

      }

    // if (val.length > 0){
    //document.getElementById('menuItem' + type).innerHTML =
    //    '&nbsp' + type + ' ' + val.length
    //  type + '<sup>' +  val.length + '</sup>'
    //  };
    });

});


  }

  update() 
  {
   this.storage.set('ipA', this.ipA);
   //console.log('ip local : ' , this.ipA)
   this.storage.get('ipA').then((val) => {
     console.log('ip storage: ' , val);    
      });
   
 
      //console.log('ip1local : ' , this.ipA)
   //this.storage.get('ipA').then((val) => {
     //console.log('ip1storage: ' , val);
     //this.ipA = val
     // });
      //console.log('ip2local : ' , this.ipA)
 
   //if (this.ipA){
     
    
     //mytext = ''
     //fetch('http://localhost:1441/page/heartbeat', {})
       //.then(res => res.json())
       //.then(posts => console.log('posts ' + posts))
     
       // this.storage.get('ipA').then((val) => {
         // this.ipA = val;    
         //  });
          //console.log('IP found in local storage.', this.ipA)
   
   
   // console.log(response['data'])
   
   
     // Or to get a key/value pair
      
     //  storage.get('name').
     // } else {
     //   console.log('local ip not set!!')
     //}
   
   
   //pipe(map((res: Response) =>{
   //var data = res.json();
   //console.log('my data: ', data);
   //}));
   
 
   
 }

    hideSearchResults() {
        this.searchItems = []
}

search(term){
    //console.log('here in search term')
this.searchTerm = term

//console.log('in search')
//console.log('in search term ', this.searchTerm)

    if (this.searchTerm.trim() == '' || !this.searchTerm)
    {

        this.searchItems = []
        //document.getElementById('searchLog').innerHTML  = 'No search term entered'
    }
    else
    {
        this.searchItems = []
        this.storage.forEach((value, key, index) => {

            //this.listall.push(value);
            //if (key.st)
            //console.log('inside for each, found', key);
            //console.log('class of title ', value.title.includes(this.searchTerm), value.title);

            if (key.startsWith('r-') && value.summary.includes(this.searchTerm)) {
                //console.log('found title!!!!!!!!!! class ', value.summary);
                this.searchItems.push(value);
            }

            if (key.startsWith('mytext')) {
                //console.log('now in text ', key)
                for (var e of value) {
                    //console.log('now in record ', e.summary)
                    if (e.summary.includes(this.searchTerm)) {
                        this.searchItems.push(e);
                    }
                }
            }

            document.getElementById('searchLog').innerHTML  =   this.searchItems.length + ' results found for "' + this.searchTerm + '".'

            //console.log('found key ', key);
        })

    }
}

    onTimeSelected(ev: any) {
        const selected = new Date(ev.selectedTime);
        console.log('selected date', selected.toISOString());
    }

    changeMode(mode){
        this.calendar.mode = mode;
        this.calendar.startingDayWeek = 1

    }

    clearLog(){

        //this.storage.set('covers',  this.covers)


        document.getElementById('connectionLog').innerHTML = ''
        document.getElementById('connectionFileResultLog').innerHTML = ''
        document.getElementById('connectionFileLog').innerHTML = ''
    }

 clearFiles() {
     document.getElementById('connectionLog').innerHTML = 'Clearing files'
     //this.clearFolder('/', 'Movies', ['a', 'b'])
 }


    clearFolder(parent, folder, array){

        //console.log('In clear folder... ', folder, ' inside ', parent, ' with ids ', array)

        //
        //let map = [
        //    ['/', 'Movies']
        //
        //]

        let keepsFolders = this.ids

        //map.forEach((d) => {
        //    console.log('In directory: ', parent, ' in ', folder);

            this.file.listDir(this.file.externalRootDirectory + '/' + parent, folder).then(
                    res => {
                    res.forEach((f) =>{
                    //        console.log('listing file: ', f.name)

                        if (!keepsFolders.includes(f.name))
                            //console.log('to keep: ', f.name)
                        //else
                            {
                            console.log('to remove: ', f.name)

                            if (!f.isFile) {

                                //console.log('is a directory: ', f.name)
                                this.file.listDir(this.file.externalRootDirectory + '/' + parent + '/' + folder, f.name).then(
                                        res => {
                                        res.forEach((g) => {

                                            if (this.physicalDelete == false)
                                            document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkorange">' + 'To remove: </span>' + g.name + '.<br/>';
                                            if (this.physicalDelete == true) {
                                                g.remove(
                                                    function () {

                                                        console.log('Sub file/folder removed: ', g.name);
                                                        document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkred">' + 'Removed: </span>' + g.name + '.<br/>';
                                                        //
                                                        //        document.getElementById('logAreaNotes').innerHTML += 'File removed: ' + f.name;
                                                        //        //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                                    },
                                                    //        error =>
                                                    function (error) {
                                                        console.log('error remvoing sub file: ', error, ' with name: ', g.name);
                                                    }
                                                )
                                            }
                                        })
                                    })

                                setTimeout(() =>  {

                                    if (this.physicalDelete == false)
                                    document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkorange">' + 'To remove: </span>' + f.name + '.<br/>';

                                    if (this.physicalDelete == true) {
                                        f.remove(
                                            function () {
                                                console.log(' file/folder removed: ', f.name);
                                                document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkred">' + 'Removed: </span>' + f.name + '.<br/>';
                                                //
                                                //        document.getElementById('logAreaNotes').innerHTML += 'File removed: ' + f.name;
                                                //        //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                            },
                                            //        error =>
                                            function (error) {
                                                console.log('error remvoing file: ', error, ' with name: ', f.name);
                                            }
                                        )
                                    }

                                    //    if(this.platform.is('android')) {
                                    //        this.moveFilesJob();
                                    //    }
                                }, 1000);




                            } else {

                                if (this.physicalDelete == false)
                                document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkorange">' + 'To remove: </span>' + f.name + '.<br/>';


                                if (this.physicalDelete == true) {
                                    f.remove(
                                        function () {
                                            document.getElementById('connectionFileResultLog').innerHTML += '<br/><span style="color: darkred">' + 'Removed: </span>' + f.name + '.<br/>';
                                            console.log(' file/folder removed: ', f.name);

                                            //
                                            //        document.getElementById('logAreaNotes').innerHTML += 'File removed: ' + f.name;
                                            //        //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                        },
                                        //        error =>
                                        function (error) {
                                            console.log('error remvoing file: ', error, ' with name: ', f.name);
                                        }
                                    )
                                }

                                    //    if(this.platform.is('android')) {
                                    //        this.moveFilesJob();
                                    //    }

                            }




                        }

                            //    .then(
                            //        success => {
                            //        console.log(' file/folder removed: ', f.name);
                            //
                            //        document.getElementById('logAreaNotes').innerHTML += 'File removed: ' + f.name;
                            //        //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                            //    },
                            //        error => {
                            //        console.log('error remvoing file: ', error, ' with name: ', f.name);
                            //    }
                            //) // end of move file


                            }

                       /*
                            this.file.moveFile(this.file.externalRootDirectory + d[0] + '/' + d[1],
                                f.name, this.file.externalRootDirectory + '/New/',
                                f.name).then(
                                    success => {
                                    //console.log('moved file: ', f.name);

                                    document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name;
                                    //document.getElementById('logAreaNotes').insertAdjacentHTML('beforeend', 'Found: ' + f.name + '<br/>');
                                },
                                    error => {
                                    console.log('error moving files: ', error, ' with name: ', f.name);
                                }
                            ) // end of move file
                        // end of for each file

                        */
                    )
                },
                    err => console.log('error loading files: ', err)
            )
        //}) // end of for each directory



        //document.getElementById('connectionLog').innerHTML = '<br/>Done clearing folder ' + folder
    }


    updateDepartments(){
        var subPart
        if (this.ipRepo.indexOf(':') != -1)
            subPart = this.ipRepo
        else
            subPart = this.ipRepo + ':1441/nibras/'


        var link = "https://" + subPart + "/sync/departments"

        this.http.get(link,{}).subscribe(response => {
                if (response['result'] == 'yes') {
                    console.log('Departments on Nibras: ', response['departments'])
                    this.departments = response['departments']
                    this.storage.set('departments', response['departments'])
                }
            }
        )

    }

    updateTypes(){

        var subPart
        if (this.ipRepo.indexOf(':') != -1)
            subPart = this.ipRepo
        else
            subPart = this.ipRepo + ':1441/nibras/'


        var  link = "https://" + subPart + "/sync/types"

        this.http.get(link,{}).subscribe(response => {
                if (response['result'] == 'yes') {
                    console.log('Modules on Nibras: ', response['modules'])
                    this.modules = response['modules']
                    this.storage.set('modules', response['modules'])
                }
            }
        )


    }
    clearSearchResults() {
        document.getElementById('searchLog').innerHTML = ''
        console.log('in clear search...')
    }
}
