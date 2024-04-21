import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { MatieresService } from '../../Services/matieres.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-devoir-non-rendu-by-matiere',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './devoir-non-rendu-by-matiere.component.html',
  styleUrl: './devoir-non-rendu-by-matiere.component.css'
})
export class DevoirNonRenduByMatiereComponent {
  liste_devoir_non_rendu: Assignment[] = [];
  titre_matiere: any;
  constructor(private assignementService: AssignmentsService,private router: Router,private route:ActivatedRoute,private matiereService: MatieresService) { }
  ngOnInit(): void {
    this.getListeDevoirNonRenduByMatiereProfesseur();
  }


  getListeDevoirNonRenduByMatiereProfesseur(){
    const idProf = this.route.snapshot.params['id_prof'];
    const idMatiere = this.route.snapshot.params['id_matiere'];
    this.matiereService.getMatiereById(idMatiere).subscribe(
      (matiere: any) => { this.titre_matiere = matiere.nom;},
    (error) => {
      console.error('Une erreur est survenue lors de la récupération de la matière :', error);
    }
    );
    this.assignementService.getAssignmentByMatiereByProf(idMatiere,idProf).subscribe(
      (response: any) => {
        this.liste_devoir_non_rendu = response;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des données matiere :', error);
      }
      );
  }


  RendreDevoir(idAssignment: string | undefined) {
    if (idAssignment) {
      this.router.navigate(['/liste-matiere-etudiant']);
    } else {
      console.error('L\'ID de la matière ou de professeur est undefined.');
    }
  }

}
