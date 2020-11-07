import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasGridComponent } from './canvas-grid/canvas-grid.component';
import { CanvasVariableGridComponent } from './canvas-variable-grid/canvas-variable-grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpenlayersPolygonComponent } from './openlayers-polygon/openlayers-polygon.component';
import { OpenlayersPolygonRdComponent } from './openlayers-polygon-rd/openlayers-polygon-rd.component';
import { OpenlayersPolygonRdBrtComponent } from './openlayers-polygon-rd-brt/openlayers-polygon-rd-brt.component';
import { OpenlayersPolygonColrsRdBrtComponent } from './openlayers-polygon-colrs-rd-brt/openlayers-polygon-colrs-rd-brt.component';
import { OpenlayersShowGmlComponent } from './openlayers-show-gml/openlayers-show-gml.component';
import {HttpClientModule} from '@angular/common/http';
import { OpenlayersShowGeojsonComponent } from './openlayers-show-geojson/openlayers-show-geojson.component';

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
    OpenlayersShowGeojsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
