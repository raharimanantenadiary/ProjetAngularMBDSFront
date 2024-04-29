import { Component, Inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AssignmentsService } from '../../Services/assignments.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-modifier-assignment',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,CommonModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule],
  templateUrl: './modifier-assignment.component.html',
  styleUrl: './modifier-assignment.component.css'
})
export class ModifierAssignmentComponent {

  selectedAssignment: any;
  nomFormControl: FormControl;
  dateFormControl: FormControl;
  durationInSeconds = 3;

  constructor(
    private _snackBar: MatSnackBar,
    private assignmentService: AssignmentsService,
    public dialogRef: MatDialogRef<ModifierAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedAssignment = data.assignment;
    console.log(this.selectedAssignment);
    this.nomFormControl = new FormControl(this.selectedAssignment?.nom || '');
    this.dateFormControl = new FormControl(this.selectedAssignment?.dateDeRendu ? new Date(this.selectedAssignment.dateDeRendu) : null);
  }

  submitForm() {
    const nom = this.nomFormControl.value;
    const date = this.dateFormControl.value;
    if (this.selectedAssignment) {
      this.selectedAssignment.nom = nom;
      this.selectedAssignment.dateDeRendu = date;

      console.log("Assignment mis à jour :", this.selectedAssignment);
      this.assignmentService.updateAssignment(this.selectedAssignment).subscribe(
        (response) => {
          console.log('assignment mis à jour avec succès :', response);
          this.dialogRef.close();
          this._snackBar.open('La modification du devoir a été réussie', 'Fermer', {
            duration: this.durationInSeconds * 1000,
            panelClass: ['toast-success']
          });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error);
          this._snackBar.open('Une erreur est survenue lors de la modification du devoir', 'Fermer', {
            duration: this.durationInSeconds * 1000,
            panelClass: ['toast-error'] 
          });
        }
        );
    }
    this.dialogRef.close('refresh');
  }

}
