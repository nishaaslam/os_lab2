import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgramService } from '../../_services/program.service';
import { finalize } from 'rxjs';
import { showErrorAlert, showSuccessAlert } from '../../common/alerts';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {

  historyTable :any=[
    {id:1,month:"January",units:"80",payment:"Rs,1,124"},
    {id:2,month:"Februray",units:"80",payment:"Rs.1,240"},
    {id:3,month:"March",units:"80",payment:"Rs.2,450"},
    {id:4,month:"April",units:"80",payment:"Rs.4,240"},
    {id:5,month:"May",units:"80",payment:"Rs.4,240"},
    {id:6,month:"June",units:"80",payment:"Rs,1,124"},
    {id:7,month:"July",units:"80",payment:"Rs,1,124"},
    {id:8,month:"August",units:"80",payment:"Rs,1,124"},
    {id:9,month:"September",units:"80",payment:"Rs,1,124"},
    {id:10,month:"October",units:"80",payment:"Rs,1,124"},
    {id:11,month:"November",units:"80",payment:"Rs,1,124"},
    {id:12,month:"December",units:"80",payment:"Rs,1,124"},
  ]

  constructor(private programService:ProgramService){}


  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(){
    this.programService
      .getHistory()
      .pipe(finalize(() => {
      }))
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.historyTable = result;
            //showSuccessAlert("History reterived successfully.")
          }
        },
        error: (error) => {
          //showErrorAlert(error.error.message);
        },
        complete: () => {
        }
      });
  }


 


}
