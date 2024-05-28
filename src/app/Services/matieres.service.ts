import { Injectable } from '@angular/core';
import { Matieres } from '../Models/matieres.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8010/api/matieres';

  getAllMatiereEtudiant(page: number, limit: number): Observable<Matieres[]> {
    return this.http.get<Matieres[]>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  getMatiereByProf(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+ "/byProf/" +id);
  }

  getMatiereById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  
  postMatiere(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouter`, formData);
  }


  updateMatiere(matiere: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`, matiere);
  }

  
  

  supprimerMatiere(matiereId: string): Observable<any> {
    const url = `${this.baseUrl}/supprimer`;
    return this.http.delete<any>(url, { body: { _id: matiereId } });
  }
  
}
