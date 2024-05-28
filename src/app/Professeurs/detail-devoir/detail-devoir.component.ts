import { Component, Inject } from '@angular/core';
import { AssignmentDetailsService } from '../../Services/assignment-details.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-devoir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-devoir.component.html',
  styleUrl: './detail-devoir.component.css'
})
export class DetailDevoirComponent {

  selectedAssignment: any;

  constructor(
    private assignmentDetailsService: AssignmentDetailsService,
    public dialogRef: MatDialogRef<DetailDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedAssignment = data.assignment;
    console.log(this.selectedAssignment);
  }

  
}
