import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-non-rendu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-non-rendu.component.html',
  styleUrl: './assignment-non-rendu.component.css'
})
export class AssignmentNonRenduComponentEtudiant {

 liste_devoir_non_rendu: Assignment[] = [];
 URL_IMAGE: string = 'http://localhost:8010/api/uploads';
 constructor(private assignementService: AssignmentsService,private router: Router) { }

 ngOnInit(): void {
  this.getListeDevoirNonRendu();
 }

 getListeDevoirNonRendu(){

  const utilisateurData = localStorage.getItem('utilisateur');
  if (utilisateurData) {
    const utilisateur = JSON.parse(utilisateurData);
    if (utilisateur && utilisateur._id) { 
      this.assignementService.getAssignmentsNonRenduEleve(utilisateur._id).subscribe(
        (response: any) => {
          this.liste_devoir_non_rendu = response;
          console.log(this.liste_devoir_non_rendu);
        },
        (error) => {
          console.error('Une erreur est survenue lors de la récupération des données :', error);
        }
        );
    }
  }
}




}
