import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchControl: FormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  public search(): void {
    this.sharedService.searchText$.next(this.searchControl.value)
  }

  public logout(): void {
    this.authService.logout();
  }

}
