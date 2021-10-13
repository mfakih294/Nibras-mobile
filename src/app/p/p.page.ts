import { Component, OnInit } from '@angular/core';

//import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { ComponentsModule } from '../components/components.module';
import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';
@Component({
  selector: 'app-p',
  templateUrl: './p.page.html',
  styleUrls: ['../app.component.scss']
})
export class PPage implements OnInit {
items0 = ''
items1m = ''
items2m = ''
items1 = ''
items2 = ''
items2p = ''
ipA
ipL
message = ''
date = ''

  constructor(private storage: Storage){

    this.storage.get('mytextP').then((val) => {

      this.items2m = val.filter((r)=>{return r.datediff < -2});
      this.items0 = val.filter((r)=>{return r.datediff == 0});
      this.items1m = val.filter((r)=>{return r.datediff == -1});
      this.items1 = val.filter((r)=>{return r.datediff == 1});
      this.items2 = val.filter((r)=>{return r.datediff > 2});
    }); 
} // end of constructor

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
