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
import {MatPaginatorModule,PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueRenduComponent } from '../../Etudiants/dialogue-rendu/dialogue-rendu.component';

@Component({
  selector: 'app-devoir-non-rendu-by-matiere',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule,MatIcon,MatPaginatorModule,MatDialogModule],
  templateUrl: './devoir-non-rendu-by-matiere.component.html',
  styleUrl: './devoir-non-rendu-by-matiere.component.css'
})
export class DevoirNonRenduByMatiereComponent {
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  liste_devoir_non_rendu: Assignment[] = [];
  titre_matiere: any;
  photo_matiere: any;
  id_utilisateur = '';
  data: any;
  durationInSeconds = 3;
  page: number = 0;
  limit: number = 10;
  tot: number = 0;

  constructor(private dialog: MatDialog,private _snackBar: MatSnackBar,private assignementDetailService: AssignmentDetailsService,private assignementService: AssignmentsService,private router: Router,private route:ActivatedRoute,private matiereService: MatieresService) { }
  ngOnInit(): void {
    this.getListeDevoirNonRenduByMatiere(this.page, this.limit);
  }
  
  getListeDevoirNonRenduByMatiere(page: number, limit: number){
    const idMatiere = this.route.snapshot.params['id_matiere'];
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      this.id_utilisateur = utilisateur._id;
      this.matiereService.getMatiereById(idMatiere).subscribe(
        (matiere: any) => { this.titre_matiere = matiere.nom;this.photo_matiere = matiere.photo},
      (error) => {
        console.error('Une erreur est survenue lors de la récupération de la matière :', error);
      }
      );
      this.assignementService.getAssignmentsEleveByMatiere(idMatiere, this.id_utilisateur, page, limit).subscribe(
        (response: any) => {
          console.log("ato",response)
          this.liste_devoir_non_rendu = response.assignments;
          this.tot = response.totalCount;
        },
        (error) => {
          console.error('Erreur lors de la récupération des devoirs :', error);
        }
      );
    }
  }
  
  handlePageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex ; // Le backend s'attend à une base 1
    this.getListeDevoirNonRenduByMatiere(this.page + 1, this.limit);
  }
  
  RendreDevoir(idAssignment: string) {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        const payload = {
          assignmentId: idAssignment,
          auteurId: utilisateur._id,
          note: null,
          remarque: null,
          rendu: false
        };
        this.assignementDetailService.newAssignementDetails(payload).subscribe(
          (response) => {
            console.log('Vous avez rendu le devoir :', response);
            this.getListeDevoirNonRenduByMatiere(this.page, this.limit); // Actualiser la liste
            this._snackBar.open('Vous avez rendu le devoir', 'Fermer', {
              duration: 3000, // exemple de durée en millisecondes
              panelClass: ['toast-success']
            });
          },
          (error) => {
            console.error('Erreur lors de la rendu du devoir :', error);
            this._snackBar.open('Une erreur est survenue lors de la rendu du devoir', 'Fermer', {
              duration: 3000, // exemple de durée en millisecondes
              panelClass: ['toast-error']
            });
          }
        );
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
  
  

  handleClick(devoir: any): void {
  if (this.isDevoirRendu(devoir)) {
    this.openDialog(devoir._id);
  } else {
    this.RendreDevoir(devoir._id);
  }
}


openDialog(devoirId: string): void {
  this.dialog.open(DialogueRenduComponent, {
    width: '250px',
    panelClass: 'custom-dialog-container',
    data: { devoirId: devoirId }  // Passer devoirId au composant de dialogue
  });
}

}
