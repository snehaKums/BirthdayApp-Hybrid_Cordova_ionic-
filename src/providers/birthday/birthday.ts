import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Injectable()
export class BirthdayProvider {
private db:SQLiteObject;
private isOpen:boolean;
name:string;
message:string;
phonenumber:number;
dob:string;
myTime:string;
  constructor(private localNotifications: LocalNotifications,private backgroundMode: BackgroundMode,public http: HttpClient,private storage: SQLite,public platform: Platform) {

    this.platform.ready().then(() => { 
      this.execute();
    });
  }
  execute()
  { 
      this.storage.create({           
      name: 'newbirthday.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      this.db=db;
      db.executeSql("CREATE TABLE IF NOT EXISTS wish (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32),phonenumber INTEGER,dob varchar(32),myTime varchar(32))", [])
      .then(() =>{ console.log('Executed SQL');
       }).catch(e => console.log(e));
      }) .catch(e => console.log(e));
  }
  createBirthday(name:string,phonenumber:number,dob:string,myTime:string)
  {
    this.name=name;
    this.phonenumber=phonenumber;
    this.dob=dob;
    this.myTime=myTime;

    
    console.log('entered function');
    console.log('name message phonemuner dob',name,phonenumber,dob);
     return new Promise((resolve,reject)=>{

      this.db.executeSql("INSERT INTO wish (name,phonenumber,dob,myTime) VALUES ('"+this.name+"','"+this.phonenumber+"','"+this.dob+"','"+this.myTime+"')", []).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
        resolve(data);
        }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
        alert("in add--"+JSON.stringify(error));
        reject(error);
        });
  });
  }

  getAllData()
  {
  return new Promise((resolve,reject)=>{
  
    this.db.executeSql("SELECT * FROM wish ORDER BY dob ASC",[]).then((data)=>{
      let arrayUsers=[];
      if(data.rows.length>0)
      {
        for(var i=0;i<data.rows.length;i++)
        {
          arrayUsers.push({
            id:data.rows.item(i).id,
            name:data.rows.item(i).name,
            dob:data.rows.item(i).dob,
            myTime:data.rows.item(i).myTime,
            phonenumber:data.rows.item(i).phonenumber
            
          });
        }
      }
  //    alert(arrayUsers);
      resolve(arrayUsers);
    },(error)=>{
      reject(error);
    });
  });
  }
  DeleteRecord(item)
{ 
  this.db.executeSql("DELETE FROM wish WHERE id='"+item.id+"'",[]).then((res)=>{
 
  })
}
removeNotification(item:number){
  console.log("inside remove notification"+item);
this.localNotifications.cancel(item);

}
}


