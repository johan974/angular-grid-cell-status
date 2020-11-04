import {AfterViewInit, Component} from '@angular/core';
import {defaults as defaultControls} from 'ol/control';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import VectorSource from 'ol/source/Vector';
import {fromLonLat, transform} from 'ol/proj';
import Vector from 'ol/layer/Vector';
import {Fill, Stroke, Style} from 'ol/Style';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import LinearRing from 'ol/geom/LinearRing';

@Component({
  selector: 'app-openlayers-polygon',
  templateUrl: './openlayers-polygon.component.html',
  styleUrls: ['./openlayers-polygon.component.css']
})
export class OpenlayersPolygonComponent implements AfterViewInit {
  map: Map;
  vectorSource: VectorSource;
  vectorLayer: Vector;
  // coordinatesPolygon = [813079.7791264898, 5929220.284081122, 813078.7791264898, 5929220.284081122,
  //   813078.7791264898, 5929221.284081122, 813079.7791264898, 5929221.284081122];
  coordinatesPolygon = [48.12345, 25.1234, 46.12345, 25.1234, 46.12345, 28.1234, 48.12345, 28.1234, 48.12345, 25.1234];

  ngAfterViewInit() {
    let polygonStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 10
      })
    });
    this.vectorSource = new VectorSource({ features: [] });
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
    this.addPolygon();
  }

  addPolygon() {
    //let epsg4326 = new Projection("EPSG:4326");
    const polygonPoints: Point[] = []
    for( let i = 0; i < this.coordinatesPolygon.length; i += 2) {
      let point = new Point( fromLonLat([this.coordinatesPolygon[i+1], this.coordinatesPolygon[i]]));
      polygonPoints.push( point);
    }
    let linearRing = new LinearRing(polygonPoints);
    let geometry = new Polygon([linearRing]);
    this.vectorLayer.getSource().addFeature(geometry);
  }
}
