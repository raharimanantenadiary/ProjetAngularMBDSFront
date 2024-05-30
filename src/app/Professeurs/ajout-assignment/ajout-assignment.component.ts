import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Matieres } from '../../Models/matieres.model';
import { MatieresService } from '../../Services/matieres.service';
import { AssignmentsService } from '../../Services/assignments.service';
import { Assignment } from '../../Models/assignment.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Pour comparer uniquement les dates, pas les heures

    return selectedDate >= today ? null : { invalidDate: true };
  };
}

@Component({
  selector: 'app-ajout-assignment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './ajout-assignment.component.html',
  styleUrls: ['./ajout-assignment.component.css']
})
export class AjoutAssignmentComponent {
  firstFormGroup = this._formBuilder.group({
    nom: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    dateDeRendu: ['', [Validators.required, dateValidator()]],
  });
  isEditable = true;

  matiere: Matieres | null = null;
  assignment: Assignment | null = null;
  id_utilisateur = '';
  durationInSeconds = 3;
  loading: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private matiereService: MatieresService,
    private assignmentService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.getMatiereProf();
  }

  getMatiereProf() {
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
            console.error('Une erreur est survenue lors de la récupération des données :', error);
            this.loading = false;
          }
        );
      }
    }
  }

  OnSubmit() {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        const nomValue = this.firstFormGroup.get('nom')?.value;
        const dateDeRenduValue = this.secondFormGroup.get('dateDeRendu')?.value;

        // Vérifier si les champs nom et dateDeRendu ne sont pas vides
        if (!nomValue || !dateDeRenduValue) {
          this._snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', {
            duration: this.durationInSeconds * 2000,
            panelClass: ['toast-error']
          });
          return;
        }

        if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
          this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
            (response: any) => {
              this.matiere = response[0];
              if (this.matiere) {
                const idMatiere = this.matiere._id;
                if (idMatiere) {
                  this.addNewAssignment(nomValue, dateDeRenduValue, idMatiere);
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

  addNewAssignment(f1: any, f2: any, f3: any) {
    this.assignmentService.addAssignment(f1, f2, f3).subscribe(
      (response: any) => {
        this._snackBar.open('Création du devoir a été réussie', 'Fermer', {
          duration: this.durationInSeconds * 1000,
          panelClass: ['toast-success']
        });
      },
      (error) => {
        this._snackBar.open('Une erreur est survenue lors de la création du devoir', 'Fermer', {
          duration: this.durationInSeconds * 1000,
          panelClass: ['toast-error']
        });
      }
    );
  }
}
