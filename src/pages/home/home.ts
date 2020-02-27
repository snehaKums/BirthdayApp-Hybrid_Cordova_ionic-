// import { Component ,NgZone} from '@angular/core';
// import { NavController } from 'ionic-angular';
// import {AddBirthdaysPage} from '../../pages/add-birthdays/add-birthdays';
// import {BirthdayProvider} from '../../providers/birthday/birthday';
// import { LocalNotifications } from '@ionic-native/local-notifications';
 import { AlertController } from 'ionic-angular';
// import { SMS } from '@ionic-native/sms';
// import { Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import {  NavController, NavParams} from 'ionic-angular';
import {BirthdayProvider} from '../../providers/birthday/birthday';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMS } from '@ionic-native/sms';
import { Platform } from 'ionic-angular';
import {AddBirthdaysPage} from '../../pages/add-birthdays/add-birthdays';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDate:any;
  name:any;
  number:any;
  phonenumber:any;
  myTime:any;
  date:SyncManager;
  time:any;
  item=[];
  sample:any;
  item1=[];
  ids=[];
  id:any;
   b:boolean;
   currentdate:any;
  scheduleTask:any;
  currentdate1:any;
  currenttime:any;
  today = new Date().toJSON().split('T')[0];
  d = new Date();
 // e = new Date().toLocaleTimeString().split(' ')[0];
 year = this.d.getFullYear();
 month = this.d.getMonth();
 day = this.d.getDate();
 time1=this.d.getTime();
 c = new Date(this.year + 25, this.month, this.day);
 future=new Date(this.c).toJSON().split('T')[0];
  constructor(private alertCtrl: AlertController,public plt: Platform,private sms: SMS,private backgroundMode: BackgroundMode,private localNotifications: LocalNotifications,public navCtrl: NavController, public navParams: NavParams,private birthdayProvider:BirthdayProvider) 
  {
    this.localNotifications.on('click').subscribe(res=>{
      // alert("success");
      // alert(res);
      alert(JSON.stringify(res));
      this.id=res.id;
      // alert("this.id"+this.id);
      this.presentPrompt(this.id);
    })
  
  }//end of constructor
  presentPrompt(id:number) 
  {
    let alert = this.alertCtrl.create({
      title: 'Birthday',
      inputs: [
        {
          name: 'message',
          placeholder: 'message'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {   
           this.sms.send("+91"+id,data.message);        
          }
        }
      ]
    });
    alert.present();
  }
  addBirthday(name,number,dob,myTime)
  {
    alert("Added Successfully");
    this.birthdayProvider.createBirthday(name,number,dob,myTime).then((data)=>
    {
      console.log(data);
      this.date=dob;
      this.time=myTime;
      this.scheduleTask=this.date+' '+this.time;
      this.localNotifications.schedule({
      id:number,
      title:'Its Birthday Time',
      text: 'Hey Ajay its'+' '+name+' '+'Birthday Today Wish him :)',
      trigger: {at: new Date(this.scheduleTask)},
      led: 'FF0000',
      sound: null,
    });
    }),
    (error)=>
    {
      console.log(error);
      
    }
    this.name='';
    this.number='';
    this.myDate='';
    this.myTime='';
  }
  navigateToViewBirthdays(){
    this.navCtrl.push(AddBirthdaysPage);
  }
}










  // randomnumber:any;
  // array=[];
  // smsarray=[];
  // sample:any;
  // id:any;
  // currentdate:any;
  // constructor(public zone:NgZone,public platform: Platform,private alertCtrl: AlertController,private localNotifications: LocalNotifications,private sms: SMS,private birthdayProvider:BirthdayProvider,public navCtrl: NavController)
  // {
  //   this.platform.ready().then(()=>{
  //     this.currentdate= new Date().toISOString().slice(0,10);
  //     this.birthdayProvider.execute();
  //       this.getAllData(); 
  // alert("inside the platform");
  //   });
  //     this.localNotifications.on('click').subscribe(res=>{
  //     alert("success");
  //     alert(res);
  //     alert(JSON.stringify(res));
  //     this.id=res.id;
  //     alert("this.id"+this.id);
  //     this.presentPrompt(this.id);
  //   })
  // }
  // ionViewWillEnter(){
  //  this.birthdayProvider.execute();
  //  this.getAllData();
  // }
  // getData()
  // {
  //   alert("inside get data function");
  //   this.getAllData(); 
  // }
  // presentPrompt(id:number) 
  // {
  //   let alert = this.alertCtrl.create({
  //     title: 'Birthday',
  //     inputs: [
  //       {
  //         name: 'message',
  //         placeholder: 'message'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: data => {   
  //          this.sms.send("+91"+id,data.message);        
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  // navigateToAddBirthdayPage(){
  //   this.navCtrl.push(AddBirthdaysPage);
  // }
  //   getAllData()
  //   {
  //     this.array=[];
  //     this.smsarray=[];
  //    alert("Home.ts getData function called");
  //    this.birthdayProvider.getAllData().then(res=>{  
  //          this.sample=res;
  //          alert(JSON.stringify(this.sample));
  //     alert("this.array"+JSON.stringify(res));
  //        alert("this.array"+JSON.stringify(this.sample));
  //          if(this.sample.length>0)
  //         {
  //            alert("Inside if");
  //            for(var i=0;i<this.sample.length;i++)
  //           {
  //             var obj=
  //             {
  //               "name":this.sample[i].name,
  //               "dob":this.sample[i].dob
  //             }
  //             if(this.sample[i].dob == this.currentdate)
  //             {
  //               this.array.push(obj); 
  //               alert("inside if")
  //             }
  //             else{
  //               this.smsarray.push(obj);
  //               alert("else looop")
  //             }
  //           alert("this.smsarray"+JSON.stringify(this.smsarray));
  //         }
  //       } });}
      
