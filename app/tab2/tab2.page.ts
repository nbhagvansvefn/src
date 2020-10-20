import { Component, OnInit } from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AppointmentService } from '../services/appointment.service';
import { AlertController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  previewCalender = false ;

  date: string;
  type: 'string';



  information: any;
  dataNew = [];
  modifiedData: any;
  modifiedDataAppoitment: any;
  showSpinner: boolean ;
  updateAppoitmentCompleted:any;
  updateAppoitmentCancelled:any;
  public auth_token:any;
  public adminID : any;
  public selectedDate : any;
  pipe = new DatePipe('en-US');


  constructor(private router: Router, private http: HttpClient,
              public appointmentService: AppointmentService,
              public alertController: AlertController,
              public authenticationService:AuthenticationService) {
                let userdata= JSON.parse(localStorage.getItem('user-access')); 
                this.adminID = userdata.adminId;
              
    }
  ngOnInit() {
    this.showSpinner = true;

     
    this.selectedDate =  this.pipe.transform(new Date(),'yyyy/MM/dd')
  
    this.test();

  }


  test() {
  
    console.log(this.adminID,"admin");

    let postBody ={
      adminId: this.adminID,
      appointmentDate: this.selectedDate
      // adminId: "9",
      // appointmentDate: "2020/10/11"
    }
    this.appointmentService.getAppoinments(postBody).subscribe(res => {
      
      this.information = res;
      this.showSpinner = false;

      this.information.forEach(element => {
        this.dataNew.push(
          {
            "name":Object.keys(element)[0],
            "appointments":Object.values(element)[0]
          }
        );
      });


   
  });
  }


    addQueue(){
      this.router.navigate(['tabs/tab2/addqueue']);

       }


    // toggleCalenderPreview(){

    //   this.previewCalender =! this.previewCalender;

    // }

    // onChange($event) {
    //   console.log($event);
    // }


    onChangeDate()
    {
      this.showSpinner = true;
      this.selectedDate = this.pipe.transform(this.selectedDate,'yyyy/MM/dd');
  
      this.test();
    }



  async alertConfirm(i,j) {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Please Confrim Customer Showed Up</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.showSpinner = true
        
          let postBody =
              {
                appointmentId: this.dataNew[i].appointments[j].appointmentId,
                status: "COMPLETED"

              };

              
              this.appointmentService.updateAppointmentStatus(postBody).subscribe(res => {
                console.log(res,'COMPLETED');
                this.test();
                this.showSpinner = true
               //this.dataNew[i].appointments.splice(j,1);
              
                // let queuetemp = this.dataNew[i];
                // let appoints = new Array()queuetemp[j];
                // appoints
              });



          }
        }
      ]
    });

    await alert.present();
  }

  async alertCancel(i,j) {
    const alert = await this.alertController.create({
      header: 'are you sure?',
      message: '<strong>Cancel The Appointmnet</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.showSpinner = true
         
            let updateAppoitmentCancelled ={
              appointmentId: this.dataNew[i].appointments[j].appointmentId,
              status: "NOSHOW"

            };

            this.appointmentService.updateAppointmentStatus(updateAppoitmentCancelled).subscribe(res => {
              
              this.test();
              
             // this.dataNew[i].appointments.splice(j,1);
            });


          }
        }
      ]
    });

    await alert.present();
  }

  queueSelected(item){

    this.appointmentService.queueItem = item;
    
    this.router.navigate(['tabs/tab2/queuedetails']);

  }

  appointmentSelected(child){
    this.appointmentService.queueItem = child;

    this.router.navigate(['tabs/tab2/editappointment']);

  }

  editQueue(item){
    this.appointmentService.queueItem = item;

    this.router.navigate(['tabs/tab2/editqueue']);

  }

  addAppointment(item){
    this.appointmentService.queueItem = item;
 
    this.router.navigate(['tabs/tab2/addappointment']);

  }





}