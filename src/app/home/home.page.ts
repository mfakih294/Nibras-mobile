import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
  // encapsulation: ViewEncapsulation.None
})
export class HomePage {

  // @ViewChild('nkinput',{  static: false }) nkinput:IonInput;

  ipA = '192.168.0.11:1441/nibras';
  //ipF;

  nk;
  nkt;
  nkd;
  nktype = 'n';
  ipTemp;
  
  nklog = '';
  nklogt = '';
  isOffline = true;
  tosyncText;
  // public version: string = version;
  
  //PreviewAnyFile: any;

  loading: any;

  constructor(private http: HttpClient,  private file: File,
    private iab: InAppBrowser,
    public alertController: AlertController,
    // private fileOpener: FileOpener,
//private androidPermissions: AndroidPermissions,
    private storage: Storage, private localNotifications: LocalNotifications ){

    // Schedule a single notification

    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      // console.log('Directory doesnt exist'));
      //const textarea = ref(IonTextarea);
      
  
    this.storage.get('nklog').then(val => {
      this.nklog = val
    });

    this.storage.get('nk').then(val => {
      this.nk = val
    });

    this.storage.get('nkt').then(val => {
      this.nkt = val
    });


    this.storage.get('nkd').then(val => {
      this.nkd = val
    });


 this.storage.get('nktype').then(val => {
  if (!val || val == 'null' || val == null){
      this.nktype = 'n'
  }
  else {
  this.nktype = val
  this.storage.set('nktype', 'n')  
  }
    });

    // this.storage.get('ipF').then((val) => {
    //   this.ipF = val;
    // });

    this.storage.get('ipA').then((val) => {
      // console.log('ipa 0: ' + val)
       if (!val || val == 'null' || val == null){
        // console.log('here1111 0: ' + val)
       this.ipA = '192.168.0.11:1441/nibras'
       } else
    
      // this.ipA = 'localhost/nibras'
   this.ipA = val;

   
  //  this.ipA = 'localhost/nibras'
  //  this.storage.set('ipA', 'localhost/nibras')
   
this.refresh();
this.syncData();
 
     
   // this.syncAll();
    }).catch(()=>{
      console.log('===================error catch' )
      this.ipA = '192.168.0.11:1441/nibras'
      this.storage.set('ipA', '192.168.0.11:1441/nibras')
    });

    var link = "https://" + this.ipA + "/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('logArea').innerHTML =   'Nibras PKM is online';    
      this.isOffline = false
      //console.log ('res' + response['result'])
    },
    err => {               
    document.getElementById('logArea').innerHTML =   'Nibras PKM is offline';
    this.syncData();
  // this.ipA = '192.168.0.11:1441/nibras'
  

    })

    this.storage.get('tosyncText').then((val) => {
      if (val){
        this.tosyncText = val  
      } else {
        this.storage.set('tosyncText', '')
      }
      });

   //   this.syncData()
  
} // end of constructor

refresh(){
	/*
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  );
  */
  this.storage.get('ipA').then((val) => {
    this.ipA = val;
    var link = "https://" + this.ipA + "/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('logArea').innerHTML =   'Nibras Desktop online';    
      this.isOffline = false
      //console.log ('res' + response['result'])
    },
    err => {               
     document.getElementById('logArea').innerHTML =   'Nibras Desktop offline'//  + err.message;
     this.isOffline = true
    })
  })

  
  // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGEs.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  

  
// this.localNotifications.schedule({
//   id: 1,
//   text: 'Nibras mobile single Local Notification',
//   title: 'Notification title: an alarm',
//   trigger: {at: new Date(new Date().getTime() + 10000)},
//   data: { secret: 'secret' }
// });
}

async clearSync(){

  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to clear completion log and notes?',
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

          this.storage.set('tosyncText', '')
  this.tosyncText = ''
  this.storage.set('nklog', '')
  this.storage.set('nklogt', '')
  this.nklog = ''
  document.getElementById('logAreaNotes').innerHTML  = 'All has been cleared.';


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
  
    this.storage.set('ipA', this.ipTemp);
    this.ipA = this.ipTemp;
    document.getElementById('logArea').innerHTML  = 'Nibras PKM IP has been updated to ' + this.ipTemp;
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
    
  
  
}



savek(){

  //document.getElementById('nkinput').focus();
  

  this.storage.get('nklog').then(val => {
    if (!this.nk && !this.nkt){
    document.getElementById('logArea').innerHTML = 'No text to append';
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
current_datetime.getHours().toString().padStart(2, '0') + "" + current_datetime.getMinutes().toString().padStart(2, '0')

    this.nklog = 'A ' + this.nktype + ' p2 d- (' + date +
      ' -- ' + (this.nkt ? this.nkt : 'Untitled') + ' :: \n'  + (this.nk != null ? this.nk : '') + '\n***\n'    
    + val 
    this.storage.set('nklog', this.nklog)
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
    

    this.nk = ''
    this.nkt = ''
    this.nkd = ''

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
    
  })
  //document.getElementById('nkinput').setFocus()
  //setTimeout(() => { document.getElementById('nkinput').focus(); }, 500); 
  //this.nkinput.setFocus();  
}

savecopy(){

  //document.getElementById('nkinput').focus();
  

  this.storage.get('nk').then(val => {      
    this.storage.set('nk', this.nk)  
  })

  this.storage.get('nktype').then(val => {      
    this.storage.set('nktype', this.nktype)  
  })
  this.storage.get('nkt').then(val => {        
    this.storage.set('nkt', this.nkt)    
  
  })

  this.storage.get('nkd').then(val => {        
    this.storage.set('nkd', this.nkd)    
  
  })

  
 
}


syncDone(){
  this.storage.get('ipA').then(val => {
    this.ipA = val       
   this.storage.get('tosyncText').then((val) => {
   const params = new HttpParams()
   .set('tosyncText', val); 
   const httpOptions = {
     headers: new Headers({
       'Content-Type':  'application/json'
       }), params
     }; 
     var ipp = this.ipA
     var link = "https://" + ipp + "/sync/mobilePush"
     this.http.get(link,{params: params}).subscribe(response => {          
    // document.getElementById('logArea').innerHTML = response + ' synced.'     
     this.storage.set('tosyncText', '')
     //this.syncData();
     },
     err => {    
      document.getElementById('logArea').innerHTML = 'Not synced'//  + err.message
     })

     
   }); 
  }); 

 
}
syncWritings() 
 {
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
      document.getElementById('logAreaNotes').innerHTML = response['result']
     this.storage.set('nklog', '')
     this.nklog = ''
     this.syncData();
      },
      err => {    
       document.getElementById('logAreaNotes').innerHTML = 'Not synced'// + err.message
      })
    });
   });
   

 
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
        document.getElementById('logArea').innerHTML =   'Nibras Desktop online';    
        
        // this.syncType('Todo', 'Todo')
        
        this.syncType('T', 'Tasks')
        // this.syncType('Cal', 'Calendar')
        this.syncType('P', 'Planner')
        this.syncType('J', 'Journal')

        this.syncType('G', 'Goals')
        // this.syncType('K', 'Nk piles')
         this.syncType('E', 'Excerpts')
        this.syncType('N', 'Notes')
    this.syncType('W', 'Writings')
    this.syncType('Nws', 'News')
    this.syncType('Art', 'Articles')
    this.syncType('R', 'Resources')
    

  

    document.getElementById('logArea').innerHTML = 'All were synced.'

      },
      err => {               
       document.getElementById('logArea').innerHTML =   'Nibras Desktop offline'//  + err.message;
         
      //  this.syncType('Todo', 'Todo')

       this.syncType('T', 'Tasks')
   //    this.syncType('Cal', 'Calendar')
       this.syncType('P', 'Planner')
       this.syncType('J', 'Journal')

       this.syncType('G', 'Goals')
      //  this.syncType('K', 'Nk piles')
        this.syncType('E', 'Excerpts')
       this.syncType('N', 'Notes')
   this.syncType('W', 'Writings')
   this.syncType('Nws', 'News')
   this.syncType('Art', 'Articles')
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
document.getElementById('menuItem' + t).innerHTML = 
'&nbsp' + response['data'].length
//  type + '<sup>' + response['data'].length + '</sup>'

  // Schedule delayed notification
  
  if(type == 'P'){
    response['data'].forEach((e) =>
    {
    var d = e.meta.split('-');
    var date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
    var id = e.id
    var title = e.title;
    var body = e.body;
    //console.log('sch ' + date);
    this.localNotifications.schedule({
      id: id,
      text: (body ? body : ''),
      title: 'Plan: ' + title,
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
    // if (val.length > 0){
    document.getElementById('menuItem' + type).innerHTML = 
    '&nbsp' + val.length
    //  type + '<sup>' +  val.length + '</sup>'
    //  };
    });

});


  }

  update() 
  {
   this.storage.set('ipA', this.ipA);
   console.log('ip local : ' , this.ipA)
   this.storage.get('ipA').then((val) => {
     console.log('ip storage: ' , val);    
      });
   
 
      console.log('ip1local : ' , this.ipA)
   this.storage.get('ipA').then((val) => {
     console.log('ip1storage: ' , val);
     this.ipA = val    
      });
      console.log('ip2local : ' , this.ipA)
 
   if (this.ipA){
     
    
     //mytext = ''
     //fetch('http://localhost:1441/page/heartbeat', {})
       //.then(res => res.json())
       //.then(posts => console.log('posts ' + posts))
     
       // this.storage.get('ipA').then((val) => {
         // this.ipA = val;    
         //  });
          console.log('IP found in local storage.', this.ipA)
   
   
   // console.log(response['data'])
   
   
     // Or to get a key/value pair
      
     //  storage.get('name').
      } else {
        console.log('local ip not set!!')
     }
   
   
   //pipe(map((res: Response) =>{
   //var data = res.json();
   //console.log('my data: ', data);
   //}));
   
 
   
 }
 

 
}
