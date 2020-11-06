import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanvasGridComponent} from './canvas-grid/canvas-grid.component';
import {CanvasVariableGridComponent} from './canvas-variable-grid/canvas-variable-grid.component';
import {OpenlayersPolygonComponent} from "./openlayers-polygon/openlayers-polygon.component";
import {OpenlayersPolygonRdComponent} from "./openlayers-polygon-rd/openlayers-polygon-rd.component";
import {OpenlayersPolygonRdBrtComponent} from "./openlayers-polygon-rd-brt/openlayers-polygon-rd-brt.component";
import {OpenlayersPolygonColrsRdBrtComponent} from "./openlayers-polygon-colrs-rd-brt/openlayers-polygon-colrs-rd-brt.component";

const routes: Routes = [
  {path: '', redirectTo: '/canvas', pathMatch: 'full'},
  {path: 'canvas', component: CanvasGridComponent},
  {path: 'dynamic', component: CanvasVariableGridComponent},
  {path: 'olpolygon', component: OpenlayersPolygonComponent},
  {path: 'olpolygonrd', component: OpenlayersPolygonRdComponent},
  {path: 'olpolygonrdbrt', component: OpenlayersPolygonRdBrtComponent},
  {path: 'olpolygoncolorsrdbrt', component: OpenlayersPolygonColrsRdBrtComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
