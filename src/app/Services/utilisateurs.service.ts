import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateurs } from '../Models/utilisateurs.model'; 

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

private baseUrl = 'http://localhost:8010/api/utilisateurs';


  constructor(private http: HttpClient) { }

  seConnecter(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, motDePasse });
  }

  sInscrire(nom: string, email: string, motDePasse: string, photo: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/inscription`, { nom, email, motDePasse, photo, role });
  }

  getUtilisateurById(id: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
}

}
