import { Component } from '@angular/core';
import {AssignmentDetailsService} from '../../Services/assignment-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentDetails } from '../../Models/assignment-details.model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
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
import { MatieresService } from '../../Services/matieres.service';
import { Matieres } from '../../Models/matieres.model';


@Component({
  selector: 'app-liste-devoir-matiere',
  standalone: true,
  imports: [CdkDropList, CdkDrag,CommonModule,MatCardModule,MatIconModule],
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
  matiere: Matieres | null = null;



  constructor(private assignmentDetailService: AssignmentDetailsService, private route: ActivatedRoute,public dialog: MatDialog,private matiereService: MatieresService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.getListeDevoirRendu();
    console.log("rendu",this.getListeDevoirRendu());
    this.getListeDevoirNonRendu();
  }


  getListeDevoirRendu(){
    this.loading = true;
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
                this.assignmentDetailService.getAssignmentRenduProf(idMatiere,this.id_utilisateur).subscribe(
                  (response: any) => {
                    this.liste_devoir_rendu = response;
                    console.log(this.liste_devoir_rendu);
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

  getListeDevoirNonRendu(){
    this.loading = true;
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
                this.assignmentDetailService.getAssignmentNonRenduProf(idMatiere,this.id_utilisateur).subscribe(
                  (response: any) => {
                    this.liste_devoir_non_rendu = response;
                    console.log(this.liste_devoir_non_rendu);
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
