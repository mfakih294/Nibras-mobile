import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-k',
  templateUrl: './k.page.html',
  styleUrls: ['../app.component.scss']
})
export class KPage implements OnInit {
items = ''
ipL
message = ''

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



  constructor(private http: HttpClient, private storage: Storage){

    this.storage.get('mytextJ').then((val) => {
      this.items = val;
    }); 
} // end of constructor

  ngOnInit() {
  }


savek(){
}
}
