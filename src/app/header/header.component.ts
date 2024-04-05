import { Component, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Utilisateurs } from "../Models/utilisateurs.model";
import { CommonModule } from '@angular/common';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatMenuModule,MatIconModule,MatButtonModule, MatSidenavModule,SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router, private authService: AuthService
  ) { }

  utilisateur: Utilisateurs | null = null;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  toggleDrawer() {
    this.sidebar.toggleDrawer();
  }


  ngOnInit(): void {
    const utilisateurJSON = localStorage.getItem('utilisateur');
    if (utilisateurJSON) {
      this.utilisateur = JSON.parse(utilisateurJSON);
    }
  }
}
