import { Component } from '@angular/core';

import {AfterViewInit} from '@angular/core';
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
import {Projection} from 'ol/proj';
import {addProjection} from 'ol/proj';


@Component({
  selector: 'app-openlayers-polygon-rd',
  templateUrl: './openlayers-polygon-rd.component.html',
  styleUrls: ['./openlayers-polygon-rd.component.css']
})
export class OpenlayersPolygonRdComponent implements AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  coordinatesPolygon = [
    [
      [5.1234, 52.42345],
      [5.1234, 52.22345],
      [6.1234, 52.22345],
      [6.1234, 52.42345],
      [5.1234, 52.42345]
    ]
  ];
  coordinatesPolygonInRd = [
    [
      [173563, 441818],
      [173063, 441818],
      [173063, 444318],
      [173563, 444318],
      [173563, 441818]
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
        center: [613079.7791264898, 6819220.284081122],
        zoom: 8
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            513079.7791264898, 5929220.284081122,
            748966.9639063801, 7936863.986909639
          ]
        })
      ])
    });
    this.addPolygon();
    this.addPolygonInRd();
  }

  addPolygon() {
    // WORKS !!
    const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  addPolygonInRd() {
    // TODO - does not work yet ...
    const projectionExtentRd = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    let projectionRd = new Projection({
      code: "EPSG:28992",
      units: "m",
      extent: projectionExtentRd
    });
    addProjection(projectionRd);

    const geometry = new Polygon( this.coordinatesPolygonInRd).transform( "EPSG:28992", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
