import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CanvasGridComponent} from './canvas-grid/canvas-grid.component';
import {CanvasVariableGridComponent} from './canvas-variable-grid/canvas-variable-grid.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OpenlayersPolygonComponent} from './openlayers-polygon/openlayers-polygon.component';
import {OpenlayersPolygonRdComponent} from './openlayers-polygon-rd/openlayers-polygon-rd.component';
import {OpenlayersPolygonRdBrtComponent} from './openlayers-polygon-rd-brt/openlayers-polygon-rd-brt.component';
import {OpenlayersPolygonColrsRdBrtComponent} from './openlayers-polygon-colrs-rd-brt/openlayers-polygon-colrs-rd-brt.component';
import {OpenlayersShowGmlComponent} from './openlayers-show-gml/openlayers-show-gml.component';
import {HttpClientModule} from '@angular/common/http';
import {OpenlayersShowGeojsonComponent} from './openlayers-show-geojson/openlayers-show-geojson.component';
import {OpenlayersShowGeojsonRdBrtComponent} from './openlayers-show-geojson-rd-brt/openlayers-show-geojson-rd-brt.component';
import {OpenlayersShowGeojsonRdComponent} from './openlayers-show-geojson-rd/openlayers-show-geojson-rd.component';
import {OpenlayersShowGml2Wfs100Component} from './openlayers-show-gml2-wfs100/openlayers-show-gml2-wfs100.component';
import {ShowGmlRdBrtComponent} from './show-gml-rd-brt/show-gml-rd-brt.component';
import {ShowGmlRdComponent} from './show-gml-rd/show-gml-rd.component';
import {ShowGmlTestRdComponent} from './show-gml-test-rd/show-gml-test-rd.component';
import { ShowGmlTestRdCentriodComponent } from './show-gml-test-rd-centriod/show-gml-test-rd-centriod.component';
import {FormsModule} from "@angular/forms";
import {GeometryInternalCentroidService} from "./services/geometry-internal-centroid.service";
import { OpenlayersShowGeojsonDynoStylesComponent } from './openlayers-show-geojson-dyno-styles/openlayers-show-geojson-dyno-styles.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasGridComponent,
    CanvasVariableGridComponent,
    OpenlayersPolygonComponent,
    OpenlayersPolygonRdComponent,
    OpenlayersPolygonRdBrtComponent,
    OpenlayersPolygonColrsRdBrtComponent,
    OpenlayersShowGmlComponent,
    OpenlayersShowGeojsonComponent,
    OpenlayersShowGeojsonRdBrtComponent,
    OpenlayersShowGeojsonRdComponent,
    OpenlayersShowGml2Wfs100Component,
    ShowGmlRdBrtComponent,
    ShowGmlRdComponent,
    ShowGmlTestRdComponent,
    ShowGmlTestRdCentriodComponent,
    OpenlayersShowGeojsonDynoStylesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [GeometryInternalCentroidService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
