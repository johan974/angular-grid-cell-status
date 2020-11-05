import {AfterViewInit, Component} from '@angular/core';
import {defaults as defaultControls} from 'ol/control';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import ZoomToExtent from "ol/control/ZoomToExtent";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";

@Component({
  selector: 'app-openlayers-polygon',
  templateUrl: './openlayers-polygon.component.html',
  styleUrls: ['./openlayers-polygon.component.css']
})
export class OpenlayersPolygonComponent implements AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  coordinatesPolygon = [
    [
      [15.1234, 48.12345],
      [15.1234, 46.12345],
      [18.1234, 46.12345],
      [18.1234, 48.12345],
      [15.1234, 48.12345]
    ]
  ];

  ngAfterViewInit() {
    let polygonStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.2)"
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 10
      })
    });
    let vectorSource = new VectorSource({features: []});
    this.vectorLayer = new Vector({
      source: vectorSource,
      styles: [polygonStyle]
    });
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            813079.7791264898,
            5929220.284081122,
            848966.9639063801,
            5936863.986909639
          ]
        })
      ])
    });
    this.addPolygon();
  }

  addPolygon() {
    const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
