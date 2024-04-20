import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../Models/assignment.model';
import { AssignmentsService } from '../../Services/assignments.service';
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
  constructor(private assignementService: AssignmentsService,private router: Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.getListeDevoirNonRenduByMatiereProfesseur();
  }

  getListeDevoirNonRenduByMatiereProfesseur(){
    const idProf = this.route.snapshot.params['id_prof'];
    const idMatiere = this.route.snapshot.params['id_matiere'];
    this.assignementService.getAssignmentsByMatiereAndProf(idMatiere,idProf).subscribe(
      (response: any) => {
        this.liste_devoir_non_rendu = response;
        console.log(this.liste_devoir_non_rendu);
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des données matiere :', error);
      }
      );
  }

}
