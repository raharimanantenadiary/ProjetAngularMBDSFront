import { Component } from '@angular/core';
import { MatieresService } from '../../Services/matieres.service';
import { Matieres } from '../../Models/matieres.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AssignmentDetailsService} from '../../Services/assignment-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ma-matiere',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule
  ],
  templateUrl: './ma-matiere.component.html',
  styleUrl: './ma-matiere.component.css',
})
export class MaMatiereComponent {
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  id_utilisateur = '';
  total_devoir_rendu: number = 0;
  total_non_rendu: number = 0;
  total_devoir: number = 0;
  matiere: Matieres | null = null;
  loading: boolean = true;
  nom: string = '';
  photo: File | null = null;
  durationInSeconds = 3;
  statistique: any;

  constructor(
    private router: Router,
    private matiereService: MatieresService,
    private _snackBar: MatSnackBar,
    private assignmentDetailService: AssignmentDetailsService
  ) {}

  ngOnInit(): void {
    this.getMatiereByProf();
    this.getStatistique();
  }

 

  getMatiereByProf() {
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
            console.error(
              'Une erreur est survenue lors de la récupération des données matiere :',
              error
            );
            this.loading = false;
          }
        );
      }
    }
  }




  supprimerMatiere(matiereId: string | undefined): void {
    if (matiereId) {
      this.matiereService.supprimerMatiere(matiereId).subscribe(
        () => {
          console.log('Matière supprimée avec succès');
          this.getMatiereByProf();
          this.getStatistique();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la matière :', error);
          console.log('matiere id', matiereId);
        }
      );
    } else {
      console.error("L'ID de la matière ou de professeur est undefined.");
    }
  }

  OnSubmit() {
    if (!this.nom || !this.photo) {
    this._snackBar.open('Veuillez remplir tous les champs et sélectionner une photo.', 'Fermer', {
      duration: 3000,  // Temps en millisecondes avant que le snackbar ne disparaisse
      panelClass: ['snackbar-error']  // Classe CSS pour le style d'erreur
    });
    return;  // Stop l'exécution si les conditions ne sont pas remplies
  }
  
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur._id) {
        const formData = new FormData();
        formData.append('nom', this.nom);
        formData.append('prof', utilisateur._id);

        // Ajoutez la photo uniquement si elle est définie
        if (this.photo) {
          formData.append('photo', this.photo);
        } else if (this.matiere && this.matiere.photo) {
          // Ajoutez la photo de matiere seulement si elle est définie
          formData.append('photo', this.matiere.photo);
        }     

        this.matiereService.postMatiere(formData).subscribe(
          (reponse: any) => {
            this._snackBar.open('Mise à jour réussie', 'Fermer', {
              duration: this.durationInSeconds * 1000,
              panelClass: ['toast-success'],
            });
            this.getMatiereByProf();
          },
          (error: any) => {
            this._snackBar.open(
              'Une erreur est survenue lors de la mise à jour',
              'Fermer',
              {
                duration: this.durationInSeconds * 1000,
                panelClass: ['toast-error'],
              }
            );
          }
        );
      }
    }
  }

  handleFileInput(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const fileList: FileList = fileInput.files;
      if (fileList.length > 0) {
        const selectedFile: File = fileList[0];
        this.photo = selectedFile;
        const fileNameSpan = document.getElementById('file-name');
        if (fileNameSpan) {
          fileNameSpan.textContent =
            selectedFile.name || 'Aucun fichier sélectionné';
        }
      }
    }
  }


  getStatistique(){
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
            if(this.matiere){
              console.log(this.matiere);  
              const idMatiere = this.matiere._id;
              if(idMatiere){
                console.log(idMatiere);
                this.assignmentDetailService.getStatistique(idMatiere,this.id_utilisateur).subscribe(
                  (response: any) => {
                    console.log(response)
                    this.total_devoir = response.totalCount;
                    this.total_non_rendu = response.nonRenduCount;
                    this.total_devoir_rendu = response.renduCount;
                  },
                  (error) => {
                    console.error('Une erreur est survenue lors de la récupération des données :', error);
                  }
                );
              }
            }
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
          }
        ); 
      }
    }
  }





}
