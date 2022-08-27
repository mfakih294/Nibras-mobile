import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
 //import {  IonTextArea } from '@ionic/core';

import { MultipleDocumentsPicker } from '@awesome-cordova-plugins/multiple-document-picker/ngx';

//import { Downloader } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
  // encapsulation: ViewEncapsulation.None
})
export class HomePage {

//   @ViewChild('nkinputt', {static: true}) bNkinput: Input;

  ipA;
  ipRepo;
  //ipTemp = '192.168.0.102:1441/';
  //ipF;
    private downloadedFile;
  nk;

    // new consistant fields set
    operationId;
    ecode = 'o';
    summary;
    description;
    module = 'n';
    resourceType;
    priority = 2;
    language;
    date;
    textDate;
    nbFiles = 0;
    filesList;
    //////////////////////////////////////


    totalNbFiles = 0;
  withFolder;
  grabAll;
  nkt;
  nkd;
  nktype = 'n';

  //public nbFiles = 0;
    public files2: string[] = [];


  selectedFiles: string[] = [];

  nklog = '';
  searchTerm = '';
  items = [];

  itemsMega = [];
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
  tosyncText;
  // public version: string = version;
  
  //PreviewAnyFile: any;


    appTypes = [];



    loading: any;

  constructor(private http: HttpClient,  private file: File,
              private httpp: HTTP,
              //private downloader: Downloader,
        //      private sqlite: SQLite,
              private multipleDocumentsPicker: MultipleDocumentsPicker,
    private iab: InAppBrowser,
public platform: Platform,
    public alertController: AlertController,
              //private render: Renderer, private elementRef: ElementRef,
    // private fileOpener: FileOpener,
//private androidPermissions: AndroidPermissions,
    private storage: Storage, private localNotifications: LocalNotifications ){

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


      this.items = []
      this.storage.forEach((value, key, index) => {
          //this.listall.push(value);
          //if (key.st)

          if (key.startsWith('r-'))
          this.items.unshift(value)
          //console.log('found key ', key);
      })




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
          },
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
          }
      ];


      this.storage.get('nklog').then(val => {
      this.nklog = val
    });

    //this.storage.get('withFolder').then(val => {
    //  this.withFolder = val
    //});

    this.storage.get('summary').then(val => {
      this.summary = val
    });

    this.storage.get('description').then(val => {
      this.description = val
    });


    this.storage.get('date').then(val => {
      this.date = val
    });


 this.storage.get('module').then(val => {
  if (!val || val == 'null' || val == null){
      this.module = 'n'
  }
  else {
  this.module = val
  this.storage.set('module', 'n')
  }
    });



this.appTypes.forEach((t) =>{
    this.storage.get('mytext' + t.type).then((val) => {
        this.itemsMega[t.type] = val;
    });
});




      // this.storage.get('ipF').then((val) => {
    //   this.ipF = val;
    // });

    this.storage.get('ipRepo').then((val) => {
        // console.log('ipa 0: ' + val)
        if (!val || val == 'null' || val == '' || val == null) {
            // console.log('here1111 0: ' + val)
            this.ipRepo = 'localhost:1441/'
            //this.ipTemp = '192.168.0.11:1441/nibras'
        } else {
            // this.ipA = 'localhost/nibras'
            this.ipRepo = val;
            //this.ipTemp = val;
        }

    })

 this.storage.get('ipA').then((val) => {
      // console.log('ipa 0: ' + val)
       if (!val || val == 'null' || val == '' || val == null){
        // console.log('here1111 0: ' + val)
       this.ipA = 'localhost:1441/'
       //this.ipTemp = '192.168.0.11:1441/nibras'
       } else {
           // this.ipA = 'localhost/nibras'
           this.ipA = val;
           //this.ipTemp = val;
       }

   
  //  this.ipA = 'localhost/nibras'
  //  this.storage.set('ipA', 'localhost/nibras')



        this.file.createFile(this.file.externalRootDirectory + '/Nibras/', 'reader-log.txt', true).catch(err => {
            document.getElementById('logAreaNotes').innerHTML  = 'Error creating the log file.' + err.message;
            console.error(err);
        })


    this.refresh()
    this.syncData()
        //if(this.platform.is('android')) {
        //    this.moveFiles();
        //}


      //  this.countNewFiles();


   // this.syncAll();

    }).catch(()=>{
      //console.log('===================error catch' )
      this.ipA = 'localhost:1441/'
      this.storage.set('ipA', 'localhost:1441/')
    });

    var link = "https://" + this.ipA + "/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('logAreaNotes').innerHTML =   'Nibras PKM is online';
      document.getElementById('connectionLog').innerHTML =   'Nibras PKM is online';
      this.isOffline = false
      //console.log ('res' + response['result'])
    },
    err => {               
    document.getElementById('logAreaNotes').innerHTML =   'Nibras Desktop  offline';
    document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline';
    this.syncData();
  // this.ipA = '192.168.0.11:1441/nibras'
  

    })

    this.storage.get('tosyncText').then((val) => {
      if (val){
        this.tosyncText = val  
      } else {
        this.storage.set('tosyncText', [])
      }
      });



      //setTimeout(() =>  {
      if(this.platform.is('android')) {
          this.countNewFiles();
      }
      //}, 1000);



      this.syncData()

     //setInterval(()=> {this.refresh(); this.syncData() }, 60000);
     setInterval(()=> { this.countNewFiles();}, 220000);
     setInterval(()=> {this.syncData(); this.syncFiles(); this.moveFiles(null);}, 240000);

} // end of constructor

    rebuildItems(){
        this.items = []
        this.storage.forEach((value, key, index) => {
            if (key.startsWith('r-'))
                this.items.unshift(value)
            //console.log('found key ', key);
        })
    }
refresh(){
	/*
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  );
  */


    this.clearAllForm()

    this.selectedFiles = []

    this.rebuildItems()

    //setTimeout(() =>  {
    //if(this.platform.is('android')) {
    //    this.countNewFiles();
    //}
    //}, 30000);


  //  console.log('refresh clicked...  1')


  this.storage.get('ipA').then((val) => {
    this.ipA = val;
    var link = "https://" + this.ipA + "/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('connectionLog').innerHTML =   'Nibras Desktop online';
      this.isOffline = false
      //console.log ('res' + response['result'])
    },
    err => {               
     document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline'//  + err.message;
     this.isOffline = true
    })
  })


  // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGEs.androidPermissions.PERMISSION.GET_ACCOUNTS]);
}


    syncFiles(){



        //console.log('in sync file')




        for (let t of ['T', 'J', 'P', 'W', 'N', 'G']) {
            this.storage.get('mytext' + t).then((val) => {
                for (var e of val) {

          //          console.log('in sync file: record ' + t + ' ' + e.id)
                    if (e.filesList) {
                        console.log('In sync file: record ' + t + ' ' + e.id + ' has files!' + e.filesList)
                        for (var f of e.filesList.split('\n')) {
                            // to do comment out
                            console.log('<<<<<<<<<<< eid' + e.id + ' with file ' + f.split('|')[0])
                            document.getElementById('connectionLog').innerHTML = 'Downloading: ' + f.split('|')[0];
                            this.download("https://" + this.ipRepo + '/' + t + '/' + e.id + "/" + f.split('|')[0], e.id, f.split('|')[0], f.contains('|') ? f.split('|')[1] : 0, f.split('|')[0].split('.')[1], t);
                            // .replace('nibras', 'files')

                        }
                    }
                }
            });
        }

        for (let t of ['R']) {
            this.storage.get('mytext' + t).then((val) => {
                for (var e of val) {
                 //   console.log('In sync file: record ' + t + ' ' + e.id)
                    if (e.filesList) {
                        console.log('In sync file: record ' + t + ' ' + e.id + ' has files: ' + e.filesList)
                        for (var f of e.filesList.split('\n')) {
                            this.download("https://" + this.ipRepo +
                                '/' + t + '/' +
                                e.resourceType + '/' + Math.floor(e.id/100).toString() + '' +
                                '/' + e.id + "/" + f.split('|')[0], e.id, f.split('|')[0], f.split('|')[1], f.split('|')[0].split('.')[1], t);
                        }
                    }
                }
            });
        }

        //this.syncData();

    } // end of syncFiles

 download(url, parentDirectory, filename, size, ext, type) {

    var url = url;
    this.httpp.setServerTrustMode('nocheck');
    this.httpp.setRequestTimeout(600000);


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

             this.createParent(parentDirectory.toString(), filename, type);
     //        this.createFile(parentDirectory.toString(), filename, type);


          //, error => {
          //        console.log('error resolving ', error)
          //    }
          //)
          //});

      this.file.checkFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/', filename).then(_ => {
              //console.log('File exists', filename, ' checking file size')

              this.file.resolveLocalFilesystemUrl(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + filename).then(
                  (file) => {
                      file.getMetadata((meta) => {
                              //console.log('in resolving ', meta.size, ' ', filename)
                              if (meta.size != size){ // download again, duplicate code, todo
// duplicate code, fix
                                  document.getElementById('connectionLog').innerHTML = 'Downloading: ' + filename + '...';
                                  console.log('Downloading: ', filename)
                                  this.httpp.downloadFile(url, {}, {'method': "get", 'timeout': '60', 'responseType': 'arraybuffer'},
                                      this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + filename).then( //responseType: "arraybuffer",
                                          httpResponse => {
                                          console.log("File dowloaded successfully ", filename)
                                          document.getElementById('connectionLog').innerHTML = 'File downloaded successfully: ' + filename;
                                          //document.getElementById('logArea').innerHTML = 'ile dowloaded successfully.' + filename;
                                          //this.downloadedFile = new Blob([httpResponse.data], {type: 'application/' + ext});
                                          //document.getElementById('logArea').innerHTML  = ' the folder to be:' + parentDirectory.toString();
                                          //this.createParent(parentDirectory.toString(), filename, type);
                                          //this.createFile(parentDirectory.toString(), filename, type);
                                          //this.writeToFile(parentDirectory.toString(), filename, type);

                                      }
                                  ).catch(err => {

                                          console.log('Error downloading: ', filename); // , err.error
                                          //console.error(err.status, err.error, filename);


                                          document.getElementById('connectionLog').innerHTML = 'Error downloading: ' + filename;

                                          //console.error(err.status);
                                          //console.error(err.message);
                                          //console.error(err);
                                          //console.error(err.toString());
                                      })


                              }
                          }
                      )});

          }
      ).catch(err => {
              //console.log('File does not exist. Proceeding to download it...', filename)
              // duplicate code, fix
              this.file.createFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename, true).then(res => {
                  //
                  document.getElementById('connectionLog').innerHTML = 'Downloading: ' + filename + '...';
                  console.log('Downloading: ', filename)
                  this.httpp.downloadFile(url, {}, {'method': "get", 'timeout': '60', 'responseType': 'arraybuffer'},
                      this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString() + '/' + filename).then( //responseType: "arraybuffer",
                          httpResponse => {
                          console.log("File dowloaded successfully ", filename)
                          document.getElementById('connectionLog').innerHTML = 'File downloaded successfully: ' + filename;
                          //document.getElementById('logArea').innerHTML = 'ile dowloaded successfully.' + filename;
                          //this.downloadedFile = new Blob([httpResponse.data], {type: 'application/' + ext});
                          //document.getElementById('logArea').innerHTML  = ' the folder to be:' + parentDirectory.toString();
                          //this.createParent(parentDirectory.toString(), filename, type);
                          //this.createFile(parentDirectory.toString(), filename, type);
                          //this.writeToFile(parentDirectory.toString(), filename, type);

                      }
                  ).catch(err => {
                          console.log('Error downloading: ', filename); // , err.error
                          document.getElementById('connectionLog').innerHTML = 'Error downloading: ' + filename;
                          console.error(err.status, ' ', err.error, filename);
                          //console.error(err.status);
                          //console.error(err.message);
                          //console.error(err);
                          //console.error(err.toString());
                      })

                  //

              }).catch(err => {
                  document.getElementById('connectionLog').innerHTML = 'Error creating the file: ' + filename;//err.message;
                  //console.error( err);
                  console.log('Error creating the file', filename);
              })
          }
      );






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
        document.getElementById('connectionLog').innerHTML  = 'Error creating the folder: ' + err.message;
        console.log('Error creating the folder', filename);
    })
}
    createFile(parentDirectory, filename, type) {
       // console.log(' creating the folder:' + parentDirectory + ' ; ' + filename)
    return this.file.createFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename, true).catch(err => {
        document.getElementById('connectionLog').innerHTML  = 'Error creating the file: ' + filename;//err.message;
        //console.error( err);
        console.log('Error creating the file', filename);
    })

}

    writeToFile(parentDirectory, filename, type) {
        return this.file.writeFile(this.file.externalRootDirectory + '/Nibras/' + type + '/' + parentDirectory.toString(), filename,
            this.downloadedFile,
            { replace: true, append: false }).then(createdFile => {
            console.log('File written successfully:', filename);
            document.getElementById('connectionLog').innerHTML  = 'File written successfully: ' + filename;
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
    message: 'Are you sure you want to clear completion log and notes? This action CANNOT be undone!',
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
                if (key.startsWith('r-')) {
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
 let v = prompt("Nibras PKM IP (<code>IP(:port)/app-name</code>, e.g.: 192.168.1.23/nibras)", this.ipA)
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
    document.getElementById('connectionLog').innerHTML  = 'Nibras PKM IP has been updated to ' + this.ipA;
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
}

saveIpRepo(){

    this.storage.set('ipRepo', this.ipRepo);
    //this.ipA = this.ipTemp;
    document.getElementById('connectionLog').innerHTML  = 'Nibras repository IP has been updated to ' + this.ipRepo;
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
            if (this.date)
                current_datetime = new Date(this.date)
            else
                current_datetime = new Date()

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
                rtype: this.module == 'r' ? 'doc' : '',
                meta: this.priority ? this.priority : 2,
                priority: this.priority ? this.priority : 2,
                nbFiles: this.selectedFiles.length,
                freshRecord: true,
                filesList: this.selectedFiles,
                date: current_datetime,
                textDate: textDate,
                language: 'ar',
                summary: this.summary ? this.summary : 'Untitled',
                description: this.description != null ? this.description : ''
            }

            console.log('new: record' + this.summary, ' record', record);

            //     (<HTMLInputElement>document.getElementById('nkinputt')).focus();

            this.storage.set('r-' + operationId, record).then(val => {

                this.items.unshift(val)
                //this.items = []
                //this.storage.forEach((value, key, index) => {
                //    if (key.startsWith('r-'))
                //        this.items.unshift(value)
                //    //console.log('found key ', key);
                //})



                this.clearAllForm();


            });



            if (this.summary && this.withFolder){
                //  console.log('Folder created');
                return this.file.createDir(this.file.externalRootDirectory + '/New/' + '/', operationId + ' ' + this.summary, true).then(_ => {
                            //console.log('here call grab all');
                            if(this.platform.is('android')) {
                                console.log('calleding grabAllMoveFilesNew')
                                this.grabAllMoveFilesNew(operationId + ' ' + this.summary)
                            }

                        this.clearAllForm();
                    }
                ).catch(err => {
                        document.getElementById('connectionLog').innerHTML  = 'Error creating the folder' + err.message;
                        console.error(err.error);
                    })
            } else {

                this.clearAllForm();


            }


        }

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
                document.getElementById('logAreaNotes').innerHTML  = 'error creating the folder' + err.message;
                console.error(err);
            })
        } else {

            this.nk = ''
            this.nkt = ''
            this.nkd = ''
            this.priority = 2
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
        this.priority = 2
        this.withFolder = false
        this.grabAll = false

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


    }
    grabAllMoveFiles(subFolder){
        if(this.platform.is('android')) {
            this.file.listDir(this.file.externalRootDirectory, 'New').then(
                    res => {
                    res.forEach((f) => {
                            console.log('outside selection found: ', this.selectedFiles, ' and f.name', f.name)
                            if (this.selectedFiles && this.selectedFiles.includes(f.name)) {
                                console.log('inside selection: ', this.selectedFiles, ' and f.name', f.name)
                                this.file.moveFile(this.file.externalRootDirectory + '/New',
                                    f.name, this.file.externalRootDirectory + '/New/' + subFolder,
                                    f.name).then(
                                        success => {
                                        //console.log('moved file: ', f.name);
                                        document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name
                                        //this.countNewFiles();
                                        //this.nbFiles = 0;

                                    },
                                        error => {
                                        console.log('error: ', error);
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


    grabAllMoveFilesNew(subFolder){
        if(this.platform.is('android')) {
            console.log('calleding grabAllMoveFilesNew inside')
            this.file.listDir(this.file.externalRootDirectory, 'New').then(
                    res => {
                    res.forEach((f) => {
                            console.log('outside selection found: ', this.selectedFiles, ' and f.name', f.name)
                            if (this.selectedFiles && this.selectedFiles.includes(f.name)) {
                                console.log('inside selection: ', this.selectedFiles, ' and f.name', f.name)
                                this.file.moveFile(this.file.externalRootDirectory + '/New',
                                    f.name, this.file.externalRootDirectory + '/New/' + subFolder,
                                    f.name).then(
                                        success => {
                                        //console.log('moved file: ', f.name);
                                        document.getElementById('logAreaNotes').innerHTML = 'Moved file: ' + f.name
                                        //this.countNewFiles();
                                        //this.nbFiles = 0;

                                    },
                                        error => {
                                        console.log('error: ', error);
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
            ['/', 'Download']
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

        //this.nbFiles = 0
        //setTimeout(() =>  {
        //    this.countNewFiles();
        //}, 1000);
        //this.selectedFiles = []

        if (file && file.target.checked) {
            this.multipleDocumentsPicker.pick(2)
                .then(res => {
                    console.log('res =================', res);
                    console.log('res =================', JSON.parse(res));
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

if (!file && this.totalNbFiles > 0) {
    console.error('Setting new files notification')
    let date = new Date();
    date.setTime(date.getTime() + (2 * 1000)) // - 1 hour
    this.localNotifications.schedule({
        id: 1,
        text: this.totalNbFiles + ' new files to settle ',
        title: this.totalNbFiles + ' new files to settle',
        trigger: {at: date},
        group: 'Nibras',
        vibrate: false,
        led: 'FF0000',
        wakeup: false,
        //silent: true,
        badge: this.totalNbFiles
        //, sound: null
    });
}

else if (!file && this.totalNbFiles == 0) {
    console.error('Removing the notification')
    //let date = new Date();
    //date.setTime(date.getTime() + (2 * 1000)) // - 1 hour
    this.localNotifications.clear(1)
}




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
  

  this.storage.get('summary').then(val => {
    this.storage.set('summary', this.nk)
  })

  this.storage.get('description').then(val => {
    this.storage.set('description', this.nktype)
  })
  this.storage.get('module').then(val => {
    this.storage.set('module', this.nkt)
  
  })

  this.storage.get('date').then(val => {
    this.storage.set('date', this.nkd)
  
  })

    this.storage.get('priority').then(val => {
    this.storage.set('priority', this.nkd)

  })

 
}


syncDone(){

  this.storage.get('ipA').then(val => {
    this.ipA = val       
   this.storage.get('tosyncText').then((val) => {
       console.log('tosync:', val)
   const params = new HttpParams()

        var headers = new HttpHeaders();
                         headers.append("Accept", 'application/json');
                         headers.append('Content-Type', 'application/json' );
       const httpOptions = { headers: headers };

 let postData = {
                             "data": val
                         }

     var ipp = this.ipA
     var link = "https://" + ipp + "/sync/mobilePush"
                         this.http.post(link, postData, httpOptions).subscribe(response => {
     //this.http.get(link,{params: params}).subscribe(response => {
    // document.getElementById('logArea').innerHTML = response + ' synced.'     
    this.storage.set('tosyncText', [])
     //this.syncData();
     },
     err => {    
      //document.getElementById('logArea').innerHTML = 'Not synced'//  + err.message
     })

     
   }); 
  }); 

 
}
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
                             "data": val.replace(/<br\/>/g, '\n')
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
                             "data": this.items// val.replace(/<br\/>/g, '\n')
                         }
                         var ipp = this.ipA
                         var link = "https://" + ipp + "/sync/mobileWritingsNew"

                         this.http.post(link, postData, httpOptions).subscribe(response => {
                                 document.getElementById('logAreaNotes').innerHTML = response['result']// + ' You need to manually delete the notes list after verifying its successful sync.'
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



syncData() 
 {


 //
    this.syncDone()

    this.storage.get('ipA').then(val => {

      if (!val || val == 'null' || val == null){
        // console.log('here1111 0: ' + val)
       this.ipA = '192.168.0.11:1441/nibras'
       } else
    
      // this.ipA = '192.168.0.11:1441/nibras'
   this.ipA = val;

   // this.ipA = val    
         var link = "https://" + this.ipA + "/page/heartbeatJson"
  
      this.http.get(link,{}).subscribe(response => {                
        if (response['result'] == 'ok')
        document.getElementById('connectionLog').innerHTML =   'Nibras Desktop online';
        document.getElementById('logAreaNotes').innerHTML =   'Nibras Desktop online';

        // this.syncType('Todo', 'Todo')
        
        this.syncType('T', 'Tasks')
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
    


       let current_datetime = new Date()

  let date =
  current_datetime.getDate().toString().padStart(2, '0') + "." + (current_datetime.getMonth() + 1).toString().padStart(2, '0')  + "." +
  current_datetime.getFullYear() + '_' +
  current_datetime.getHours().toString().padStart(2, '0') + ":" + current_datetime.getMinutes().toString().padStart(2, '0')+ ":" + current_datetime.getSeconds().toString().padStart(2, '0')



    document.getElementById('connectionLog').innerHTML = 'Last synced on ' + date + '.'
    document.getElementById('logAreaNotes').innerHTML = 'Last synced on ' + date + '.'

      },
      err => {               
       document.getElementById('connectionLog').innerHTML =   'Nibras Desktop offline'//  + err.message;
       document.getElementById('logAreaNotes').innerHTML =   'Nibras Desktop offline'//  + err.message;

      //  this.syncType('Todo', 'Todo')

       this.syncType('T', 'Tasks')
   //    this.syncType('Cal', 'Calendar')
       this.syncType('P', 'Planner')
       this.syncType('J', 'Journal')
          this.syncType('O', 'Operations')
       this.syncType('G', 'Goals')
      //  this.syncType('K', 'Nk piles')
      //  this.syncType('E', 'Excerpts')
       this.syncType('N', 'Notes')
   this.syncType('W', 'Writings')
   //this.syncType('Nws', 'News')
   //this.syncType('Art', 'Articles')
   this.syncType('R', 'Resources')
      })

      

   

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

    this.http.get("https://" + this.ipA + "/sync/exportJson" + type).subscribe(response => {     
  let t = type;
this.storage.set('mytext' + t, response['data']);
// document.getElementById('menuItem' + t).innerHTML =   label + ' (' +  response['data'].length + ')'

// Update menu item count
//document.getElementById('menuItem' + t).innerHTML =
//'&nbsp' + t + ' ' + response['data'].length

document.getElementById(type + 'badge').firstChild['data'] =
 response['data'].length



//  type + '<sup>' + response['data'].length + '</sup>'

  // Schedule delayed notification
  
  if(type == 'P'){
    response['data'].forEach((e) =>
    {
    var d = e.meta.split('-');
    let date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
    var id = e.id
    var title = e.title;
    var body = e.body;
    //console.log('sch ' + date);


    this.localNotifications.schedule({
      id: id,
      text: (body ? body : ''),
      title: 'Plan now: ' + title,
      trigger: {at: date},
      group: 'Nibras',
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
      vibrate: true,
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
      vibrate: true,
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
      vibrate: true,
      led: 'FF0000'
      //, sound: null
    });


    }


    )
  
  }
}, err => {
//  let t = type;
  
  this.storage.get('mytext' + type).then((val) => {


      document.getElementById(type + 'badge').firstChild['data'] =
          val.length

      this.itemsMega[type] = val
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

        document.getElementById('searchLog').innerHTML  = 'No search term entered'
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
 
}
