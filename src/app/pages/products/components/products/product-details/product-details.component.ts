import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public product: IProduct | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public value: number | undefined = 1;
  public price: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getProductId(): void {
    this.route.params
      .subscribe((params: Params) => {
        if (!isNaN(+params['id'])) {
          this.productsService.getProductById(params['id'])
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
              this.product = res;
              this.price = this.product?.price;
            })
        }

      });
  }

  public changeQuantity($event: number): void {
    if (this.product) {
      this.price = $event * this.product?.price
    }
  }

}
