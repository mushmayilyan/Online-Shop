import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IUser } from '../interfaces/user.intarface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  public login(obj: IUser): Observable<boolean> {
    localStorage.setItem('user', JSON.stringify(obj));
    return of(true);
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }
}
