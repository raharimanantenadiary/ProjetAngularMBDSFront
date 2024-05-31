import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Utilisateurs } from "../Models/utilisateurs.model";
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatMenuModule,MatIconModule,MatButtonModule, MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router, private authService: AuthService
  ) { }

  utilisateur: Utilisateurs | null = null;
  isDrawerOpen = true;

  @Output() toggleDrawer = new EventEmitter<boolean>();

  onToggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen; 
    this.toggleDrawer.emit(this.isDrawerOpen); 
  }
  

  ngOnInit(): void {
    const utilisateurJSON = localStorage.getItem('utilisateur');
    if (utilisateurJSON) {
      this.utilisateur = JSON.parse(utilisateurJSON);
    }
  }

  versProfile() {
    this.router.navigate(['/Profile']);
  }

  deconnexion(){
    this.authService.deconnexion();
    this.router.navigate(['/login']);
  }

}
