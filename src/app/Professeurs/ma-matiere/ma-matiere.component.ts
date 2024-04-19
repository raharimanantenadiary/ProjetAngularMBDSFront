import { Component } from '@angular/core';
import { MatieresService } from '../../Services/matieres.service';
import { Matieres } from '../../Models/matieres.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-ma-matiere',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatMenuModule,MatIconModule,RouterModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './ma-matiere.component.html',
  styleUrl: './ma-matiere.component.css'
})
export class MaMatiereComponent {
  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  id_utilisateur = '';
  matiere: Matieres | null = null;
  loading: boolean = true;



  constructor(private matiereService: MatieresService) { }

  ngOnInit(): void {
    this.getMatiereByProf();
  }

  getMatiereByProf(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        
        this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
          (response: any) => {
            this.matiere = response[0];
            this.loading = false;
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données matiere :', error);
            this.loading = false;
          }
        );
      }
    }
  }

}
