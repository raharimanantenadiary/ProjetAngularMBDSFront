import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from '../../Services/assignments.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-assignment',
  standalone: true,
  imports: [CommonModule,MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatButtonModule],
  templateUrl: './delete-assignment.component.html',
  styleUrl: './delete-assignment.component.css'
})
export class DeleteAssignmentComponent {

  selectedAssignment: any;
  durationInSeconds = 3;

  constructor(
    private _snackBar: MatSnackBar,
    private assignmentService: AssignmentsService,
    public dialogRef: MatDialogRef<DeleteAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedAssignment = data.assignment;
    console.log(this.selectedAssignment);
  }

  valider(){
    if (this.selectedAssignment) {
      
      this.assignmentService.deleteAssignment(this.selectedAssignment).subscribe(
        (response) => {
          console.log('assignment supprimé avec succès :', response);
          this.dialogRef.close();
          this._snackBar.open('La suppression du devoir a été réussie', 'Fermer', {
            duration: this.durationInSeconds * 1000,
            panelClass: ['toast-success']
          });
        },
        (error) => {
          console.error('Erreur lors de la suppression :', error);
          this._snackBar.open('Une erreur est survenue lors de la suppresion du devoir', 'Fermer', {
            duration: this.durationInSeconds * 1000,
            panelClass: ['toast-error'] 
          });
        }
        );
    }
    this.dialogRef.close('refresh');
  }


}
