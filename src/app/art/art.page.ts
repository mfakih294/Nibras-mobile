import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { ComponentsModule } from '../components/components.module';
import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';
@Component({
  selector: 'app-art',
  templateUrl: './art.page.html',
  styleUrls: ['../app.component.scss']
})
export class ArtPage implements OnInit {
items = ''
ipA
ipL
message = ''
nk;
nklog = '';
  constructor(private http: HttpClient, private storage: Storage){

    this.storage.get('mytextArt').then((val) => {
      this.items = val;
    }); 
} // end of constructor

savek(){

this.storage.get('nklog').then(val => {
  if (!this.nk || this.nk == null || this.nk == '' || this.nk == ' '){
  document.getElementById('logArea').innerHTML = 'No text to append';
  console.log('new:' + this.nk);
  }
  else {

    
  let current_datetime = new Date()
  this.nklog = 
    current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + 
    current_datetime.getFullYear() + ' ' + 
    current_datetime.getHours() + ":" + current_datetime.getMinutes() +
    ' :: '  + this.nk + '<br/>'    
  + val 
  this.storage.set('nklog', this.nklog)
  document.getElementById('nklog').innerHTML =  this.nk;
  //document.getElementById('nk').nodeValue('')
  document.getElementById('nkinput').focus()

  this.nk = ''
  }
}) 
document.getElementById('nkinput').focus();

}

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
