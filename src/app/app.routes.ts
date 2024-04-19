import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './Shared/auth.guard';
import { InscriptionComponent } from './Utilisateurs/Inscription/inscription.component';
import { LoginComponent } from './Utilisateurs/Login/login.component';
import { TemplateComponent } from './template/template.component';
import { ProfilComponent } from './Utilisateurs/profil/profil.component';
import { MaMatiereComponent } from './Professeurs/ma-matiere/ma-matiere.component';
import { ListeDevoirMatiereComponent } from './Professeurs/liste-devoir-matiere/liste-devoir-matiere.component';
import { AssignmentNonRenduComponent } from './Professeurs/assignment-non-rendu/assignment-non-rendu.component';

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
      },
      { path: "Profile", component: ProfilComponent},
      { path: "Ma-matiere", component: MaMatiereComponent },
      { path: "Liste-Devoir-Matiere/:id", component: ListeDevoirMatiereComponent },
      { path: "Liste-Devoir-Non-Rendu", component: AssignmentNonRenduComponent }
    ]  
  },
  { path: "Inscription", component: InscriptionComponent },
  { path: "login", component: LoginComponent }
];
