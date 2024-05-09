import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDetailsService {

  constructor(private http:HttpClient) {  }

  uri = 'http://localhost:8010/api/assignmentsDetails';
  uri_post = 'http://localhost:8010/api/assignmentDetails';
  uri_new = 'http://localhost:8010/api/assignmentsDetails/new';

  postAssignementDetails(data: any): Observable<any> {
    return this.http.post<any>(this.uri_post, data);
  }

  newAssignementDetails(data: any): Observable<any> {
    return this.http.post<any>(this.uri_new, data);
  }

  getAssignmentRenduProf(idm: string):Observable<any> {
    return this.http.get<any>(this.uri + "/RenduProf/" + idm );
  }

  getAssignmentNonRenduProf(idm: string):Observable<any> {
    return this.http.get<any>(this.uri + "/NonRenduProf/" + idm );
  }


}
