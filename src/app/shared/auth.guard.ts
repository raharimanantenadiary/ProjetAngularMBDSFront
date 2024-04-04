import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (authService: AuthService, router: Router) => {
  return authService.isAdmin()
    .then(admin => {
      if (admin) {
        console.log("GUARD: Navigation autorisée");
        return true;
      } else {
        console.log("GUARD: Navigation NON autorisée");
        router.navigate(['/home']);
        return false;
      }
    });
};
