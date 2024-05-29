import { Routes } from '@angular/router';
import { InscriptionComponent } from './Utilisateurs/Inscription/inscription.component';
import { LoginComponent } from './Utilisateurs/Login/login.component';
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


export const routes: Routes = [
  { path: '', component: TemplateComponent, 
    children: [
      { path: "Profile", component: ProfilComponent},
      { path: "Ma-matiere", component: MaMatiereComponent },
      { path: "Ajout-prof", component: AjoutProfComponent },
      { path: "List-prof", component: ListePofComponent },
      { path: "Mes-devoirs", component: MesDevoirsComponent },
      { path: "Nouveau-devoir", component: AjoutAssignmentComponent },
      { path: "Liste-Devoir-Non-Rendu", component: AssignmentNonRenduComponent },
      { path: "Liste-Devoir-Rendu", component: AssignmentRenduComponent },
      { path: "liste-matiere-etudiant", component: MatiereEtudiantComponent },
      { path: "liste-matiere-e-non-rendu", component: AssignmentNonRenduComponentEtudiant  },
      { path: "liste-matiere-e-rendu", component: AssignmentRenduComponentEleve  },
      { path: "liste-matiere-e-rendu/:id_matiere", component: DevoirNonRenduByMatiereComponent  },
      { path: "modifier-matiere/:id", component: ModifierMatiereComponent  },
      { path: "details-devoir/:id", component: DetailAssignmentComponent  },
      { path: "modifier-matiere/:id", component: ModifierMatiereComponent},
      { path: "detail-note", component: DialogueRenduComponent}
    ]  
  },
  { path: "Inscription", component: InscriptionComponent },
  { path: "login", component: LoginComponent }
];
