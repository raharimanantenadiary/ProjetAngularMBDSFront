import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import { Matieres } from '../../Models/matieres.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { MatieresService } from '../../Services/matieres.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ModifierAssignmentComponent } from '../modifier-assignment/modifier-assignment.component';
import { DeleteAssignmentComponent } from '../delete-assignment/delete-assignment.component';

@Component({
  selector: 'app-mes-devoirs',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIconModule,RouterModule,CommonModule,MatProgressSpinnerModule,MatDialogTitle, MatDialogContent],
  templateUrl: './mes-devoirs.component.html',
  styleUrl: './mes-devoirs.component.css'
})
export class MesDevoirsComponent {

  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  assignments: Assignment[] = []; 
  matiere: Matieres | null = null;
  loading: boolean = true;
  devoirSelectionne: Assignment | null = null;

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private matiereService: MatieresService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAssignmentProf();
  }

  openDialog(selectedAssignment: Assignment): void {
    const dialogRef = this.dialog.open(ModifierAssignmentComponent, {
        width: '400px',
        data: { assignment: selectedAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('Le formulaire a été fermé avec :', result);
        if (result === 'refresh') {
            this.getAssignmentProf(); 
        }
    });
}

  openDialogSuppr(selectedAssignment: Assignment): void {
    const dialogRef = this.dialog.open(DeleteAssignmentComponent, {
        width: '400px',
        data: { assignment: selectedAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('Le formulaire a été fermé avec :', result);
        if (result === 'refresh') {
            this.getAssignmentProf(); 
        }
    });
  }

  

  getAssignmentProf(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      console.log(utilisateur);  
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        console.log(this.id_utilisateur);  
        this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
          (response: any) => {
            this.matiere = response[0];
            
            if(this.matiere){
              console.log(this.matiere);  
              const idMatiere = this.matiere._id;
              if(idMatiere){
                console.log(idMatiere);
                this.assignmentService.getAssignmentByMatiereByProf(idMatiere,this.id_utilisateur).subscribe(
                  (response: any) => {
                    this.assignments = response;
                    console.log(this.assignments);
                    this.loading = false;
                  },
                  (error) => {
                    console.error('Une erreur est survenue lors de la récupération des données :', error);
                    this.loading = false;
                  }
                );
              }
              
            }
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
          }
        ); 
        
        
        
      }
    }
  }

}
