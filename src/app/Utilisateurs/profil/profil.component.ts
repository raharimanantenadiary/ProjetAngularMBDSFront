import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursService } from '../../Services/utilisateurs.service'; 
import { Router } from '@angular/router';
import { Utilisateurs } from "../../Models/utilisateurs.model";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  FormControl,
  Validators,
} from '@angular/forms';;


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule,MatFormFieldModule, MatInputModule,MatIconModule,FormsModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  id_utilisateur = '';
  utilisateur: Utilisateurs | null = null;
  URL_IMAGE: string = 'http://localhost:8010/api/uploads';
  nouvellePhoto: File | null = null; 
  message: string = ''; 
  nomFormControl = new FormControl('');
  mailFormControl = new FormControl('');

  constructor(private utilisateursService: UtilisateursService, private router: Router) { }

  ngOnInit(): void {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) { // Vérifiez si utilisateur et _id sont définis
        this.id_utilisateur = utilisateur._id;
        
        this.utilisateursService.getUtilisateurById(this.id_utilisateur).subscribe(
          (response: Utilisateurs) => {
            this.utilisateur = response; 
            // Mettre à jour les valeurs des FormControl si l'utilisateur est défini
            if (this.utilisateur) {
              this.nomFormControl.setValue(this.utilisateur.nom);
              this.mailFormControl.setValue(this.utilisateur.mail);
            }
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données utilisateur :', error);
          }
        );
      }
    }
  }

  // Fonction pour mettre à jour les informations de l'utilisateur
  modifierUtilisateurInformation(): void {
    if (this.utilisateur) {
      // Préparer les données de mise à jour de l'utilisateur
      const updateData = {
        nom: this.utilisateur.nom,
        email: this.utilisateur.mail,
        // Ajoutez d'autres champs que vous souhaitez mettre à jour
      };

      // Appeler la méthode updateUtilisateur du service UtilisateursService pour mettre à jour l'utilisateur
      this.utilisateursService.updateUtilisateur(this.id_utilisateur, updateData, this.nouvellePhoto).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès !', response);
          // Mettre à jour le message avec un message de succès
          this.message = 'Les informations de l\'utilisateur ont été mises à jour avec succès.';
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          // Mettre à jour le message avec un message d'erreur
          this.message = 'Une erreur s\'est produite lors de la mise à jour des informations de l\'utilisateur.';
        }
      );
    } else {
      console.warn('Aucun utilisateur à mettre à jour.');
    }
  }

 
}