import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Utilisateurs } from '../../Models/utilisateurs.model';
import { UtilisateursService } from '../../Services/utilisateurs.service';

@Component({
  selector: 'app-liste-pof',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './liste-pof.component.html',
  styleUrl: './liste-pof.component.css'
})
export class ListePofComponent {
  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  prof: Utilisateurs[] = [];
  loading: boolean = true;
  id_utilisateur = '';

  page: number = 1;
  limit: number = 8;
  totalProf: number = 0;
  totalPages: number = 0;

  constructor(
    private utilisateurService: UtilisateursService,
  ) {}

  ngOnInit(): void {
    this.getListeProf();
  }


  getListeProf(): void {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      console.log(utilisateur);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        console.log(this.id_utilisateur);
        this.utilisateurService.getListeProf(this.page, this.limit).subscribe(
          (response: any) => {
            this.prof = response.utilisateurs;
            this.totalProf = response.total;
            this.totalPages = response.pages;
            this.loading = false;
            // console.log('prof: ', response.utilisateurs);
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
    this.getListeProf();
  }

}
