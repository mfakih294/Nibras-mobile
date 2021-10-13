
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.page.html',
  styleUrls: ['./example-modal.page.scss'],
})
export class ExampleModalPage implements OnInit {

  // modalTitle:string;
  // modelId:string;

  title:string;
  contents:string;
  files:string;
  ecode:string;
  rtype:string;
  language:string;
  id:string;
 

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private clipboard: Clipboard,
    private file: File,    
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    // this.modelId = this.navParams.data.paramID;
    // this.modalTitle = this.navParams.data.paramTitle;

    this.title = this.navParams.data.title;
    this.contents = this.navParams.data.contents;
    this.files = this.navParams.data.files;
    this.ecode = this.navParams.data.ecode;
    this.rtype = this.navParams.data.rtype;
    this.language = this.navParams.data.language;
    this.id = this.navParams.data.id;
  }


  copyText(title, body){
    this.clipboard.copy(title + ' \n ' + body.replace(/<br\/>/g, '\n'));
    document.getElementById('copyLog').innerHTML = '<i>Copied</i>'
  }

  async closeModal() {
    const onClosedData: string = "...";
    await this.modalController.dismiss(onClosedData);
  }


  

openRFile(ecode, rtype, id, name){


  var path 
  if (ecode == 'R')
  path = 'Nibras/' + ecode + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
  else path = 'Nibras/' + ecode + '/' + '/' + id + '/' + name;
  

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
   .then(() => document.getElementById(ecode+id + 'log').innerHTML = this.file.externalRootDirectory + path + ' opened...')
    .catch(e =>document.getElementById(ecode+id + 'log').innerHTML ='Error opening file ' + e.message + ' ' +
     this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1])) ;
   
  //this.storage.get('ipF').then((val) => { 
  //const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
  //});
}




}
