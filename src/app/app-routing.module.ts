import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanvasGridComponent} from './canvas-grid/canvas-grid.component';
import {CanvasVariableGridComponent} from './canvas-variable-grid/canvas-variable-grid.component';
import {OpenlayersPolygonComponent} from "./openlayers-polygon/openlayers-polygon.component";
import {OpenlayersPolygonRdComponent} from "./openlayers-polygon-rd/openlayers-polygon-rd.component";
import {OpenlayersPolygonRdBrtComponent} from "./openlayers-polygon-rd-brt/openlayers-polygon-rd-brt.component";
import {OpenlayersPolygonColrsRdBrtComponent} from "./openlayers-polygon-colrs-rd-brt/openlayers-polygon-colrs-rd-brt.component";
import {OpenlayersShowGmlComponent} from "./openlayers-show-gml/openlayers-show-gml.component";
import {OpenlayersShowGeojsonComponent} from "./openlayers-show-geojson/openlayers-show-geojson.component";
import {OpenlayersShowGeojsonRdBrtComponent} from "./openlayers-show-geojson-rd-brt/openlayers-show-geojson-rd-brt.component";
import {OpenlayersShowGeojsonRdComponent} from "./openlayers-show-geojson-rd/openlayers-show-geojson-rd.component";
import {OpenlayersShowGml2Wfs100Component} from "./openlayers-show-gml2-wfs100/openlayers-show-gml2-wfs100.component";

const routes: Routes = [
  {path: '', redirectTo: '/canvas', pathMatch: 'full'},
  {path: 'canvas', component: CanvasGridComponent},
  {path: 'dynamic', component: CanvasVariableGridComponent},
  {path: 'olpolygon', component: OpenlayersPolygonComponent},
  {path: 'olpolygonrd', component: OpenlayersPolygonRdComponent},
  {path: 'olpolygonrdbrt', component: OpenlayersPolygonRdBrtComponent},
  {path: 'olpolygoncolorsrdbrt', component: OpenlayersPolygonColrsRdBrtComponent},
  {path: 'olshowgml2wfs100', component: OpenlayersShowGml2Wfs100Component},
  {path: 'olshowgml', component: OpenlayersShowGmlComponent},
  {path: 'olshowgeojson', component: OpenlayersShowGeojsonComponent},
  {path: 'olshowgeojsonrd', component: OpenlayersShowGeojsonRdComponent},
  {path: 'olshowgeojsonrdbrt', component: OpenlayersShowGeojsonRdBrtComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
