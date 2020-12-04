import { RouterModule, Routes } from '@angular/router';

import { GeneratorComponent } from './generator/generator.component';
import { NgModule } from '@angular/core';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: '', redirectTo: 'generator', pathMatch: 'full' },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'generator',
    component: GeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
