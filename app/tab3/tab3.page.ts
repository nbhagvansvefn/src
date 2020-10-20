
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { AppointmentService } from '../services/appointment.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { removeSummaryDuplicates } from '@angular/compiler';
import { DashboardService } from '../services/dashboard.service';
﻿import { from } from 'rxjs/observable/from';
import { groupBy, mergeMap, toArray,reduce} from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {

  public columnChart1: GoogleChartInterface;
  public columnChart2: GoogleChartInterface;
  graphData: any;
  graphresponses: any;
  OveralGraphResponses :any ;
  GraphResponses :any;
  OveralGraphData: any[];
  graphData1: any[];
  filterData : any[];
  source: any;
  option = 'Today';
  selectedValue = '1';
  showSpinner1: boolean = false;
  showSpinner2: boolean = false;
  showSpinner3: boolean = false;
  public adminID : any;
  
  colors =['active','cancelled','completed','noshow','active','cancelled','completed','noshow',
           'active','cancelled','completed','noshow','active','cancelled','completed','noshow',
           'active','cancelled','completed','noshow','active','cancelled','completed','noshow',
           'active','cancelled','completed','noshow','active','cancelled','completed','noshow']
  token: any;
  userInfo: any;


  constructor(private dashboardService: DashboardService,
              public authenticationService:AuthenticationService,
             private storage:Storage) {
    
  }

  ngOnInit(){

    let userdata= JSON.parse(localStorage.getItem('user-access'));
    this.adminID = userdata.adminId;
   
    
    //this.adminID = this.authenticationService.userInfo.adminId
    this.showSpinner1 = true;
    this.showSpinner2 = true;
    this.showSpinner3 = true;
    this.loadColumnChart1();
    this.loadColumnChart2();
    this.loadColumnChart3();
 
  }

  getColors(i){
    return this.colors[i] ;
  
      
  }
  
  onOptionChange() {
    this.showSpinner1 = true;
    this.showSpinner2 = true;

    if (this.option == 'Today') {

      this.selectedValue = '1';

    } else if (this.option == 'Last 7 Days') {

      this.selectedValue = '7';

    } else if (this.option == 'Last 30 Days') {

      this.selectedValue = '30';
    }
 
    this.loadColumnChart2();
    this. loadColumnChart1();

  }


  addToArray(status,statusCount, array) {
    switch (status) {
      case "COMPLETED":
        array[1] = statusCount;
        break;
      case "NOSHOW":
          array[2] = statusCount;
        break;
      case "ACTIVE":
        array[3] = statusCount;
        break;
      case "DELETED":
        array[4] = statusCount;
        break;
    }
  } 
  loadColumnChart2(){
       
    
    const postBody1 = {
      adminID:this.adminID,
      NoOfDays:this.selectedValue
     };
     this.dashboardService.getStatusTotalCounts(postBody1).subscribe( totalGraphData => {
   
  
      this.OveralGraphResponses = totalGraphData ;
     

       const source = from(this.OveralGraphResponses);
       this.showSpinner1 = false;
    
     });

  }

  loadColumnChart3(){
    const postBody1 = {
      adminID:this.adminID,
      NoOfDays: "0"
     };
     this.dashboardService.getStatusTotalCounts(postBody1).subscribe( totalGraphData => {
   
  
      this.GraphResponses = totalGraphData ;
 

       const source = from(this.GraphResponses);
       this.showSpinner3 = false;
    
     });

  }


  
  loadColumnChart1() {

    const postBody = {
      adminID:this.adminID,
      NoOfDays:this.selectedValue
     };
  
    this.dashboardService.getStatusCounts(postBody).subscribe( graphData => {
   
  
      this.graphresponses = graphData ;
      this. graphData1 = new Array();

      this.graphData1.push(['Queue', 'COMPLETED', 'NOSHOW', 'ACTIVE', 'DELETED', { role: 'annotation' }]);

    
      for (let i = 0; i < this.graphresponses.length; i++) {
        const currentDate = this.graphresponses[i].date;
        const queueName = this.graphresponses[i].queueName
        let newDay = [queueName, 0, 0, 0, 0, currentDate];
  
        while (i < this.graphresponses.length && this.graphresponses[i].date === currentDate) {
          this.addToArray(this.graphresponses[i].status,this.graphresponses[i].statusCount, newDay);
          if (i < this.graphresponses.length -1 && this.graphresponses[i + 1].date !== currentDate) {
            break;
          }
          i++;
        }
        this.graphData1.push(newDay);
      }

      this.showSpinner2 = false;

      this.columnChart1 = {
        chartType: 'ColumnChart',
        dataTable: this.graphData1,
        // opt_firstRowIsData: true,
        options: {
          // title: 'Population of Largest U.S. Cities',
          height: 500,
          chartArea: { height: '300' },
          isStacked: true,
          hAxis: {
            // title: 'Total Population',
            minValue: 0
          },
          // vAxis: {
          //   title: 'City'
          // }
        },
      };
     
  
    });
  }



}

