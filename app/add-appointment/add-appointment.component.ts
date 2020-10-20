
import { AppointmentService } from '../services/appointment.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {
  selectedDate: any;


   public name = "" ;
   public phoneNumber= "" ;
   public appointmentTime ="";
   public notes ="";
   showContacts: boolean = false;
   pipe = new DatePipe('en-US');
   showSpinner: boolean ;
     
   @ViewChild('search', { static: false }) search: IonSearchbar;

   public list: Array<Object> = [];
   public searchedItem: any;
   public coustmerList:any;
   public adminID : any;



  constructor(private appointmentService: AppointmentService,
              public toastController: ToastController,
              public authenticationService:AuthenticationService,
              private router: Router) { 
   
  }

  ngOnInit() {

    this.adminID = this.authenticationService.userInfo.adminId
    const postId ={
      adminId : this.adminID
     }
     this.appointmentService.getCustomers(postId).subscribe(custList=>{
      this.coustmerList =custList ;
    });
  }
  onsubmit(){
    this.showSpinner = true;
 
    const appointmenttime =this.pipe.transform(this.appointmentTime, 'yyyy-MM-dd HH:mm:ss');

    let postData = {
      queueId : this.appointmentService.queueItem.appointments[0].queue.queueId,
      orgId:this.appointmentService.queueItem.appointments[0].organization.orgId,
      adminId:this.appointmentService.queueItem.appointments[0].admin.adminId,
      name : this.name,
      phoneNumber: this.phoneNumber,
      appointmentTime:appointmenttime,
      notes:this.notes
    }

 
    this.appointmentService.addnewAppointment(postData).subscribe(async data=>{
  

      this.showSpinner = false;
      const toast = await this.toastController.create({
        message: 'New appointment has been saved',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['tabs/tab2']);
    });

  }

   getCustomersList(){
    this.adminID = this.authenticationService.userInfo.adminId
     const postId ={
      adminId : this.adminID 
     }
     this.appointmentService.getCustomers(postId).subscribe(custList=>{
      
    });
   }

  onChangeDate(selecteddate)
  {
    this.selectedDate = selecteddate;
 
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    });
  }

  _ionChange(event) {
    this.showContacts = true;
    const val = event.target.value;
    //this.searchedItem = this.list;

     this.searchedItem = this.coustmerList;
    // console.log(this.searchedItem,"searchedItem");

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }

  selectedCustomer(i){
    this.name = this.searchedItem[i].name ;
    this.phoneNumber = this.searchedItem[i].phoneNumber;
    this.showContacts = false;
  }

}
