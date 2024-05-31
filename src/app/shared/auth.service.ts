import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }


//code  généré mais suis la logique selon nos propres conditions
isTokenExpired(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('utilisateur');
    return true; 
  }

  try {
    const payload: any = jwtDecode(token);
    const expiration = new Date(payload.exp * 1000);
    const isExpired = expiration <= new Date();

    if (isExpired) {
      localStorage.removeItem('utilisateur');
      localStorage.removeItem('token');
    }

    return isExpired;
  } catch (error) {
    console.error('Erreur lors du décodage du token :', error);
    return true;
  }
}

deconnexion() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('utilisateur'); 
}



getTokenExpiration(): string {
  const token = localStorage.getItem('token');
  if (token) {
    const payload: any = jwtDecode(token);
    const expiration = new Date(payload.exp * 1000);
    return expiration.toLocaleString();
  }
  return '';
}


  getUtilisateur() {
    const utilisateurData = localStorage.getItem('utilisateur');
    if (utilisateurData) {
      const utilisateur = JSON.parse(utilisateurData);
      return utilisateur;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const utilisateur = this.getUtilisateur();
    return utilisateur && utilisateur._id ? true : false;
  }

  isAdmin(): boolean {
    const utilisateur = this.getUtilisateur();
    return utilisateur && utilisateur.role === 0;
  }

  isEleve(): boolean {
    const utilisateur = this.getUtilisateur();
    return utilisateur && utilisateur.role === 1;
  }


 
}
