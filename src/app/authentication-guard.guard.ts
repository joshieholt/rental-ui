import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser') != 'null') {
        console.log('authenticated');
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      console.log('not authenticated');
      return false;
  }
}
