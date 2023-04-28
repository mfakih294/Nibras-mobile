import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {ChangeDetectorRef} from '@angular/core'


@Component({
    selector: 'app-example-modal',
    templateUrl: './example-modal.page.html',
    styleUrls: ['./example-modal.page.scss'],
})
export class ExampleModalPage implements OnInit {

    // modalTitle:string;
    // modelId:string;


    // new consistant fields set
    operationId;
    ecode = 'o';
    resourceType;
    summary;
    description;
    module;
    priority;
    language;
    date;
    textDate;
    nbFiles;
    filesList;
    freshRecord;

///////////

    appends: string[] = [];


    id:string;

    edit:boolean;

    textToAppend: string;

    fontSize: number = 1;


    constructor(private modalController:ModalController,
                private navParams:NavParams,
                private clipboard:Clipboard,
                private file:File,
                public alertController: AlertController,
                private fileOpener:FileOpener,
                private changeRef: ChangeDetectorRef,
                private storage:Storage) {

         }

    ngOnInit() {



        //console.table(this.navParams);
        // this.modelId = this.navParams.data.paramID;
        // this.modalTitle = this.navParams.data.paramTitle;
        //operationId;
        //ecode = 'o';
        //resourceType;
        //summary;
        //description;
        //module = 'n';
        //priority = 2;
        //language;
        //textDate;
        //nbFiles = 0;
        //filesList;
        this.id = this.navParams.data.id;
        this.summary = this.navParams.data.summary;
        this.description = this.navParams.data.description;
        this.filesList = this.navParams.data.filesList;
        this.freshRecord = this.navParams.data.freshRecord;
        this.nbFiles = this.navParams.data.nbFiles;
        this.ecode = this.navParams.data.ecode;
        this.resourceType = this.navParams.data.resourceType;
        this.module = this.navParams.data.module;
        this.priority = this.navParams.data.priority;
        this.date = this.navParams.data.date;
        this.textDate = this.navParams.data.textDate; //todo, reconstruct
        this.language = this.navParams.data.language;
        this.operationId = this.navParams.data.operationId;
        this.appends = this.navParams.data.appends;


        console.log('here init', this.appends)




        this.storage.get('fontSize').then((val) => {


            if (!val || val == 'null' || val == null){
                this.fontSize = 1
                this.storage.set('fontSize', 1)
            }
            else {
                this.fontSize = val

            }

        });


        //console.log(' in ngOnInit id', this.navParams.data.nkId);
    }


    showEditForm(ecode, id) {
        //this.clipboard.copy(summary + ' \n ' + description.replace(/<br\/>/g, '\n'));
        document.getElementById('edit' + ecode + '' + id).classList.remove('hidden')
    }

    copyText(summary, description) {
        this.clipboard.copy(summary + ' \n ' + description.replace(/<br\/>/g, '\n'));
        document.getElementById('copyLog').innerHTML = '<i>Copied</i>'
    }

     async deleteRecord(ecode, id) {


         const alert = await
         this.alertController.create({
             header: 'Confirm!',
             message: 'Are you sure you want to delete the record? This action CANNOT be undone!',
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

                         if (ecode == 'o') {
                             this.storage.remove('r-' + id)
                             document.getElementById('log' + ecode + '' + id).innerHTML = 'Deleted'
                             document.getElementById('card' + ecode + '' + id).innerHTML = 'Deleted'
                             document.getElementById('deleteLog').innerHTML = 'Deleted'
                         }

                     }
                 }
             ]
         });

         await
         alert.present();
         let result = await
         alert.onDidDismiss();
         //console.log(result);




     }

    async closeModal()
    {
        const onClosedData:string = "...";
        await this.modalController.dismiss(onClosedData);
    }


    updateRecord() {
        //console.log('in modal update Record')
        let id = this.operationId;


        let current_datetime
        if (this.date)
            current_datetime = new Date(this.date)
        else
            current_datetime = new Date()

        let textDate =
            current_datetime.getDate().toString().padStart(2, '0') + "." +
            (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "." +
            current_datetime.getFullYear() + '_' +
            current_datetime.getHours().toString().padStart(2, '0') + "" +
            current_datetime.getMinutes().toString().padStart(2, '0')


        let record = {
            ecode: 'o',
            id: this.operationId, // todo, to remove
            operationId: this.operationId,
            resourceType: this.resourceType,
            module: this.module,
            summary: this.summary,
            description: this.description,
            priority: this.priority,
            meta: this.priority,
            date: this.date,
            language: this.language,
            textDate: textDate,
            nbFiles: this.nbFiles,
            filesList: this.filesList,
            freshRecord: true
            //date: this.da
        }

        this.storage.set('r-' + this.operationId, record).then((val) => {
            document.getElementById("edit" + record.ecode + '' + record.operationId).classList.add('hidden');
            document.getElementById("updateLog" + record.ecode + '' + record.operationId).innerText = 'Record updated';

        }).catch(()=> {

        });

    }


    appendNote(ecode, id) {

        let current_datetime = new Date()

        let dateId =
            current_datetime.getFullYear() + '.' +
            (current_datetime.getMonth() + 1).toString().padStart(2, '0') + "." +
            current_datetime.getDate().toString().padStart(2, '0') + "_" +

            current_datetime.getHours().toString().padStart(2, '0') + "" + current_datetime.getMinutes().toString().padStart(2, '0')
            + "" + current_datetime.getSeconds().toString().padStart(2, '0')


        this.storage.set('u-a-' + ecode + '-' + id + '=' + dateId, this.textToAppend).then(val => {
            console.log('found append in storage ', val);

            document.getElementById('appendLog').innerHTML = 'Appended: <br/>' + this.textToAppend
            //document.getElementById('appendLog' + ecode + id).innerHTML += this.textToAppend

            this.textToAppend = ''

          //  this.appends.push(val)
        //    console.log('updated ', this.appends);
        });




/*

        this.storage.get('tosyncText').then((val) => {

            console.log('val ', val);

            let newval


            if (val == {} || val == null || val == [] || Object.keys(val).length == 0) {
                val = [{ecode: ecode, id: id, textToAppend: this.textToAppend}]
                console.log('val empty');
            }
            //else newval = JSON.parse(val)
            else val.push({ecode: ecode, id: id, textToAppend: this.textToAppend})

            console.log('val data', val);

            this.storage.set('tosyncText', val);

            document.getElementById('appendLog').innerHTML = 'Appended: <br/>' + this.textToAppend
            this.textToAppend = ''

        }).catch((err)=> {
            console.log('error appending text');
            document.getElementById('appendLog').innerHTML = 'error appending text'
            console.log('err ', err.message);
        })

        */


    }


    openRFile(ecode, rtype, id, name) {

/* old code, for old structure
        var path
        if (ecode == 'R')
            path = 'Nibras/' + ecode + '/' + rtype + '/' + Math.floor(id / 100).toString() + '/' + id + '/' + name;
        else path = 'Nibras/' + ecode + '/' + '/' + id + '/' + name;
*/

    var path = 'Nibras/' + ecode + '/' + id + '/' + name; //  rtype + '/' + Math.floor(id/100).toString()



        let ext = new Map([
            ["pdf", "application/pdf"],
            ["mp3", "audio/mpeg"],
            ["m3a", "audio/mpeg"],
            ["mpga", "audio/mpeg"],
            ["mp4", "video/mp4"],
            ["mkv", "video/x-matroska"],
            ["mp4v", "video/mp4"],
            ["mpg4", "video/mp4"],
            ["txt", "text/plain"],
            ["text", "text/plain"],
            ["md", "text/plain"],
            ["tex", "text/plain"],
            ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
            ["ppt", "application/vnd.ms-powerpoint"],
            ["xls", "application/vnd.ms-excel"], //todo to check (xls)
            ["doc", "application/msword"],
            ["wma", "audio/x-ms-wma"],
            ["avi", "video/x-msvideo"],
            ["epub", "application/epub+zip"],
            ["mobi", "application/x-mobipocket-ebook"],
            ["html", "text/html"],
            ["htm", "text/html"],
            ["png", "image/png"],
            ["jpeg", "image/jpeg"],
            ["jpg", "image/jpeg"],
            ["bmp", "image/bmp"],
            ["csv", "text/csv"],
            ["gif", "image/gif"],
            ["ogg", "audio/ogg"],
            ["opus", "audio/opus"],
            ["3gp", "video/3gpp"],
            ["m4a", "audio/mp4"]
        ]);

        var re = /(?:\.([^.]+))?$/;
        let extension = re.exec(name)//name.split('.').pop();

console.log('ext is', ext.get(extension[1]))
        this.fileOpener.showOpenWithDialog(//showOpenWithDialog( //open
            //'/storage/emulated/0/Nibras/' + path
            this.file.externalRootDirectory + path,
            ext.get(extension[1])
        )
            .then(() => document.getElementById(ecode + id + 'copy').innerHTML = this.file.externalRootDirectory + path + ' opened...')
            .catch(e =>document.getElementById(ecode + id + 'copy').innerHTML = 'Error opening file ' + e.message + ' ' +
                this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1]));

        //this.storage.get('ipF').then((val) => {
        //const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
        //});
    }

    increaseFont (){
        this.fontSize = this.fontSize * 1.1;
        this.storage.set('fontSize', this.fontSize)
    }
    decreaseFont (){
        this.fontSize = this.fontSize / 1.1;
        this.storage.set('fontSize', this.fontSize)
    }
}
