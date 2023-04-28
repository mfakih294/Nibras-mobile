import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';


import { Clipboard } from '@ionic-native/clipboard/ngx';

import { ModalController } from '@ionic/angular';
import { ExampleModalPage } from '../../example-modal/example-modal.page'

import { HomePage } from '../../home/home.page';


@Component({
    selector: 'app-nibras-list',
    templateUrl: './nibras-list.component.html',
    styleUrls: ['./nibras-list.component.scss'],
})
export class NibrasListComponent implements OnInit {

    @Input() items:[];
    @Input() type:any;
    listall:string[];
    @Input() expanded:boolean;
    tosyncText:String;
    username;
    dataReturned:any;
    nkId;
    nk;
    ipA;
    ecode;
    rtype;

    nkt;
    nktype = 'n';
    module = 'n';
    nbFiles;
    filesList;
    freshRecord;
    nkd;
    date;
    priority;

    slideOptions = {
        spaceBetween: 15,
        centeredSlides: false,
        slidesPerView: 1,
        scrollbar: true
    }
//t: String;

    constructor(private storage:Storage,
                private http:HttpClient,
                private file:File,
                private httpp:HTTP,
                public alertController:AlertController,
                private clipboard:Clipboard,
                private fileOpener:FileOpener,
                public platform:Platform,
                public modalController:ModalController,
                private iab:InAppBrowser) {
        this.expanded = false

        this.storage.get('ipA').then((val) => {
            // console.log('ipa 0: ' + val)
            if (!val || val == 'null' || val == '' || val == null) {
                // console.log('here1111 0: ' + val)
                this.ipA = 'localhost:1441/'
                //this.ipTemp = '192.168.0.11:1441/nibras'
            } else {
                // this.ipA = 'localhost/nibras'
                this.ipA = val;
                //this.ipTemp = val;
            }
        })


        //this.nk = ''
        //this.nkt = ''
        //this.nkd = ''
        //this.nktype = 'n'

        this.storage.get('tosyncText').then((val) => {
            this.tosyncText = val
        }).catch(()=> {

//    this.tosyncText = ''
//    this.storage.set('tosyncText', {})
            this.storage.set('tosyncText', JSON.stringify({data: []}))
        });


        this.storage.get('username').then((val) => {
            this.username = val
        }).catch(()=> {
        });

    }

    async editModal(ecode, id, files) {


        this.storage.get('r-' + id).then((val) => {
            document.getElementById("edit" + val.ecode + '' + id).classList.remove('hidden');
            //document.getElementById("editLog" + record.ecode + '' + record.id).innerText = 'Record updated';
            this.nkId = id
            this.nk = val.body
            this.nkt = val.title
            this.ecode = val.ecode
            this.module = val.module
            this.nktype = val.ecode
            this.priority = val.priority
            this.date = val.date
            this.nbFiles = val.nbFiles
            this.freshRecord = val.freshRecord
            this.filesList = val.fileNames


        }).catch(()=> {

        });

        const modal = await this.modalController.create({
            component: ExampleModalPage, cssClass: 'nbrModal',
            componentProps: {
                nkId: this.nkId,
                id: this.nkId,
                "ecode": this.ecode,
                "module": this.module,
                "rtype": this.nktype,
                "language": 'ar',
                "title": this.nkt,
                "contents": this.nk,
                "date": this.date,
                "nbFiles": this.nbFiles,
                "filesList": this.filesList,
                "freshRecord": this.freshRecord,
                edit: true

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


    //item.ecode, item.rtype, item.id, item.title, item.body, item.files

    async openModal(ecode, module, resourceType, id, summary, language, priority, date, description, nbFiles, filesList, freshRecord) {
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


        //this.storage.get('r-' + id).then(val => {
        //    console.log('inside open modal using storage', val);

        const modal = await this.modalController.create({
            component: ExampleModalPage, cssClass: 'nbrModal',
            componentProps: {
                "ecode": ecode,
                "module": module,
                "resourceType": resourceType,
                "language": language,
                "priority": priority,
                "id": id,
                "date": date,
                "operationId": id,
                "summary": summary,
                "description": description,
                "filesList": filesList,
                "freshRecord": freshRecord,
                "nbFiles": nbFiles
            }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                //alert('Modal Sent Data :'+ dataReturned);
            }
        });

        return await modal.present();
//})

    }


    copyText(title, body) {
        this.clipboard.copy(title + ' :: ' + body.replace(/<br\/>/g, '\n'));
        document.getElementById('copyLog').innerHTML = '<b>Copied</b>'
    }

    clean(text) {
        if (text)
            return (text != '' ? text.substring(0, 80) : '') //replace(/<br\/>/g, ' ')
        else return ''
    }


    updateRecord() {
        console.log('in editRecord')
        let id = this.nkId;
        console.log('to update body', this.nk)
        console.log('to update title', this.nkt)
        console.log('to update date', this.nkd)
        console.log('to update type ', this.nktype)

        let record = {
            id: this.nkId,
            ecode: this.ecode,
            rtype: this.rtype,
            type: this.nktype,
            title: this.nkt,
            body: this.nk,
            priority: this.priority,
            meta: this.priority,
            date: this.nkd
        }

        this.storage.set('r-' + this.nkId, record).then((val) => {
            document.getElementById("edit" + record.ecode + '' + record.id).classList.add('hidden');
            document.getElementById("editLog" + record.ecode + '' + record.id).innerText = 'Record updated';

        }).catch(()=> {

        });


    }


    openNext(item) {
        document.getElementById(item.type + '' + item.id + 'fullText').innerHTML = item.body
        document.getElementById(item.type + '' + item.id + 'preview').innerHTML = ''

        document.getElementById(item.type + '' + item.id + 'actionsRow').classList.remove('hidden');
        document.getElementById(item.type + '' + item.id + 'preview').classList.remove('hidden');
        document.getElementById(item.type + '' + item.id + 'closeRow').classList.remove('hidden');
        document.getElementById('nkinput').setAttribute('value', item.ecode + item.id + ': ');
    }

    showFiles(item) {
        //document.getElementById(item.type + '' + item.id).innerHTML = item.body
        document.getElementById(item.ecode + '' + item.id + 'filesTr').classList.remove('hidden');
    }

    close(item) {

        document.getElementById(item.type + '' + item.id + 'preview').innerHTML = this.clean(item.body)
        document.getElementById(item.type + '' + item.id + 'title').scrollIntoView();
        document.getElementById(item.type + '' + item.id + 'preview').classList.add('justRead');
        document.getElementById(item.type + '' + item.id + 'title').classList.add('justRead');
        document.getElementById(item.type + '' + item.id + 'closeRow').classList.add('hidden');

        // document.getElementById(item.type + '' + item.id + 'fullText').innerHTML = ''

        document.getElementById(item.type + '' + item.id + 'fullText').classList.add('hidden');
    }


    //setUsername(id, newUsername) {
    //for (var i = 0; i < jsonObj.length; i++) {
    //    if (jsonObj[i].Id === id) {
    //        jsonObj[i].Username = newUsername;
    //        return;
    //    }
    //}
//}

// Call as

    getAllFavorites() {
        //var promise = new Promise((resolve, reject) => {


        //this.storage.forEach((value, key, index) => {
        //    this.listall.push(value);
        //    console.log('found key ', key);
        //}).then((d) => {
        //    return (this.listall);
        //});


        //});
        //return promise;
    }


    markDone(item) {

        //this.getAllFavorites().then((d) => {
        //    console.log('all keys ', d);
        //});


        //this.storage.forEach((value, key, index) => {
            //this.listall.push(value);
            //console.log('found key ', key);
        //})


        //  setUsername(3, "Thomas");

//        this.storage.set('tosyncText', JSON.stringify({data: []}))

        /**
         let test = {data: [{ecode: "123", id: "44"}]}
         console.log('class of test', typeof test)
         console.log('is array', test.data instanceof Array)

         this.storage.set('test', JSON.stringify(test))


         this.storage.get('test').then((val) => {
    console.log('class of restored item', typeof val);
console.log('class of restored item after parsing ', typeof JSON.parse(val));
console.log('is array', JSON.parse(val).data instanceof Array)
let newone= JSON.parse(val)
newone.data.push({ecode: "223", id: "55"})
newone.data.push({ecode: "6", id: "655"})
newone.data.push({ecode: "7", id: "75"})
console.log('after pushing', newone)

//    console.log('array class', typeof JSON.parse(val).data);
   // console.log('data',  JSON.parse(val).data);
    //console.log('data push',  JSON.parse(val).data.push({"ecode": "22", "id": "22222"}));

 }).catch((err)=>{
    console.log('error marking done', err.message);
 
    })

         */


//    this.storage.set('tosyncText', {"data": [{"ecode": item.ecode, "id": item.id}]})


        this.storage.get('tosyncText').then((val) => {

            console.log('val ', val);

            let newval


            if (val == {} || val == null || val == [] || Object.keys(val).length == 0) {
                val = [{ecode: item.ecode, id: item.id}]
                console.log('val empty');
            }
            //else newval = JSON.parse(val)
            else val.push({ecode: item.ecode, id: item.id})

            console.log('val data', val);

            // JSON.stringify(employees));


            //if (val == '' || !val || val==null || val == 'null')
            //    newdata = []
            //else newdata =  JSON.parse(val)
            //

            //if(val != "" && !(JSON.parse(val) instanceof Array)) {
            //    newdata =  new Array(JSON.parse(val)); // if not, create one
            //}
            //else
            //newdata =  val; //new Array();


            //}
           // newval.data.push({ecode: item.ecode, id: item.id})
            // console.log('data',  JSON.parse(val).data);
            //console.log('data push',  JSON.parse(val).data.push(

            this.storage.set('tosyncText', val);
            //this.storage.set('tosyncText', JSON.stringify(newval));


//     console.log('add to sync: ' , item.ecode + '' + item.id + '');
            // console.log('new val ' , JSON.stringify({ecode: item.ecode, id: item.id}));
        }).catch((err)=> {
            console.log('error marking done');
            console.log('err ', err.message);
            //   this.storage.set('tosyncText', JSON.stringify([{ecode: item.ecode, id: item.id}]))
            console.log('add to sync: ', item.ecode + '' + item.id + '');
        })
        //  this.storage.set('tosyncText', ','  + item.ecode + '' + item.id );
        //  this.tosyncText = item.ecode + '' + item.id
        //  document.getElementById(item.type + '' + item.id + 'title').classList.add('done');

        //  document.getElementById(item.type + '' + item.id + 'preview').classList.add('done');

        //  document.getElementById(item.type + '' + item.id + 'preview').classList.add('justDone');
        //  document.getElementById(item.type + '' + item.id + 'title').classList.add('justDone');


    }


    listFilenames(item) {
//this.file.externalRootDirectory
//+ item.type + '/' + item.id 
        var path = item.type + '/' + item.rtype + '/' + Math.floor(item.id / 100).toString() + '/' + item.id //+ '/' + name;
        this.file.listDir(this.file.externalRootDirectory, 'Nibras/' + path).then((result) => {
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


    editRecord(ecode, rtype, id, name) {
        console.log('in editRecord')


        this.nkId = id

        document.getElementById("edit" + ecode + '' + id).classList.remove('hidden');

        this.storage.get('r-' + id).then((val) => {

            this.nk = val.body
            this.nkt = val.title
            this.ecode = val.ecode
            this.rtype = val.rtype
            this.nkd = val.date
            this.priority = val.priority
            this.nktype = val.type
        }).catch(()=> {

        });
    }

    openFileWithOptions(ecode, rtype, id, name) {
        console.error('in dblclick file', name)
    }
    tapFile(ecode, rtype, id, name) {
        console.error('in tap file', name)
    }
    openRFile(ecode, rtype, id, name) {


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
            ["mkv", "mk3d"],
            ["mkv", "mk3d"],
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

console.log('ext is', ext.get(name.split('.')[1]))
        this.fileOpener.showOpenWithDialog(//showOpenWithDialog( //open
            //'/storage/emulated/0/Nibras/' + path
            this.file.externalRootDirectory + path,
            ext.get(name.split('.')[1])
        )
            .then(() => document.getElementById(ecode + id + 'copy').innerHTML = this.file.externalRootDirectory + path + ' opened...')
            .catch(e =>document.getElementById(ecode + id + 'copy').innerHTML = 'Error opening file ' + e.message + ' ' +
                this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1]));

        //this.storage.get('ipF').then((val) => {
        //const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
        //});
    }


    openFile(type, id, name) {


        var path = 'Nibras/' + type + '/' + id + '/' + name;
        //this.storage.get('ipF').then((val) => {
        // const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
//  });


        // var path = 'Nibras/' + type + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
        //document.getElementById(type + '' + id + 'files').innerHTML = ' path ' + path

        let ext = new Map([
            ["pdf", "application/pdf"],
            ["mp3", "audio/mpeg"],
            ["m3a", "audio/mpeg"],
            ["mpga", "audio/mpeg"],
            ["mp4", "video/mp4"],
            ["mp4v", "video/mp4"],
            ["mpg4", "video/mp4"],
            ["txt", "text/plain"],
            ["text", "text/plain"],
            ["md", "text/plain"],
            ["tex", "text/plain"],
            ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
            ["ppt", "application/vnd.ms-powerpoint"],
            ["doc", "application/msword"],
            ["wma", "audio/x-ms-wma"],
            ["mkv", "mk3d"],
            ["mkv", "mk3d"],
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


        this.fileOpener.showOpenWithDialog(//(
            //'/storage/emulated/0/Nibras/' + path
            this.file.externalRootDirectory + path, ext.get(name.split('.')[1]))
            .then(() => document.getElementById(type + id + 'copy').innerHTML = name + ' opened')
            .catch(e =>document.getElementById(type + id + 'copy').innerHTML = 'Error opening file ' + e.message + ' ' +
                this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1]));
    }


    async commitOperationButton(id) {




    this.storage.get('r-' + id).then(record => {
        console.log('in confirm, id: ', id);
        this.storage.get('ipA').then(val => {
            console.log('in confirm, id: ', id, 'ip ', val);
            this.ipA = val
            const params = new HttpParams()
            var headers = new HttpHeaders();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json');
            const httpOptions = {headers: headers};
            let postData = {
                "data": record,// val.replace(/<br\/>/g, '\n')
                "username": this.username
            }
            var ipp = this.ipA
            var link = "https://" + ipp + "/sync/commitMobileRecord"

            this.http.post(link, postData, httpOptions).subscribe(response => {
                    //document.getElementById('logAreaNotes').innerHTML = response['result'] // + ' You need to manually delete the notes list after verifying its successful sync.'
                    document.getElementById('editLog' + 'o' + '' + record.id).innerHTML = response['result']//'Record committed and deleted.';
                    //document.getElementById('newEntry').innerHTML = ''
                    this.storage.remove('r-' + id)

                    if (this.platform.is('android')) {
                        return this.file.writeFile(this.file.externalRootDirectory + '/Nibras/', 'reader-log.txt',
                           record.module + ' (' + record.textDate + ' -- ' +  record.summary + ' :: ' + record.description + '\n\n',
                            {
                                replace: false, append: true
                            }).then(createdFile => {
                                console.log('Backup written successfully.');
                                document.getElementById('logAreaNotes').innerHTML = 'Backup written successfully.';
                                //this.storage.set('nklog', '')
                            }).catch(err => {
                                console.error(err);
                            });
                        //this.syncData();
                    }
                },
                    err => {
                    //document.getElementById('logAreaNotes').innerHTML = 'Not synced: ' + err.message
                })
        });
    });


    ///////////////////////////////
    /* if( 1 == 2) {
        const alert = await
        this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure you want to commit the record to Nibras Desktop?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        //  console.log('Confirm Cancel: blah');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        /////////////////////////////


                    }
                }]
        })

        await
        alert.present();
        let result = await
        alert.onDidDismiss();
    }
    */

    }

    async commitOperation(id) {

    }

    async deleteRecord(ecode, id) {

        const alert = await
        this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure you want to commit the record to Nibras Desktop?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        //  console.log('Confirm Cancel: blah');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        /////////////////////////////
                        this.storage.forEach((value, key, index) => {
                            if (key.startsWith('r-'))
                                this.commitOperationButton(key)
                            console.log('found note22222 ', key, ' value ' , value);
                        })


    console.error('... In deleteting: ' , ecode, ' ' + id)
                        if (ecode == 'o') {
                            this.storage.remove('r-' + id)

                            document.getElementById('editLog' + ecode + '' + id).innerHTML = 'Record deleted.'
                            //document.getElementById('card' + ecode + '' + id).innerHTML = 'Record deleted.'
                        }
                    }
                }]

        })

        await
        alert.present();
        let result = await
        alert.onDidDismiss();


    }

    ngOnInit() {
    }

}
