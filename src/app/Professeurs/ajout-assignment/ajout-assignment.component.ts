import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Matieres } from '../../Models/matieres.model';
import { MatieresService } from '../../Services/matieres.service';
import { AssignmentsService } from '../../Services/assignments.service';
import { Assignment } from '../../Models/assignment.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


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
    MatProgressSpinner
  ],
  templateUrl: './ajout-assignment.component.html',
  styleUrl: './ajout-assignment.component.css'
})
export class AjoutAssignmentComponent {

  firstFormGroup = this._formBuilder.group({
    nom: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    dateDeRendu: ['', Validators.required],
  });
  isEditable = true;

  matiere: Matieres | null = null;
  assignment: Assignment | null = null;
  id_utilisateur = '';
  durationInSeconds = 3;
  loading: boolean = true;

  constructor(private _formBuilder: FormBuilder,private _snackBar: MatSnackBar,private matiereService: MatieresService,private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.getMatiereProf();
  }


  getMatiereProf(){
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      // console.log(utilisateur);
      if (utilisateur && utilisateur._id) {
          this.id_utilisateur = utilisateur._id;
          // console.log(this.id_utilisateur);
          this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
            (response: any) => {
              this.matiere = response[0];

              if (this.matiere) {
                console.log(this.matiere);
              }
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
        // console.log(utilisateur);
        if (utilisateur && utilisateur._id) {
            this.id_utilisateur = utilisateur._id;
            // console.log(this.id_utilisateur);

            const nomValue = this.firstFormGroup.get('nom')?.value;
            const dateDeRenduValue = this.secondFormGroup.get('dateDeRendu')?.value;

            if (this.firstFormGroup && this.secondFormGroup) {
                this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
                    (response: any) => {
                        this.matiere = response[0];

                        if (this.matiere) {
                            console.log(this.matiere);
                            const idMatiere = this.matiere._id;
                            if (idMatiere) {

                              console.log('nomValue:', nomValue);
                              console.log('dateDeRenduValue:', dateDeRenduValue);
                              console.log('idmatiere:', idMatiere);
                                
                                // Appeler la fonction pour ajouter l'assignment avec le formData
                                this.addNewAssignment(nomValue,dateDeRenduValue,idMatiere);
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


  
  addNewAssignment(f1:any,f2:any,f3:any){
    console.log('nomValue:', f1);
    console.log('dateDeRenduValue:', f2);
    console.log('idmatiere:', f3);
    this.assignmentService.addAssignment(f1,f2,f3).subscribe(
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
