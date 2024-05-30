import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssignmentDetails } from '../../Models/assignment-details.model';

@Component({
  selector: 'app-assignment-rendu',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatMenuModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './assignment-rendu.component.html',
  styleUrl: './assignment-rendu.component.css'
})
export class AssignmentRenduComponentEleve {
  liste_devoir_rendu: Assignment[] = [];
  liste_details: AssignmentDetails[] = [];
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  loading: boolean = true;
  page: number = 1;
  limit: number = 6;
  totalPages: number = 1;

 constructor(private assignementService: AssignmentsService,private router: Router) { }

 ngOnInit(): void {
  this.getListeDevoirRendu();
 }

 getListeDevoirRendu(){

  const utilisateurData = localStorage.getItem('utilisateur');
  if (utilisateurData) {
    const utilisateur = JSON.parse(utilisateurData);
    if (utilisateur && utilisateur._id) { 
      this.assignementService.getAssignmentsRenduEleve(utilisateur._id, this.page, this.limit).subscribe(
        (response: any) => {
          this.liste_devoir_rendu = response.assignments;
          this.totalPages = response.totalPages;
          this.loading = false;
          console.log("huhu: ",response);
          this.loading = false;
        },
        (error) => {
          console.error('Une erreur est survenue lors de la récupération des données :', error);
          this.loading = false;
        }
        );
    }
  }
}

changePage(newPage: number) {
  if (newPage >= 1 && newPage <= this.totalPages) {
    this.page = newPage;
    this.getListeDevoirRendu();
  }
}

}
