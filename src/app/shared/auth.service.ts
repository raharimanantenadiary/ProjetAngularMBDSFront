import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }

isTokenExpired(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    // Efface également l'utilisateur du localStorage s'il n'y a pas de token
    localStorage.removeItem('utilisateur');
    return true; // Le token n'est pas présent, donc considéré comme expiré
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



getTokenExpiration(): string {
  const token = localStorage.getItem('token');
  if (token) {
    const payload: any = jwtDecode(token);
    const expiration = new Date(payload.exp * 1000);
    return expiration.toLocaleString();
  }
  return '';
}

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn() {
    this.loggedIn = true;
  }

  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      resolve(this.loggedIn);
      // pas de cas d'erreur ici, donc pas de reject
    });

    return promesse;
  }


 
}
