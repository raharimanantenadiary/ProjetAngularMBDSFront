import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { MatieresService } from '../../Services/matieres.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-devoir-non-rendu-by-matiere',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule,MatIcon],
  templateUrl: './devoir-non-rendu-by-matiere.component.html',
  styleUrl: './devoir-non-rendu-by-matiere.component.css'
})
export class DevoirNonRenduByMatiereComponent {
  liste_devoir_non_rendu: Assignment[] = [];
  titre_matiere: any;
  id_utilisateur = '';
  data: any;
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar,private assignementDetailService: AssignmentDetailsService,private assignementService: AssignmentsService,private router: Router,private route:ActivatedRoute,private matiereService: MatieresService) { }
  ngOnInit(): void {
    this.getListeDevoirNonRenduByMatiere();
  }


  getListeDevoirNonRenduByMatiere(){
    const idMatiere = this.route.snapshot.params['id_matiere'];
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        this.matiereService.getMatiereById(idMatiere).subscribe(
          (matiere: any) => { this.titre_matiere = matiere.nom;},
        (error) => {
          console.error('Une erreur est survenue lors de la récupération de la matière :', error);
        }
        );
        this.assignementService.getAssignmentsEleveByMatiere(idMatiere,this.id_utilisateur).subscribe(
          (response: any) => {
            console.log(response);
            this.liste_devoir_non_rendu = response;
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données matiere :', error);
          }
          );
      }
    }
    
  }


  RendreDevoir(idAssignment: string) {
    this.data = {};
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;

        if(idAssignment){
          this.data.assignmentId = idAssignment;
          this.data.auteurId = this.id_utilisateur;
          this.data.note = null;
          this.data.remarque = null;
          this.data.rendu = false;
          this.assignementDetailService.newAssignementDetails(this.data).subscribe(
            (response) => {
              console.log('Vous avez rendu le devoir :', response);
              this.getListeDevoirNonRenduByMatiere();
              this._snackBar.open('Vous avez rendu le devoir', 'Fermer', {
                duration: this.durationInSeconds * 1000,
                panelClass: ['toast-success']
              });
            },
            (error) => {
              console.error('Erreur lors de la rendu du devoir :', error);
              this._snackBar.open('Une erreur est survenue lors de la rendu du devoir', 'Fermer', {
                duration: this.durationInSeconds * 1000,
                panelClass: ['toast-error'] 
              });
            }
            );          
        }
      }
    }
    
  }
 

  isDevoirRendu(devoir: any): boolean {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id && devoir.details) { 
        this.id_utilisateur = utilisateur._id;
        return devoir.details.some((detail: any) => detail.auteur === this.id_utilisateur);
      }
    }
    return false; 
  }
  
  

}
