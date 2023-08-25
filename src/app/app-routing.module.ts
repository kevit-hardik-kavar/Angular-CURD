import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { EmpDataComponent } from './emp-data/emp-data.component';

const routes: Routes = [
  {
    path: '',
    component: EmpDataComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
