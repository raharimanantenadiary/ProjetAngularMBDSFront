import { Component } from '@angular/core';
import { UtilisateursService } from '../../Services/utilisateurs.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Utilisateurs } from "../../Models/utilisateurs.model";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
   id_utilisateur='';
   utilisateur: Utilisateurs | null = null;
   URL_IMAGE: string = 'http://localhost:8010/api/uploads';



  constructor(private utilisateursService: UtilisateursService,private router: Router) { }

  ngOnInit(): void {
  const utilisateurData = localStorage.getItem('utilisateur');
  if (utilisateurData) {
    const utilisateur = JSON.parse(utilisateurData);
    this.id_utilisateur = utilisateur._id;
    
    this.utilisateursService.getUtilisateurById(this.id_utilisateur).subscribe(
      (response: any) => {
        this.utilisateur = response; 
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des données utilisateur :', error);
      }
    );
  }
}




}