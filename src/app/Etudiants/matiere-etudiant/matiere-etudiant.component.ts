import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Matieres } from '../../Models/matieres.model';
import { MatieresService } from '../../Services/matieres.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import {MatPaginatorModule,PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-matiere-etudiant',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,MatPaginatorModule],
  templateUrl: './matiere-etudiant.component.html',
  styleUrl: './matiere-etudiant.component.css'
})
export class MatiereEtudiantComponent {

matieres: Matieres[] = [];
URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
page: number = 0;
limit: number = 10;
total: number = 0;

  constructor(private matiereService: MatieresService,private router: Router) { }

ngOnInit(): void {
    this.getMatiere(this.page, this.limit);    
}

//récupère la liste des matieres
getMatiere(page: number, limit: number) {
    this.matiereService.getAllMatiereEtudiant(page, limit).subscribe(
        (response: any) => {
            console.log(response);
            this.matieres = response.matieres;
            this.total = response.total; 
        },
        (error) => {
            console.error('Erreur lors de la récupération des données matière :', error);
        }
    );
}

//sert pour la pagination
handlePageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex; 
    this.getMatiere(this.page + 1, this.limit); 
}

  
// redirige vers les assignments reliés à la matieres
 voirDetail(matiereId: string | undefined) {
  if (matiereId) {
    this.router.navigate(['/liste-matiere-e-rendu', matiereId]);
  } else {
    console.error('L\'ID de la matière ou de professeur est undefined.');
  }
}



}