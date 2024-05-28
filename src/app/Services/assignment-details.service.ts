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

  getAssignmentRenduProf(id: string, idp: string, page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}/RenduProf/${id}/${idp}?page=${page}&limit=${limit}`);
  }

  getAssignmentNonRenduProf(id: string, idp: string, page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}/NonRenduProf/${id}/${idp}?page=${page}&limit=${limit}`);
  }
  getAssignmentsRenduParDevoirProf(id: string, idp: string):Observable<any> {
    return this.http.get<any>(this.uri + "/DevoirRenduProf/" + id + "/" + idp);
  }

  getAssignmentsNonRenduParDevoirProf(id: string, idp: string):Observable<any> {
    return this.http.get<any>(this.uri + "/DevoirNonRenduProf/" + id + "/" + idp);
  }

  getAssignmentsRenduEleveDetail(idu: string,ida: string): Observable<any> {
    return this.http.get<any>(`${this.uri}/information/${idu}/${ida}`);
  }


}
