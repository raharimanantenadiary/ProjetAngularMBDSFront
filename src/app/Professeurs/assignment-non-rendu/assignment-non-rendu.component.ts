import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Matieres } from '../../Models/matieres.model';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { MatieresService } from '../../Services/matieres.service';
import { AssignmentDetails } from '../../Models/assignment-details.model';

@Component({
  selector: 'app-assignment-non-rendu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIconModule,RouterModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './assignment-non-rendu.component.html',
  styleUrl: './assignment-non-rendu.component.css'
})
export class AssignmentNonRenduComponent implements OnInit {

  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  assignments: AssignmentDetails[] = []; 
  matiere: Matieres | null = null;
  loading: boolean = true;

  page: number = 1;
  limit: number = 6;
  totalAssignments: number = 0;
  totalPages: number = 0;


  constructor(private assignmentDetailsService: AssignmentDetailsService, private route: ActivatedRoute, private matiereService: MatieresService) { }

  ngOnInit(): void {
    this.getAssignmentNonRenduProf();
  }

  
  getAssignmentNonRenduProf() {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
          (response: any) => {
            this.matiere = response[0];
            this.loading = false;
            if (this.matiere) {
              const idMatiere = this.matiere._id;
              if (idMatiere) {
                this.assignmentDetailsService.getAssignmentNonRenduProf(idMatiere, this.id_utilisateur, this.page, this.limit).subscribe(
                  (response: any) => {
                    this.assignments = response.assignments;
                    this.totalAssignments = response.total;
                    this.totalPages = response.pages;
                    this.loading = false;
                    console.log(response);
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
    this.getAssignmentNonRenduProf();
  }
}
