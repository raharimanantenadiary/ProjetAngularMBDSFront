import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './Shared/auth.guard';
import { InscriptionComponent } from './Utilisateurs/Inscription/inscription.component';
import { TemplateComponent } from './template/template.component';

export const routes: Routes = [
  { path: '', component: TemplateComponent, 
    children: [
      { path: 'Accueil', component: AssignmentsComponent },
      { path: "add", component: AddAssignmentComponent },
      { path: "assignment/:id", component: AssignmentDetailComponent},
      {
        path: "assignment/:id/edit",
        component: EditAssignmentComponent,
        canActivate: [authGuard]
      } 
    ]  
  },
  { path: "Inscription", component: InscriptionComponent }
];
