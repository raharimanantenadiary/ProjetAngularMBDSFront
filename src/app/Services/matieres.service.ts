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

  getMatiereByProf(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+ "/byProf/" +id);
  }

}
