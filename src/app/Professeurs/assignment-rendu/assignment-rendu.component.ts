import { Component } from '@angular/core';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { ActivatedRoute } from '@angular/router';
import { MatieresService } from '../../Services/matieres.service';
import { AssignmentDetails } from '../../Models/assignment-details.model';
import { Matieres } from '../../Models/matieres.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailDevoirComponent } from '../detail-devoir/detail-devoir.component';
import { MatDialog } from '@angular/material/dialog';
import { Assignment } from '../../Models/assignment.model';


@Component({
  selector: 'app-assignment-rendu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIconModule,RouterModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './assignment-rendu.component.html',
  styleUrl: './assignment-rendu.component.css'
})
export class AssignmentRenduComponent {

  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  id_utilisateur = '';
  assignments: AssignmentDetails[] = []; 
  matiere: Matieres | null = null;
  loading: boolean = true;

  page: number = 1;
  limit: number = 6;
  totalAssignments: number = 0;
  totalPages: number = 0;

  constructor(public dialog: MatDialog,private assignmentDetailsService: AssignmentDetailsService, private route: ActivatedRoute, private matiereService: MatieresService) { }

  ngOnInit(): void {
    this.getAssignmentRenduProf();
  }

  openDialog(selectedAssignment: AssignmentDetails): void {
    const dialogRef = this.dialog.open(DetailDevoirComponent, {
      data: { assignment: selectedAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le formulaire a été fermé avec :', result);
      if (result === 'refresh') {
        this.getAssignmentRenduProf();
      }
    });
  }

  
  getAssignmentRenduProf(){
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
            this.loading = false;
            if(this.matiere){
              console.log(this.matiere);  
              const idMatiere = this.matiere._id;
              if(idMatiere){
                console.log(idMatiere);
                this.assignmentDetailsService.getAssignmentRenduProf(idMatiere,this.id_utilisateur, this.page, this.limit).subscribe(
                  (response: any) => {
                    this.assignments = response.assignments;
                    this.totalAssignments = response.total;
                    this.totalPages = response.pages;
                    this.loading = false;
                    console.log(this.assignments);
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
            this.loading = false;
          }
        ); 
        
        
        
      }
    }
  }

  changePage(page: number): void {
    this.page = page;
    this.getAssignmentRenduProf();
  }

}
