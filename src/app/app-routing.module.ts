import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanvasGridComponent} from "./canvas-grid/canvas-grid.component";

const routes: Routes = [
  {path: '', redirectTo: '/canvas', pathMatch: 'full'},
  {path: 'canvas', component: CanvasGridComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
