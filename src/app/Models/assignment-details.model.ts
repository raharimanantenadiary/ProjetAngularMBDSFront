import { Assignment } from "./assignment.model";
import { Utilisateurs } from "./utilisateurs.model";

export class AssignmentDetails {
    _id?: string;
    assignment!: Assignment;
    auteur!: Utilisateurs;
    note!: number;
    remarque!: string;
    rendu!: boolean;
}
