import { Routes } from '@angular/router';
import { InscriptionComponent } from './Utilisateurs/Inscription/inscription.component';
import { LoginComponent } from './Utilisateurs/login/login.component';
import { TemplateComponent } from './template/template.component';
import { ProfilComponent } from './Utilisateurs/profil/profil.component';
import { MaMatiereComponent } from './Professeurs/ma-matiere/ma-matiere.component';
import { AssignmentNonRenduComponent } from './Professeurs/assignment-non-rendu/assignment-non-rendu.component';
import { MatiereEtudiantComponent } from './Etudiants/matiere-etudiant/matiere-etudiant.component';
import { AssignmentNonRenduComponentEtudiant } from './Etudiants/assignment-non-rendu/assignment-non-rendu.component';
import { AssignmentRenduComponentEleve } from './Etudiants/assignment-rendu/assignment-rendu.component';
import { DevoirNonRenduByMatiereComponent } from './Etudiants/devoir-non-rendu-by-matiere/devoir-non-rendu-by-matiere.component';
import { ModifierMatiereComponent } from './Professeurs/Matiere/modifier-matiere/modifier-matiere.component';
import { AssignmentRenduComponent } from './Professeurs/assignment-rendu/assignment-rendu.component';
import { AjoutAssignmentComponent } from './Professeurs/ajout-assignment/ajout-assignment.component';
import { MesDevoirsComponent } from './Professeurs/mes-devoirs/mes-devoirs.component';
import { DetailAssignmentComponent } from './Professeurs/detail-assignment/detail-assignment.component';
import { AjoutProfComponent } from './Professeurs/ajout-prof/ajout-prof.component';
import { ListePofComponent } from './Professeurs/liste-pof/liste-pof.component';
import { DialogueRenduComponent } from './Etudiants/dialogue-rendu/dialogue-rendu.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', component: TemplateComponent,
    children: [
      { path: "Profile", component: ProfilComponent}, //Accessible à tous
      { path: "Ma-matiere", component: MaMatiereComponent ,canActivate: [AuthGuard], data: { requiredRole: 0 } }, 
      { path: "Ajout-prof", component: AjoutProfComponent ,canActivate: [AuthGuard], data: { requiredRole: 0 }}, 
      { path: "List-prof", component: ListePofComponent,canActivate: [AuthGuard], data: { requiredRole: 0 } }, 
      { path: "Mes-devoirs", component: MesDevoirsComponent,canActivate: [AuthGuard], data: { requiredRole: 0 } }, 
      { path: "Nouveau-devoir", component: AjoutAssignmentComponent,canActivate: [AuthGuard], data: { requiredRole: 0 } },
      { path: "Liste-Devoir-Non-Rendu", component: AssignmentNonRenduComponent,canActivate: [AuthGuard], data: { requiredRole: 0 } },
      { path: "Liste-Devoir-Rendu", component: AssignmentRenduComponent,canActivate: [AuthGuard], data: { requiredRole: 0 } }, 
      { path: "liste-matiere-etudiant", component: MatiereEtudiantComponent,canActivate: [AuthGuard], data: { requiredRole: 1 }}, 
      { path: "liste-matiere-e-non-rendu", component: AssignmentNonRenduComponentEtudiant,canActivate: [AuthGuard], data: { requiredRole: 1 }  },
      { path: "liste-matiere-e-rendu", component: AssignmentRenduComponentEleve ,canActivate: [AuthGuard], data: { requiredRole: 1 } }, 
      { path: "liste-matiere-e-rendu/:id_matiere", component: DevoirNonRenduByMatiereComponent,canActivate: [AuthGuard], data: { requiredRole: 1 } }, 
      { path: "modifier-matiere/:id", component: ModifierMatiereComponent,canActivate: [AuthGuard], data: { requiredRole: 0 }  },  
      { path: "details-devoir/:id", component: DetailAssignmentComponent,canActivate: [AuthGuard], data: { requiredRole: 0 }  },
      { path: "modifier-matiere/:id", component: ModifierMatiereComponent,canActivate: [AuthGuard], data: { requiredRole: 0 }} 
    ]  
  },
  { path: "Inscription", component: InscriptionComponent },
  { path: "login", component: LoginComponent }
];