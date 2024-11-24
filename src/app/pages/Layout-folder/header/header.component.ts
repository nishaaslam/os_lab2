import { Component, OnInit, HostListener } from '@angular/core';
import { SidebarToggleService } from '../../../_services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isSidebarOpen=false;
  constructor(private toggleService: SidebarToggleService){}

  ngOnInit(): void {
    this.toggleService.isSidebarVisible$.subscribe(visible => {
      this.isSidebarOpen = visible;
    });
  }

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleService.toggleSidebar(this.isSidebarOpen);
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

}
