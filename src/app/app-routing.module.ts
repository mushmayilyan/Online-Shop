import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './core/components/main/main.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: '', component: MainComponent, children: [
      {path: 'products', canLoad: [AuthGuard],
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
