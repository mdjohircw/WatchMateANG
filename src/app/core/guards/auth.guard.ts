import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true; // Allow access if token exists
    }

    // Redirect to login page and preserve attempted URL for future navigation
    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
