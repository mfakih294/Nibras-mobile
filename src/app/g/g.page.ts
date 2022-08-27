import { Component, OnInit } from '@angular/core';

//import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-g',
  templateUrl: './g.page.html',
  styleUrls: ['../app.component.scss']
})
export class GPage implements OnInit {
items = ''
  newItems = ''

  ipA
ipL
message = ''


  constructor(private storage: Storage){

    this.storage.get('mytextG').then((val) => {
      this.items = val;
    });

    this.storage.get('nklog').then(val => {
      this.newItems = val;
    });


} // end of constructor





  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
