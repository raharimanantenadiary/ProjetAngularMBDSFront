import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatieresService } from '../../../Services/matieres.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-modifier-matiere',
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
  templateUrl: './modifier-matiere.component.html',
  styleUrl: './modifier-matiere.component.css'
})
export class ModifierMatiereComponent {
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  matiere: any;
  nom: string = "";
  photo: File | null = null;
  durationInSeconds = 3;
  constructor(private matiereService: MatieresService,private router: Router,private route:ActivatedRoute,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {this.getMatiereActif();}


  getMatiereActif(){
    const idMatiere = this.route.snapshot.params['id'];
    this.matiereService.getMatiereById(idMatiere).subscribe(
      (matiere: any) => { 
        this.matiere = matiere;
        console.log(this.matiere);
      });
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


OnSubmit() {
  const idMatiere = this.route.snapshot.params['id'];
  const formData = new FormData();
  formData.append('_id', idMatiere);


  if (this.nom) {
    formData.append('nom', this.nom);
  } else if (this.nom== "" && this.matiere && this.matiere.nom) {
    formData.append('nom', this.matiere.nom);
  }

  if (this.photo) {
    formData.append('photo', this.photo);
  } else if (this.photo== "" && this.matiere && this.matiere.photo) {
    formData.append('photo', this.matiere.photo);
  }
  this.matiereService.updateMatiere(formData).subscribe(
    (reponse: any) => {
      this._snackBar.open('Mise à jour réussie', 'Fermer', {
        duration: this.durationInSeconds * 1000,
        panelClass: ['toast-success']
      });
      this.getMatiereActif();
    },
    (error: any) => {
      this._snackBar.open('Une erreur est survenue lors de la mise à jour', 'Fermer', {
        duration: this.durationInSeconds * 1000,
        panelClass: ['toast-error'] 
      });
    }
  );
}


}
