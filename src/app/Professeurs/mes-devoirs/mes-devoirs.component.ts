import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Assignment } from '../../Models/assignment.model';
import { Matieres } from '../../Models/matieres.model';
import { AssignmentsService } from '../../Services/assignments.service';
import { MatieresService } from '../../Services/matieres.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ModifierAssignmentComponent } from '../modifier-assignment/modifier-assignment.component';
import { DeleteAssignmentComponent } from '../delete-assignment/delete-assignment.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mes-devoirs',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogTitle,
    MatDialogContent,
    FormsModule
  ],
  templateUrl: './mes-devoirs.component.html',
  styleUrl: './mes-devoirs.component.css'
})
export class MesDevoirsComponent implements OnInit {
  URL_IMAGE: string = 'https://projetangularmbdsback.onrender.com/api/uploads';
  id_utilisateur = '';
  assignments: Assignment[] = [];
  matiere: Matieres | null = null;
  loading: boolean = true;
  devoirSelectionne: Assignment | null = null;

  page: number = 1;
  limit: number = 8;
  totalAssignments: number = 0;
  totalPages: number = 0;

  resultat_filtre: Assignment[] = [];
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private matiereService: MatieresService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignmentProf();
  }

  filtreDevoir() {
    const endDate = new Date(this.endDate);
    endDate.setDate(endDate.getDate() + 1); 

    this.resultat_filtre = this.assignments.filter(devoir => {
      const filtre_nom = devoir.nom.toLowerCase().includes(this.searchText.toLowerCase());
      const filtre_date = (!this.startDate || new Date(devoir.dateDeRendu) >= new Date(this.startDate)) &&
                          (!this.endDate || new Date(devoir.dateDeRendu) < endDate);
      return filtre_nom && filtre_date;
    });
  }

  openDialog(selectedAssignment: Assignment): void {
    const dialogRef = this.dialog.open(ModifierAssignmentComponent, {
      width: '400px',
      data: { assignment: selectedAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAssignmentProf();
      }
    });
  }

  openDialogSuppr(selectedAssignment: Assignment): void {
    const dialogRef = this.dialog.open(DeleteAssignmentComponent, {
      width: '400px',
      data: { assignment: selectedAssignment }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le formulaire a été fermé avec :', result);
      if (result === 'refresh') {
        this.getAssignmentProf();
      }
    });
  }

  getAssignmentProf(): void {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      console.log(utilisateur);
      if (utilisateur && utilisateur._id) {
        this.id_utilisateur = utilisateur._id;
        console.log(this.id_utilisateur);
        this.matiereService.getMatiereByProf(this.id_utilisateur).subscribe(
          (response: any) => {
            this.matiere = response[0];
            this.loading = false;
            if (this.matiere) {
              console.log(this.matiere);
              const idMatiere = this.matiere._id;
              if (idMatiere) {
                console.log(idMatiere);
                this.assignmentService.getAssignmentByMatiereByProf(idMatiere, this.id_utilisateur, this.page, this.limit).subscribe(
                  (response: any) => {
                    this.assignments = response.assignments;
                    this.totalAssignments = response.total;
                    this.totalPages = response.pages;
                    this.filtreDevoir();
                    console.log(this.assignments);
                    console.log(response);
                    this.loading = false;
                  },
                  (error) => {
                    console.error('Une erreur est survenue lors de la récupération des données :', error);
                    this.loading = false;
                  }
                );
              }
            }
          },
          (error) => {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
            this.loading = false;
          }
        );
      }
    }
  }

  changePage(page: number): void {
    this.page = page;
    this.getAssignmentProf();
  }
}
