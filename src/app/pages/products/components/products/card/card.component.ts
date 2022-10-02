import { Component, Input, OnInit } from '@angular/core';

import { IProduct } from '../../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() product: IProduct | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
