import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateurs } from '../Models/utilisateurs.model'; 

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private baseUrl = 'http://localhost:8010/api/utilisateur/login';

  constructor(private http: HttpClient) { }

  seConnecter(email: string, motDePasse: string): Observable<any> {
    return this.http.post<Utilisateurs>(this.baseUrl, { email, motDePasse });
  }

}
