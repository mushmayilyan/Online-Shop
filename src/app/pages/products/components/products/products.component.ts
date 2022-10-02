import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { SharedService } from '../../../../core/services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: IProduct[] = [];
  public searchText: string = '';
  public page: number = 1;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getSearchText();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getProducts(): void {
    this.productsService.getProducts(this.page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        const tempProducts = [...this.products];
        tempProducts.push(...res);
        this.products = tempProducts;
      })
  }

  public getSearchText(): void {
    this.sharedService.searchText$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
      this.searchText = value;
    })
  }

  public onScroll(): void {
    this.page++;
    this.getProducts();
  }

}
