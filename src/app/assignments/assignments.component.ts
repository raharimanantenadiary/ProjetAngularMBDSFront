import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { RenduDirective } from '../Shared/rendu.directive';
import { Assignment } from '../Models/assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../Services/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Shared/auth.service';
import { Router} from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  imports: [
    CommonModule, FormsModule,
    RouterLink,
    MatButtonModule,
    MatListModule, MatSliderModule,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    MatSlideToggleModule
  ],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  // Pour la pagination
  page = 1;
  limit = 10;
  totalDocs !: number;
  totalPages !: number;
  nextPage !: number;
  prevPage !: number;
  hasNextPage !: boolean;
  hasPrevPage !: boolean;

  // tableau des assignments POUR AFFICHAGE
  assignments: Assignment[] = [];

  // ici on injecte le service
  constructor(private assignmentsService: AssignmentsService,private authService:AuthService,
    private router:Router) {}

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.getAssignmentsFromService();
  }

  getAssignmentsFromService() {
    // on récupère les assignments depuis le service
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
    .subscribe((data) => {
      // les données arrivent ici au bout d'un certain temps
      console.log('Données arrivées');
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    });
    console.log('Requête envoyée');
  }

  // Pour la pagination
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsFromService();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsFromService();
  }
  
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsFromService();
  }
  

  login() {
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

}
