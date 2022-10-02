import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.router.navigateByUrl('/products');
        })
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.controls[key].markAsDirty();
      });
    }
  }

}
