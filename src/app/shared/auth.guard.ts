import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = this.authService.isLoggedIn();

    const requiredRole = route.data['requiredRole'];

    if (loggedIn) {
      const utilisateur = this.authService.getUtilisateur();
      
      if (utilisateur && utilisateur.role === requiredRole) {
        return true;
      } else {
        this.snackBar.open('Accès refusé : rôle requis non satisfait', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.snackBar.open('Veuillez vous connecter pour accéder à cette page', 'Fermer', {
        duration: 3000
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
