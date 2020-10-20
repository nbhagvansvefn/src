import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { QueueServiceService } from '../services/queue-service.service';
import { NavController, ToastController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { AppointmentService } from '../services/appointment.service';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

 
  public custName:"" ;
    public custPhoneNumber:"" ;
    public notes ="";
 
  dataNew = [];
 buttonColor = '';
 activePage: any;
 showSpinner: boolean
 showSpinner1: boolean ;




 information: any;


  selectedOption: any;
  prvSelected : any ;
  addNewAppointment: any;
  queueID: any;
  organizationId: string;
  addAppointment: any;
  public auth_token:any;
  public adminID : any;
  public selectedDate : any;
  public appointmentTime = "";
  pipe = new DatePipe('en-US');




 constructor(public navCtrl: NavController, private http: HttpClient,
             public queueService: QueueServiceService,
             public appointmentService: AppointmentService,
             public formBuilder: FormBuilder,
             public toastController: ToastController,
             public authenticationService:AuthenticationService){

             }

 ngOnInit() {
  this.showSpinner = true ;
  this.adminID = this.authenticationService.userInfo.adminId
    
  this.selectedDate =  this.pipe.transform(new Date(),'yyyy/MM/dd')

  this.test();
}

test(){
  this.dataNew = [];
  let postBody ={
    adminId: this.adminID,
    appointmentDate: this.selectedDate
  }
    this.appointmentService.getAppoinments(postBody).subscribe(res => {
    
      this.information = res;


   

      this.information.forEach(element => {
        this.dataNew.push(
          {
            "name": Object.keys(element)[0],
            "appointments": Object.values(element)[0]
          }
        );
      });

 

      this.showSpinner = false;

      this.selectedOption = this.dataNew[0];
     this.selectedOption["selected"] = true;


     this.queueID = this.dataNew[0].appointments[0].queue.queueId;
   

  });
  }





 toggleSection(i){


  this.prvSelected = this.selectedOption;



  this.selectedOption = this.dataNew[i];


    this.dataNew[i]["selected"] = !this.dataNew[i]["selected"];


   this.prvSelected["selected"] = !this.prvSelected["selected"] ;



   

 }

   onSubmit(){
    this.showSpinner1 = true ;
   
    const appointmenttime =this.pipe.transform(this.appointmentTime, 'yyyy-MM-dd HH:mm:ss');

    const postData = {
    queueId: this.selectedOption.appointments[0].queue.queueId,
    orgId: this.selectedOption.appointments[0].organization.orgId,
    adminId:this.selectedOption.appointments[0].admin.adminId,
    name : this.custName,
    phoneNumber: this.custPhoneNumber,
    appointmentTime:appointmenttime,
    notes:this.notes

  };
 
  console.log(postData,'before service data');
  this.appointmentService.addnewAppointment(postData).subscribe(async data=>{
    console.log(data,'queue service data');
    this.showSpinner1 = false ;
    const toast = await this.toastController.create({
      message: 'Your Appointment Has Been Created',
      duration: 2000
    });
    toast.present();
  });


   
}

onChangeDate(selecteddate)
{
  this.selectedDate = selecteddate;

}







 }


