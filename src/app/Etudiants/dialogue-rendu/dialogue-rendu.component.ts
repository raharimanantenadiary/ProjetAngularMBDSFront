import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialogue-rendu',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './dialogue-rendu.component.html',
  styleUrls: ['./dialogue-rendu.component.css']
})
export class DialogueRenduComponent implements OnInit {
  note: any = "";
  remarque: any = "";
  id_devoir: any = "";

  constructor(
    public dialogRef: MatDialogRef<DialogueRenduComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentDetailService: AssignmentDetailsService
  ) { }

  ngOnInit(): void {
    this.getInformationNote();
  }

  getInformationNote() {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      if (utilisateur && utilisateur._id) { 
        this.assignmentDetailService.getAssignmentsRenduEleveDetail(utilisateur._id, this.data.devoirId).subscribe(
          (response) => {
            this.note = response.note;
            this.remarque = response.remarque;
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'assignment :', error);
          }
        );
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
