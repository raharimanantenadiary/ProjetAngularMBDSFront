import { Injectable } from '@angular/core';
import { Matieres } from '../Models/matieres.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  matieres : Matieres[] = []

  constructor() { }
}
