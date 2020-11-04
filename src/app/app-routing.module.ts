import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanvasGridComponent} from './canvas-grid/canvas-grid.component';
import {CanvasVariableGridComponent} from './canvas-variable-grid/canvas-variable-grid.component';
import {OpenlayersPolygonComponent} from "./openlayers-polygon/openlayers-polygon.component";

const routes: Routes = [
  {path: '', redirectTo: '/canvas', pathMatch: 'full'},
  {path: 'canvas', component: CanvasGridComponent},
  {path: 'dynamic', component: CanvasVariableGridComponent},
  {path: 'olpolygon', component: OpenlayersPolygonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
