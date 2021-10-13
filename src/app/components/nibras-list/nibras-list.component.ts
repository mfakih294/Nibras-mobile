import { Component, OnInit, Input } from '@angular/core';

import { Storage } from '@ionic/storage';
 import { File } from '@ionic-native/file/ngx';
  import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { ModalController } from '@ionic/angular';
import { ExampleModalPage } from '../../example-modal/example-modal.page'


@Component({
  selector: 'app-nibras-list',
  templateUrl: './nibras-list.component.html',
  styleUrls: ['./nibras-list.component.scss'],
})
export class NibrasListComponent implements OnInit {
  
  @Input() items: [];
@Input() expanded: boolean;
tosyncText: String;
dataReturned:any;
//t: String;

  constructor(private storage: Storage, private file: File,
    private clipboard: Clipboard,
    private fileOpener: FileOpener,
    public modalController: ModalController,
    private iab: InAppBrowser) { 
this.expanded = false

this.storage.get('tosyncText').then((val) => {
  this.tosyncText = val  
   }).catch(()=>{
    
    this.tosyncText = ''
    this.storage.set('tosyncText', '')
  });

  }


  //item.ecode, item.rtype, item.id, item.title, item.body, item.files
  async openModal(ecode, rtype, id, title, language, contents, files) {
/*
    var path 
    if (ecode == 'R')
    path = 'Nibras/' + ecode + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
    else path = 'Nibras/' + ecode + '/' + id + '/' + name;
   
    this.t = path + '.123\n' 
  
    this.file.listDir(this.file.externalRootDirectory, '/' +  path ).then((result) => {
         // result will have an array of file objects with 
         //file details or if its a directory
              
         //document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'obj ' + result.entries.length//toString()
         for (let file of result) {
        
          // if (file.isDirectory == true) {
           // t.push("-- " + file.name + '');
            // Code if its a folder
            
          // } else 
           if (file.isFile == true) {
             // Code if its a file
            //  console.log("This is a file"); (click)="openRFile(item.type, item.rtype, item.id, file)
             let name = file.name // File name
             this.t+= name + '\n'// "<span (click)='openRFile(" + item.type + ', ' + item.rtype + ',' + item.id + ',' + name + ")'> " + 
                           //name + type + item.id + '</span><br/> <b> bold </b>';
     
           }
         }


         /////

         
    
          
      }).catch(
        (err) => {
      
        this.t = '111111111111111.111'// + err.toString()
        }
        );
        
   */    
    const modal = await this.modalController.create({
      component: ExampleModalPage, cssClass: 'nbrModal',
      componentProps: {
        "ecode": ecode,
        "rtype": rtype,
        "language": language,        
        "id": id,
        "title": title,
        "contents": contents,
        "files": files
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }



  copyText(title, body){
    this.clipboard.copy(title + ' :: ' + body.replace(/<br\/>/g, '\n'));
    document.getElementById('copyLog').innerHTML = '<b>Copied</b>'
  }

clean(text){
  return (text != '' ? text.replace(/<br\/>/g, ' ').substring(0, 200) : '')
}
openNext(item) 
{
  document.getElementById(item.type + '' + item.id + 'fullText').innerHTML = item.body
  document.getElementById(item.type + '' + item.id + 'preview').innerHTML = ''
  
  document.getElementById(item.type + '' + item.id + 'actionsRow').classList.remove('hidden');
  document.getElementById(item.type + '' + item.id + 'preview').classList.remove('hidden');
  document.getElementById(item.type + '' + item.id + 'closeRow').classList.remove('hidden');
  document.getElementById('nkinput').setAttribute('value', item.ecode + item.id + ': ');
}
showFiles(item) 
{
  //document.getElementById(item.type + '' + item.id).innerHTML = item.body
  document.getElementById(item.type + '' + item.id + 'filesTr').classList.remove('hidden');
}
close(item) 
{
  
  document.getElementById(item.type + '' + item.id + 'preview').innerHTML = this.clean(item.body)
  document.getElementById(item.type + '' + item.id + 'title').scrollIntoView();
  document.getElementById(item.type + '' + item.id + 'preview').classList.add('justRead');
  document.getElementById(item.type + '' + item.id + 'title').classList.add('justRead');
  document.getElementById(item.type + '' + item.id + 'closeRow').classList.add('hidden');

  // document.getElementById(item.type + '' + item.id + 'fullText').innerHTML = ''
  
  document.getElementById(item.type + '' + item.id + 'fullText').classList.add('hidden');
}

 markDone(item) 
{
  // document.getElementById(item.type + '' + item.id).innerHTML = ''
  this.storage.get('tosyncText').then((val) => {
    this.storage.set('tosyncText', val + ','  + item.ecode + '' + item.id  );
    // console.log('add to sync: ' , item.ecode + '' + item.id + '');    
     }).catch(()=>{
    
      this.storage.set('tosyncText', ','  + item.ecode + '' + item.id )
    })
  //  this.storage.set('tosyncText', ','  + item.ecode + '' + item.id );
  //  this.tosyncText = item.ecode + '' + item.id 
    //  document.getElementById(item.type + '' + item.id + 'title').classList.add('done');
     
    //  document.getElementById(item.type + '' + item.id + 'preview').classList.add('done');

    //  document.getElementById(item.type + '' + item.id + 'preview').classList.add('justDone');
    //  document.getElementById(item.type + '' + item.id + 'title').classList.add('justDone');
     
}


listFilenames(item){
//this.file.externalRootDirectory
//+ item.type + '/' + item.id 
var path = item.type + '/' + item.rtype + '/' + Math.floor(item.id/100).toString() + '/' + item.id //+ '/' + name;
      this.file.listDir(this.file.externalRootDirectory, 'Nibras/' +  path ).then((result) => {
         // result will have an array of file objects with 
         //file details or if its a directory
         var t = []         
         //document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'obj ' + result.entries.length//toString()
         for (let file of result) {
        
           if (file.isDirectory == true) {
           // t.push("-- " + file.name + '');
            // Code if its a folder
           } else if (file.isFile == true) {
             // Code if its a file
            //  console.log("This is a file"); (click)="openRFile(item.type, item.rtype, item.id, file)
             let name = file.name // File name
             t.push(name)// "<span (click)='openRFile(" + item.type + ', ' + item.rtype + ',' + item.id + ',' + name + ")'> " + 
                           name + item.type + item.id + '</span><br/> <b> bold </b>';
            // let path = file.path // File path
            //  file.getMetadata(function (metadata) {
              //  let size = metadata.size; // Get file size
               
            //  })
           }
         }
         //document.getElementById(item.type + '' + item.id + 'files1').innerHTML = t
         return t
      }).catch(
        (err) => {
        //console.log('error listing directory');
        // console.log(err);
        // document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'error ' + err.message
        return []
        }
        );
        
       
      
    

      // this.file.checkDir(this.file.externalRootDirectory, 'Nibras').then(_ =>
      //    document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'directory exists'
      //    ).catch(err =>
      //   document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'Directory doesnt exist ' + err
      //   );

      
      
}



openRFile(ecode, rtype, id, name){


  var path = 'Nibras/' + ecode + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
  

  let ext = new Map([
    ["pdf","application/pdf"],
    ["mp3","audio/mpeg"],
    ["m3a","audio/mpeg"],
    ["mpga","audio/mpeg"],
    ["mp4","video/mp4"],
    ["mp4v","video/mp4"],
    ["mpg4","video/mp4"],
    ["txt","text/plain"],
    ["text","text/plain"],
    ["md","text/plain"],
    ["tex","text/plain"],
    ["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ["ppt","application/vnd.ms-powerpoint"],
    ["doc","application/msword"],
    ["wma","audio/x-ms-wma"],
    ["mkv","mk3d"],
    ["mkv","mk3d"],
    ["avi","video/x-msvideo"],
    ["epub","application/epub+zip"],
    ["mobi","application/x-mobipocket-ebook"],
    ["html","text/html"],
    ["htm","text/html"],
    ["png","image/png"],
    ["jpeg","image/jpeg"],
    ["jpg","image/jpeg"],
    ["bmp","image/bmp"],
    ["csv","text/csv"],
    ["gif","image/gif"],
    ["ogg","audio/ogg"],
    ["opus","audio/opus"],
    ["3gp","video/3gpp"],
    ["m4a","audio/mp4"]
  ]);

  

   this.fileOpener.showOpenWithDialog(
     //'/storage/emulated/0/Nibras/' + path
     this.file.externalRootDirectory + path, 
     ext.get(name.split('.')[1])
     
     )
   .then(() => document.getElementById(ecode+id + 'copy').innerHTML = this.file.externalRootDirectory + path + ' opened...')
    .catch(e =>document.getElementById(ecode+id + 'copy').innerHTML ='Error opening file ' + e.message + ' ' +
     this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1])) ;
   
  //this.storage.get('ipF').then((val) => { 
  //const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
  //});
}


openFile(type, id, name){


  var path = 'Nibras/' + type + '/' + id + '/' + name;
  //this.storage.get('ipF').then((val) => { 
 // const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
//  });

  
 // var path = 'Nibras/' + type + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
  //document.getElementById(type + '' + id + 'files').innerHTML = ' path ' + path

  let ext = new Map([
    ["pdf","application/pdf"],
    ["mp3","audio/mpeg"],
    ["m3a","audio/mpeg"],
    ["mpga","audio/mpeg"],
    ["mp4","video/mp4"],
    ["mp4v","video/mp4"],
    ["mpg4","video/mp4"],
    ["txt","text/plain"],
    ["text","text/plain"],
    ["md","text/plain"],
    ["tex","text/plain"],
    ["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ["ppt","application/vnd.ms-powerpoint"],
    ["doc","application/msword"],
    ["wma","audio/x-ms-wma"],
    ["mkv","mk3d"],
    ["mkv","mk3d"],
    ["avi","video/x-msvideo"],
    ["epub","application/epub+zip"],
    ["mobi","application/x-mobipocket-ebook"],
    ["html","text/html"],
    ["htm","text/html"],
    ["png","image/png"],
    ["jpeg","image/jpeg"],
    ["jpg","image/jpeg"],
    ["bmp","image/bmp"],
    ["csv","text/csv"],
    ["gif","image/gif"],
    ["ogg","audio/ogg"],
    ["opus","audio/opus"],
    ["3gp","video/3gpp"],
    ["m4a","audio/mp4"]
  ]);


   this.fileOpener.showOpenWithDialog(
     //'/storage/emulated/0/Nibras/' + path
     this.file.externalRootDirectory + path, ext.get(name.split('.')[1]))
   .then(() => document.getElementById(type+id + 'copy').innerHTML = name + ' opened')
    .catch(e =>document.getElementById(type+id + 'copy').innerHTML ='Error opening file ' + e.message + ' ' +
     this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1])) ;
}


  ngOnInit() {}

}
