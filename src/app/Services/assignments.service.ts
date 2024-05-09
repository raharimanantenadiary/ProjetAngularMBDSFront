import { Injectable } from '@angular/core';
import { Assignment } from '../Models/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from '../Shared/logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logService:LoggingService,
              private http:HttpClient) { }

  uri = 'http://localhost:8010/api/assignments';


  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri);
  }


  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
           catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  getAssignmentByMatiereByProf(idm: string,idp:string):Observable<any> {
    return this.http.get<any>(this.uri + "/byMatiere/" + idm + "/" + idp)
  }

  getAssignmentsEleveByMatiere(idm: string,idp:string):Observable<any> {
    return this.http.get<any>(this.uri + "/eleve/byMatiere/" + idm + "/" + idp)
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

 addAssignment(nom: string, dateDeRendu: string, matiere: string): Observable<any> {
  const assignmentData = { nom, dateDeRendu, matiere };
  return this.http.post(this.uri, assignmentData);
}


  updateAssignment(assignment:Assignment):Observable<any> {
    this.logService.log(assignment.nom, "modifié");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.logService.log(assignment.nom, "supprimé");
    return this.http.delete(this.uri + "/" + assignment._id);
  }


  getAssignmentsRenduEleve(id: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.uri}/RenduEleve/${id}`);
  }

  getAssignmentsNonRenduEleve(id: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.uri}/NonRenduEleve/${id}`);
  }


}
