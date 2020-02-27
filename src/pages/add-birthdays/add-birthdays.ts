// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
// import {BirthdayProvider} from '../../providers/birthday/birthday';
// import { LocalNotifications } from '@ionic-native/local-notifications';
// import { BackgroundMode } from '@ionic-native/background-mode';
// import { SMS } from '@ionic-native/sms';
// import { Platform } from 'ionic-angular';





import { Component ,NgZone} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {BirthdayProvider} from '../../providers/birthday/birthday';
import { SMS } from '@ionic-native/sms';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AddBirthdaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-birthdays',
  templateUrl: 'add-birthdays.html',
})
export class AddBirthdaysPage {
  randomnumber:any;
  array=[];
  smsarray=[];
  sample:any;
 
  currentdate:any;
  constructor(private alertCtrl: AlertController,public zone:NgZone,public platform: Platform,private sms: SMS,private birthdayProvider:BirthdayProvider,public navCtrl: NavController)
  {
  //   this.platform.ready().then(()=>{
    this.currentdate= new Date().toISOString().slice(0,10);
  //     this.birthdayProvider.execute();
  //       this.getAllData(); 
  // alert("inside the platform");
  //   });
  }

  presentPrompt(a) 
  {
    let alert = this.alertCtrl.create({
      title: a.name +'Birthday',    
      message: 'Date :'+a.dob +'\n'+'Phone number:'+a.phonenumber,
      
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }






  ionViewWillEnter(){
   this.birthdayProvider.execute();
   this.getAllData();
  }
  getData()
  {

    this.getAllData(); 
  }

  navigateToAddBirthdayPage(){
    this.navCtrl.push(AddBirthdaysPage);
  }
    getAllData()
    {
      this.array=[];
      this.smsarray=[];
     this.birthdayProvider.getAllData().then(res=>{  
           this.sample=res;
          //  alert(JSON.stringify(this.sample));
      // alert("this.array"+JSON.stringify(res));
      //    alert("this.array"+JSON.stringify(this.sample));
           if(this.sample.length>0)
          {
            //  alert("Inside if");
             for(var i=0;i<this.sample.length;i++)
            {
              var obj=
              {
                "name":this.sample[i].name,
                "dob":this.sample[i].dob,
                "phonenumber":this.sample[i].phonenumber,
                "id":this.sample[i].id
              }
              if(this.sample[i].dob == this.currentdate)
              {
                this.array.push(obj); 
                // alert("inside if")
              }
              else if(this.sample[i].dob < this.currentdate){

               this.birthdayProvider.DeleteRecord(this.sample[i]);
              }
              else {
                this.smsarray.push(obj);
                // alert("else looop")
              }
            // alert("this.smsarray"+JSON.stringify(this.smsarray));
          }
        } });
      }

      deleteItem(r)
      {
        this.birthdayProvider.DeleteRecord(r); 
        this.birthdayProvider.removeNotification(r.phonenumber);
        this.zone.run(() => {
        this.getAllData();
      });
      }


      }






//   myDate:any;
//   name:any;
//   number:any;
//   phonenumber:any;
//   myTime:any;
//   date:SyncManager;
//   time:any;
//   item=[];
//   sample:any;
//   item1=[];
//   ids=[];
//    b:boolean;
//    currentdate:any;
//   scheduleTask:any;
//   currentdate1:any;
//   currenttime:any;
//   today = new Date().toJSON().split('T')[0];
//   d = new Date();
//  year = this.d.getFullYear();
//  month = this.d.getMonth();
//  day = this.d.getDate();
//  time1=this.d.getTime();
//  c = new Date(this.year + 25, this.month, this.day);
//  future=new Date(this.c).toJSON().split('T')[0];
//   constructor(public plt: Platform,private sms: SMS,private backgroundMode: BackgroundMode,private localNotifications: LocalNotifications,public navCtrl: NavController, public navParams: NavParams,private birthdayProvider:BirthdayProvider) 
//   {
  
//   }//end of constructor
 
//   addBirthday(name,number,dob,myTime)
//   {
//     this.birthdayProvider.createBirthday(name,number,dob,myTime).then((data)=>
//     {
//       console.log(data);
//       this.date=dob;
//       this.time=myTime;
//       this.scheduleTask=this.date+' '+this.time;
//       this.localNotifications.schedule({
//       id:number,
//       title:'Its Birthday Time',
//       text: 'Hey Ajay its'+' '+name+' '+'Birthday Today Wish him :)',
//       trigger: {at: new Date(this.scheduleTask)},
//       led: 'FF0000',
//       sound: null,
//     });
//     }),
//     (error)=>
//     {
//       console.log(error);
//     }
//   }


