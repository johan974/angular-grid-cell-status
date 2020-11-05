import {AfterViewInit, Component} from '@angular/core';
import {defaults as defaultControls} from 'ol/control';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import VectorSource from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import {Fill, Stroke, Style} from 'ol/Style';
import Polygon from 'ol/geom/Polygon';
import MultiPoint from 'ol/geom/MultiPoint';

@Component({
  selector: 'app-openlayers-polygon',
  templateUrl: './openlayers-polygon.component.html',
  styleUrls: ['./openlayers-polygon.component.css']
})
export class OpenlayersPolygonComponent implements AfterViewInit {
  map: Map;
  vectorSource: VectorSource;
  vectorLayer: Vector;
  // coordinatesPolygon = [813079.7791264898, 5929220.284081122, 814078.7791264898, 5929220.284081122,
  //  814078.7791264898, 6929221.284081122, 813079.7791264898, 6929221.284081122];
  // coordinatesPolygon = [[[48.0, 25.0], [42.0, 25.0], [42.0, 32.0], [48.0, 32.0], [48.0, 25.0]]];
  coordinatesPolygon = [[[25.0, 48.0], [ 25.0, 42.0], [32.0, 42.0], [32.0, 48.0], [25.0, 48.0]]];

  ngAfterViewInit() {
    const polygonStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 255, 1.0)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 3
      })
    });
    this.vectorSource = new VectorSource({features: []});
    this.vectorLayer = new Vector({
      source: this.vectorSource,
      styles: [polygonStyle]
    });
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        this.vectorLayer
      ],
      view: new View({
        center: [813079.7791264898, 5929220.284081122],
        zoom: 7
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
    // var vecLyr = this.map.getLayersByName('VectorLayer')[0];
    // Does this help in showing the polygon?
    // this.map.raiseLayer(this.vectorLayer, this.map.layers.length);
    this.addPolygon();
  }

  addPolygon() {
    const geometry = new Polygon(this.coordinatesPolygon).transform('EPSG:4326', this.map.getView().getProjection());
    // const geometry = new MultiPoint(this.coordinatesPolygon).transform('EPSG:4326', this.map.getView().getProjection());
    // const geometry = new Polygon(this.coordinatesPolygon);
    // let epsg4326 = new Projection("EPSG:4326");
    // const polygonPoints: Point[] = [];
    // for ( let i = 0; i < this.coordinatesPolygon.length; i += 2) {
    //   let point = new Point( fromLonLat([this.coordinatesPolygon[i+1], this.coordinatesPolygon[i]]));
    //   polygonPoints.push( point);
    // }
    // let linearRing = new LinearRing(polygonPoints);
    // let geometry = new Polygon([linearRing]);
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
