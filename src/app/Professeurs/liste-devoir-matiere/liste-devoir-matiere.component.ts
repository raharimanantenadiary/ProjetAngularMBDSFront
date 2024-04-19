import { Component } from '@angular/core';
import { AssignmentsService } from '../../Services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-liste-devoir-matiere',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIconModule,RouterModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './liste-devoir-matiere.component.html',
  styleUrl: './liste-devoir-matiere.component.css'
})
export class ListeDevoirMatiereComponent {
  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  assignments: Assignment[] = []; 
  loading: boolean = false;


  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAssignmentByMatiereByProf();
  }

  getAssignmentByMatiereByProf(){
    this.loading = true;
    const utilisateurData = localStorage.getItem('utilisateur');
    const idMatiere = this.route.snapshot.paramMap.get('id');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id && idMatiere) {
        this.id_utilisateur = utilisateur._id;
        
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
  }

}
