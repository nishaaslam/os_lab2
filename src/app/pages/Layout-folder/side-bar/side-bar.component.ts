import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from '../../../_services';
import { TokenHelper } from '../../../_helpers';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  userModel: any = {
    username: "Ahmed Saleem",
    address: "H# 252 DHA, Phase 8, Lahore"
  }
  showSidebar: boolean = false;
  sideNav: any[] = [
    { link: "/dashboard", linkName: "home", image: "home" },
    { link: "/dashboard", linkName: "dashboard", image: "Dashboard" },
    { link: "/account", linkName: "My account", image: "user" },
    { link: "/history", linkName: "report", image: "report" }
  ]

  constructor(private toggleService: SidebarToggleService,private router:Router) { }

  ngOnInit() {
    this.toggleService.isSidebarVisible$.subscribe(visible => {
      this.showSidebar = visible;
    });
  }


  ToggleSideBarOnMobile() {
    this.showSidebar = !this.showSidebar;
    this.toggleService.toggleSidebar(this.showSidebar);
  }


  logout() {
    TokenHelper.removeAccessToken()
    this.router.navigateByUrl('/login')
  }


}
