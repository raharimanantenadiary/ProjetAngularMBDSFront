import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateurs } from '../Models/utilisateurs.model'; 

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

private baseUrl = 'http://localhost:8010/api/utilisateur';


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

  updateUtilisateur(id: string, updateData: any, photo: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(updateData).forEach(key => {
      formData.append(key, updateData[key]);
    });
    if (photo) {
      formData.append('photo', photo, photo.name);
    }
    return this.http.put<any>(`${this.baseUrl}/modifierUtilisateur/${id}`, formData);
  }

}
