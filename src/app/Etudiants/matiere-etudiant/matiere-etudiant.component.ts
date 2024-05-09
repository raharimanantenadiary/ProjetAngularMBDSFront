import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Matieres } from '../../Models/matieres.model';
import { MatieresService } from '../../Services/matieres.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matiere-etudiant',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './matiere-etudiant.component.html',
  styleUrl: './matiere-etudiant.component.css'
})
export class MatiereEtudiantComponent {

matieres: Matieres[] = [];
URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  constructor(private matiereService: MatieresService,private router: Router) { }

  ngOnInit(): void {
      this.getMatiere();    
  }

  getMatiere(){
        this.matiereService.getAllMatiereEtudiant().subscribe(
          (response: Matieres[]) => {
            this.matieres = response;
            console.log(this.matieres);
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données matiere :', error);
          }
        );
  }

 voirDetail(matiereId: string | undefined) {
  if (matiereId) {
    this.router.navigate(['/liste-matiere-e-rendu', matiereId]);
  } else {
    console.error('L\'ID de la matière ou de professeur est undefined.');
  }
}



}