import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UtilisateursService } from '../../Services/utilisateurs.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-prof',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './ajout-prof.component.html',
  styleUrls: ['./ajout-prof.component.css']
})
export class AjoutProfComponent {
  firstFormGroup = this._formBuilder.group({
    nom: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    mail: ['', [Validators.required, Validators.email]],  // Ajoutez la validation de l'email ici
  });
  thirdFormGroup = this._formBuilder.group({
    mdp: ['', Validators.required],
  });

  isEditable = true;
  durationInSeconds = 3;
  loading: boolean = false;
  errorMessage: string | null = null;  // Variable pour stocker les messages d'erreur

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private utilisateursService: UtilisateursService
  ) {}

  OnSubmit() {
    const nomValue = this.firstFormGroup.get('nom')?.value;
    const mailValue = this.secondFormGroup.get('mail')?.value;
    const mdpValue = this.thirdFormGroup.get('mdp')?.value;

    // Vérifier si les champs nom, mail et mot de passe ne sont pas vides
    if (!nomValue || !mailValue || !mdpValue) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this._snackBar.open(this.errorMessage, 'Fermer', {
        duration: this.durationInSeconds * 1000,
        panelClass: ['toast-error']
      });
      return;
    }

    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.addNewProf(nomValue, mailValue, mdpValue);
    }
  }

  addNewProf(nom: string, mail: string, mdp: string) {
    this.loading = true;
    this.utilisateursService.sInscrire(nom, mail, mdp, "", "0").subscribe(
      (response: any) => {
        this.loading = false;
        this.errorMessage = null;  // Réinitialiser le message d'erreur en cas de succès
        this._snackBar.open('Ajout réussi', 'Fermer', {
          duration: this.durationInSeconds * 1000,
          panelClass: ['toast-success']
        });
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.error?.erreur || 'Une erreur est survenue lors de l\'ajout';
        if (this.errorMessage) {
          this._snackBar.open(this.errorMessage, 'Fermer', {
            duration: this.durationInSeconds * 2000,
            panelClass: ['toast-error']
          });
        }
      }
    );
  }
}
