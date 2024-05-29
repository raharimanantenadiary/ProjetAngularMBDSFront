import { Component,Inject  } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {AssignmentDetailsService} from '../../Services/assignment-details.service';
import {MatButtonModule} from '@angular/material/button';

import {
  FormControl,
  Validators,
} from '@angular/forms';
import { Utilisateurs } from '../../Models/utilisateurs.model';
import { UtilisateursService } from '../../Services/utilisateurs.service';

@Component({
  selector: 'app-assignment-formulaire',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule,CommonModule,MatButtonModule],
  templateUrl: './assignment-formulaire.component.html',
  styleUrl: './assignment-formulaire.component.css'
})
export class AssignmentFormulaireComponent {
  selectedAssignment: any;
  auteurFormControl: FormControl;
  noteFormControl: FormControl;
  remarqueFormControl: FormControl;
  utilisateur : Utilisateurs | null = null;

  constructor(
    private assignmentDetailService: AssignmentDetailsService,
    private utilisateurService: UtilisateursService,
    public dialogRef: MatDialogRef<AssignmentFormulaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.selectedAssignment = data.assignment;
    // console.log(this.selectedAssignment);
    // console.log('mail prof:',this.selectedAssignment.assignment.matiere);
    this.auteurFormControl = new FormControl(this.selectedAssignment?.auteur?.nom || '');
    this.noteFormControl = new FormControl(this.selectedAssignment?.note === null ? '' : this.selectedAssignment?.note);
    this.remarqueFormControl = new FormControl(this.selectedAssignment?.remarque === null ? '' : this.selectedAssignment?.remarque);
  }

  submitForm() {
    const note = this.noteFormControl.value;
    const remarque = this.remarqueFormControl.value;
    const rendu = true;
    if (this.selectedAssignment) {
      this.selectedAssignment.note = note;
      this.selectedAssignment.remarque = remarque;
      this.selectedAssignment.rendu = rendu;
 

      const emailPayload = {
        _id: this.selectedAssignment._id,
        auteur: this.selectedAssignment.auteur.mail, 
        note: this.selectedAssignment.note,
        remarque: this.selectedAssignment.remarque,
        rendu: this.selectedAssignment.rendu,
        prof: this.selectedAssignment.assignment.matiere.prof.mail,
        sujet: 'Note et remarque',
        message: `
        <p>Bonjour,</p>
        <p>La correction du devoir <strong>${this.selectedAssignment.assignment.nom}</strong> de l'étudiant <strong>${this.selectedAssignment.auteur.nom}</strong> est maintenant disponible.</p>
        <br>
        <p>--------------------------------------</p>
        <p>Cordialement,</p>
        <p>Professeur ${this.selectedAssignment.assignment.matiere.prof.mail}</p>
      `
      };


      console.log("Détails mis à jour :", this.selectedAssignment);
      this.assignmentDetailService.postAssignementDetails(emailPayload).subscribe(
        (response) => {
          console.log('Détails d\'affectation mis à jour avec succès :', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des détails de l\'affectation :', error);
        }
      );
    }
    this.dialogRef.close('refresh');
  }

}
