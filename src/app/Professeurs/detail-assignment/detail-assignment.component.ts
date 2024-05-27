import { Component } from '@angular/core';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Utilisateurs } from '../../Models/utilisateurs.model';
import { AssignmentDetails } from '../../Models/assignment-details.model';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssignmentFormulaireComponent } from '../assignment-formulaire/assignment-formulaire.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-assignment',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatCardModule,MatProgressSpinnerModule,CommonModule,RouterModule,CdkDropList, CdkDrag],
  templateUrl: './detail-assignment.component.html',
  styleUrl: './detail-assignment.component.css'
})
export class DetailAssignmentComponent {

  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  idAssignment = '';
  assignment: Assignment | null = null;
  loading: boolean = true;
  liste_devoir_rendu: AssignmentDetails[] = [];
  liste_devoir_non_rendu: AssignmentDetails[] = [];
  prof: Utilisateurs | null = null;

  constructor(public dialog: MatDialog,private assignmentService: AssignmentsService, private assignmentDetailService: AssignmentDetailsService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.getInfoAssignment();
    this.getAssignmentsRendu();
    this.getAssignmentsNonRendu();
  }

  getInfoAssignment(){
    const utilisateurData = localStorage.getItem('utilisateur');
    this.idAssignment = this.route.snapshot.params['id'];
    console.log('id_assignment: ', this.idAssignment)
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
     this.prof = utilisateur;
      //console.log(utilisateur);  
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        //console.log(this.id_utilisateur);  
        this.assignmentService.getAssignment(this.idAssignment).subscribe(
          (response: any) => {
            this.assignment = response;
            // console.log('assignment: ', this.assignment)
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

  getAssignmentsRendu(){
    const utilisateurData = localStorage.getItem('utilisateur');
    this.idAssignment = this.route.snapshot.params['id'];

    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      //console.log(utilisateur);  
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        
        this.assignmentDetailService.getAssignmentsRenduParDevoirProf(this.idAssignment,this.id_utilisateur).subscribe(
          (response: any) => {
            this.liste_devoir_rendu = response;
            // console.log('devoir_rendu: ');
            this.loading = false;
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
            this.loading = false;
            // console.log('error');
          }
        );            
        
      }

    }

  }

  getAssignmentsNonRendu(){
    const utilisateurData = localStorage.getItem('utilisateur');
    this.idAssignment = this.route.snapshot.params['id'];

    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      //console.log(utilisateur);  
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        //console.log(this.id_utilisateur);  
        
        this.assignmentDetailService.getAssignmentsNonRenduParDevoirProf(this.idAssignment,this.id_utilisateur).subscribe(
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
        this.getAssignmentsNonRendu();
        this.getAssignmentsRendu();
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
