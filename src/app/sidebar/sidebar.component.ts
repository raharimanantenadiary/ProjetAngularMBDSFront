import { Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [MatSidenavModule, MatButtonModule]
})
export class SidebarComponent {
  
  isDrawerOpen = true;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

}
