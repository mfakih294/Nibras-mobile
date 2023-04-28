import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['../app.component.scss']
})
export class TodoPage implements OnInit {
items = ''
ipA
ipL
message = ''
  constructor(private http: HttpClient, private storage: Storage){

    this.storage.get('mytextTodo').then((val) => {
      this.items = val;
    }); 
} // end of constructor

  ngOnInit() {
  }

}
