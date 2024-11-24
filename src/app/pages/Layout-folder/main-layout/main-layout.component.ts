import { Component, OnInit, HostListener, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SidebarToggleService } from '../../../_services';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent,SideBarComponent,CommonModule,FooterComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent  implements OnInit {
  isExpand:boolean=true;

  constructor(private toggleService: SidebarToggleService){}
  
  ngOnInit() {
    this.toggleService.isSidebarVisible$.subscribe(visible => {
      this.isExpand = visible;
    });
  }


  







}
