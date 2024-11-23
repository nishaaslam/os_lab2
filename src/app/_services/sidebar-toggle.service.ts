import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  private isSidebarVisible = new BehaviorSubject<boolean>(false);
  isSidebarVisible$ = this.isSidebarVisible.asObservable();
  constructor() { }

  toggleSidebar(val:boolean) {
    this.isSidebarVisible.next(val);
  }
}
