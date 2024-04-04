import { AssignmentDetails } from "./assignment-details.model";
import { Matieres } from "./matieres.model";

export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  matiere!: Matieres;
  details!: AssignmentDetails;
}
