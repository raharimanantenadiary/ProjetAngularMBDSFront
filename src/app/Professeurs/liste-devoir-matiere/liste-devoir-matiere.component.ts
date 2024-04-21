import { Component } from '@angular/core';
import { AssignmentsService } from '../../Services/assignments.service';
import {AssignmentDetailsService} from '../../Services/assignment-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentDetails } from '../../Models/assignment-details.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AssignmentFormulaireComponent } from '../assignment-formulaire/assignment-formulaire.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';


@Component({
  selector: 'app-liste-devoir-matiere',
  standalone: true,
  imports: [CdkDropList, CdkDrag,CommonModule],
  templateUrl: './liste-devoir-matiere.component.html',
  styleUrl: './liste-devoir-matiere.component.css'
})
export class ListeDevoirMatiereComponent {
  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  assignments: Assignment[] = []; 
  loading: boolean = false;
  liste_devoir_rendu: AssignmentDetails[] = [];
  liste_devoir_non_rendu: AssignmentDetails[] = [];
  devoirSelectionne: AssignmentDetails | null = null;



  constructor(private assignmentDetailService: AssignmentDetailsService, private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.getListeDevoirRendu();
    console.log("rendu",this.getListeDevoirRendu());
    this.getListeDevoirNonRendu();
  }


  getListeDevoirRendu(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) { 
        this.assignmentDetailService.getAssignmentRenduProf(utilisateur._id).subscribe(
          (response: any) => {
            this.liste_devoir_rendu = response;
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
          }
          );
      }
    }
  }

  getListeDevoirNonRendu(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) { 
        this.assignmentDetailService.getAssignmentNonRenduProf(utilisateur._id).subscribe(
          (response: any) => {
            this.liste_devoir_non_rendu = response;
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
          }
          );
      }
    }
  }

  async drop(event: CdkDragDrop<AssignmentDetails[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const assignmentToMove = event.previousContainer.data[event.previousIndex];
      const assignmentSubmitted = await this.openFormPopup(assignmentToMove);

      if (assignmentSubmitted) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          );
        this.getListeDevoirNonRendu();
        this.getListeDevoirRendu();
      }
    }
  }

  openFormPopup(selectedAssignment: AssignmentDetails): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(AssignmentFormulaireComponent, {
        width: '400px',
        data: { assignment: selectedAssignment }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Le formulaire a été fermé avec :', result);
        if (result === 'refresh') {
          this.refreshList(); 
        }
      });
    });
  }


  noReturnPredicate () {
   return  false ;
 }


}
