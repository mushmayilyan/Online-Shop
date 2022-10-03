import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
