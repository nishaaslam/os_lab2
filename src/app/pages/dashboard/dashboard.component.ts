import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexDataLabels, ApexTitleSubtitle, NgApexchartsModule,  ApexPlotOptions, ApexAnnotations, ApexLegend } from 'ng-apexcharts';
import { ProgramService } from '../../_services/program.service';
import { finalize } from 'rxjs';

import { showErrorAlert } from '../../common/alerts';
import { Months } from '../../common';
import { Helpers } from '../../_helpers';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions:ApexPlotOptions,
  legend:ApexLegend
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DropdownModule,FormsModule,NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  public chartOptions: Partial<ChartOptions | undefined>;
  model:any = {
    status:"pending",
    due_date:"10th Sep, 2024",
    bill_amount:"6,500",
    residential_teriff:[
        {color:"#CEECF8",range:"0-100",price:"12.21"},
        {color:"#8FCEE7",range:"101-200",price:"14.53"},
        {color:"#6CB9D8",range:"201-300",price:"31.51"},
        {color:"#589BB6",range:"301-400",price:"38.41"},
        {color:"#387994",range:"401-500",price:"41.62"},
        {color:"#184659",range:"501-600",price:"43.04"},
        {color:"#092733",range:"601-700",price:"44.18"},
        {color:"#03161E",range:"701 & above",price:"49.1"},
    ],
    units_consumed:250,
    remaining_units:150
  }
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  monthTitle="August";
  monthEnum=Months;
  monthDDL :any =[]
  selectedMonth:any;
  users:any[]=[];
  constructor(private http: HttpClient,private programService:ProgramService) {

  }
  ngOnInit(): void {
    this.monthDDL = Helpers.enumStringToArray(this.monthEnum)
    this.getDashboard();
    this.getAllusers();
    this.chartOptions = {
      series: [25, 25, 85, 15],
      chart: {
        type: 'donut',  // Change to 'donut' for a doughnut chart
        height: 450,
      },
      labels: ["Team A"],
      dataLabels: {
        enabled: false
      },
      title: {
        text: '',
        align: 'center'
      },
      colors:['#CEECF8','#8FCEE7','#DADADA78','#6CB9D8'],
       plotOptions: {
        pie: {
          donut: {
            size: '85%',
          }
        }
      },
      legend: {
        show: false // Disable legend to hide side labels
      }
    };
  }

  getAllusers() {
    this.http.get('https://freeapi.gerasim.in/api/User/GetAllUsers').subscribe((res:any) => {
      this.users = res.data;
    } , error => {
      //alert("Error From API")
    })
  }


  getDashboard() {
    this.programService
      .getDashboardDetail()
      .pipe(finalize(() => {
      }))
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.model = result;
          }
        },
        error: (error) => {
          //showErrorAlert(error.error.message);
        },
        complete: () => {
        }
      });
  }

  onChangeMonth(){
    this.monthTitle = this.selectedMonth.name
  }

}
