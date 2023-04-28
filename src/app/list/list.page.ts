import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  
mytext = ''
ipA
ipL
message = ''

  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private http: HttpClient, private storage: Storage){
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

   this.storage.get('ipA').then(val => {
   console.log('storage 1: ' , val);
   this.ipA = val    
  //  this.ipA = prompt("Nibras IP", val); 
     
  console.log('storage2: ' , this.ipA);    
   
    

     
  


// if (this.ipA !== '') {
  // this.message = 'IP set to ' + this.ipA;
  // this.storage.set('ipA', this.ipA);
  // console.log('IP set to ' + this.ipA)
// }

  

 // constructor(private http: Http){//}, private storage: Storage) { 
  const httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
      })
    };
    var ipp = this.ipA// '192.168.1.127:1440'
    var link = "https://" + ipp + "/nibras/sync/exportJsonP"
     console.log('ipp: ' , link);
     console.log('ipa: ' ,this.ipA);


  this.http.get(link,{}).subscribe(response => {
    
    this.mytext = response['data'];
    this.storage.set('mytext', this.mytext);
    this.message = 'Getting data from Nibras...'
    console.log('Result from server was ok!')
    },
    // Errors will call this callback instead:
    err => {
   
     this.storage.get('mytext').then((val) => {
     this.mytext = val;
     this.message = 'Nibras not available. Reading from local storage...'
     console.log('Something went wrong!', err);
      console.log('Getting data from local storage')
      }); 
      
      
    })
  });
    
} // end of constructor
openNext(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = item.body
}
 updat() 
 {
  this.ipA = prompt("Nibras IP", this.ipA)
  // todo : if cancelled, null taken!!

  this.storage.set('ipA', this.ipA);

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
    //fetch('http://localhost:1441/nibras/page/heartbeat', {})
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


  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
