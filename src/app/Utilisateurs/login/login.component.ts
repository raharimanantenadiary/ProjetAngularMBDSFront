import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatButtonModule} from '@angular/material/button';
import { UtilisateursService } from '../../Services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule,MatCardModule,MatFormFieldModule, MatInputModule,MatIconModule,FormsModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  motDePasseFormControl = new FormControl('', [Validators.required]);
  isPasswordVisible: boolean = false;
  resultat = '';
  errorMessage = '';
  token: string | null = null;
  utilisateur: any = null;
  isLoading: boolean = false;


  constructor(private utilisateursService: UtilisateursService,private router: Router,) { }

  togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
  }

  isPasswordNotEmpty(): boolean {
    const passwordValue = this.motDePasseFormControl.value;
    return typeof passwordValue === 'string' && passwordValue.length > 0;
  }

 seConnecter() {
  this.isLoading = true;
  const email = this.emailFormControl.value || ''; 
  const motDePasse = this.motDePasseFormControl.value || ''; 
  this.utilisateursService.seConnecter(email, motDePasse).subscribe(
    (response: any) => {
      this.errorMessage = ''; 
      this.resultat = JSON.stringify(response); 
      localStorage.setItem('token', response.token);
      localStorage.setItem('utilisateur', JSON.stringify(response.utilisateur));
      this.isLoading = false;
      const roleUtilisateur = response.utilisateur.role;
      if (roleUtilisateur === 0) {
        this.router.navigate(['/Ma-matiere']);
      } else if (roleUtilisateur === 1) {
        this.router.navigate(['/liste-matiere-etudiant']);
      } else {
        console.error('Rôle utilisateur invalide :', roleUtilisateur);
      }
    },
    (error) => {
      this.errorMessage = error.error.erreur;
      this.resultat = '';
      this.isLoading = false;
      this.router.navigate(['/login']);
    }
  );
}


  seRedirigerVersInscription() {
  this.router.navigate(['/Inscription']);
}
}
