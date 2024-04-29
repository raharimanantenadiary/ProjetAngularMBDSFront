import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

  isTokenExpired: boolean = false;
  isDrawerOpen = true;
  role: number = -1;

  constructor(
    private router: Router, private authService: AuthService
  ) { }
  
 
  ngOnInit(): void {
    this.isTokenExpired = this.authService.isTokenExpired();
    if (this.isTokenExpired) {
      this.router.navigate(['/login']);
    }
    const utilisateurData = localStorage.getItem('utilisateur');
    if(utilisateurData){
      const utilisateur = JSON.parse(utilisateurData);
      this.role = utilisateur.role;
    }
    
  }

  toggleDrawer(isDrawerOpen: boolean): void {
    this.isDrawerOpen = isDrawerOpen; // Met à jour l'état du drawer
  }
  
  versMatiereProf() {
    this.router.navigate(['/Ma-matiere']);
  }

  versMatiereEleve() {
    this.router.navigate(['/liste-matiere-etudiant']);
  }

  versNonRenduProf() {
    this.router.navigate(['/Liste-Devoir-Non-Rendu']);
  }

  versRenduProf() {
    this.router.navigate(['/Liste-Devoir-Rendu']);
  }

  versNouveauDevoir() {
    this.router.navigate(['/Nouveau-devoir']);
  }
  versMesDevoirs() {
    this.router.navigate(['/Mes-devoirs']);
  }
  


}