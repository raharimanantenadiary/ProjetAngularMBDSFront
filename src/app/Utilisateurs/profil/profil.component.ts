import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursService } from '../../Services/utilisateurs.service'; 
import { Router } from '@angular/router';
import { Utilisateurs } from "../../Models/utilisateurs.model";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';

import {
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})

export class ProfilComponent {
  id_utilisateur = '';
  utilisateur: Utilisateurs | null = null;
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  message: string = ''; 
  nomFormControl = new FormControl('');
  mailFormControl = new FormControl('');
  nom: string = "";
  mail: string = "";
  photo: File | null = null;
  durationInSeconds = 3;

  constructor(private utilisateursService: UtilisateursService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUtilisateur();
  }

  

  getUtilisateur(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) { 
        this.id_utilisateur = utilisateur._id;
        
        this.utilisateursService.getUtilisateurById(this.id_utilisateur).subscribe(
          (response: Utilisateurs) => {
            this.utilisateur = response; 
            if (this.utilisateur) {
              this.nom = this.utilisateur.nom;
              this.mail = this.utilisateur.mail;
            }
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données utilisateur :', error);
          }
        );
      }
    }
  }


OnSubmit() {
  if (!this.nom || this.nom.trim() === '') {
    this._snackBar.open('Veuillez entrer un nom', 'Fermer', {
      duration: this.durationInSeconds * 1000,
      panelClass: ['toast-error']
    });
    return; // Arrêter l'exécution si le nom n'est pas fourni
  }
  
  const formData = new FormData();
  formData.append('_id', this.id_utilisateur);
  formData.append('nom', this.nom);
  formData.append('mail', this.mail); 

  if (this.photo) {
    formData.append('photo', this.photo);
  } else if (this.photo== "" && this.utilisateur && this.utilisateur.photo) {
    formData.append('photo', this.utilisateur.photo);
  }
  this.utilisateursService.updateUtilisateur(formData).subscribe(
    (reponse) => {
      this._snackBar.open('Mise à jour réussie', 'Fermer', {
        duration: this.durationInSeconds * 1000,
        panelClass: ['toast-success']
      });
      this.getUtilisateur();
    },
    (error) => {
      this._snackBar.open('Une erreur est survenue lors de la mise à jour', 'Fermer', {
        duration: this.durationInSeconds * 1000,
        panelClass: ['toast-error'] 
      });
    }
  );
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
        fileNameSpan.textContent = selectedFile.name || "Aucun fichier sélectionné";
      }
    }
  }
}







 
}