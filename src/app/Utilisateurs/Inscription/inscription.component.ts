import { Component } from '@angular/core';
import { UtilisateursService } from '../../Services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nomFormControl = new FormControl('', [Validators.required]);
  motDePasseFormControl = new FormControl('', [Validators.required]);
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  errorMessage = '';

  constructor(private utilisateursService: UtilisateursService, private router: Router) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  isPasswordNotEmpty(): boolean {
    const passwordValue = this.motDePasseFormControl.value;
    return typeof passwordValue === 'string' && passwordValue.length > 0;
  }

  inscrireUtilisateur(form: NgForm) {
    this.isLoading = true;
    const email = this.emailFormControl.value ?? '';
    const motDePasse = this.motDePasseFormControl.value ?? '';
    const nom = this.nomFormControl.value ?? '';
    this.utilisateursService.sInscrire(nom, email, motDePasse, "", "1").subscribe(
      (response: any) => {
        this.isLoading = false;
        this.errorMessage = 'Utilisateur inscrit avec succès, retourner vers la page login pour se connecter.';
        form.resetForm();
        this.emailFormControl.reset();
        this.nomFormControl.reset();
        this.motDePasseFormControl.reset();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.erreur;
      }
    );
  }

  seRedirigerVersLogin() {
    this.router.navigate(['/login']);
  }
}
