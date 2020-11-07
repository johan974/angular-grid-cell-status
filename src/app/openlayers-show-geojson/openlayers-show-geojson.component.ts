import {AfterViewInit, Component} from '@angular/core';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import GeoJSON from 'ol/format/GeoJSON';
import {transform} from "ol/proj";

// Explanation: EPSG:4326 (WGS84)
//   The World Geodetic System of 1984 is the geographic coordinate system (the three-dimensional one) used by GPS
//   to express locations on the earth. WGS84 is the defined coordinate system for GeoJSON, as
//   longitude and latitude in decimal degrees.
//   There is no way to visualize the WGS84 coordinate system on a two-dimensional plane (map)

// EPSG:3857 (Pseudo-Mercator)
// The projected Pseudo-Mercator coordinate system takes the WGS84 coordinate system and projects it onto a
// square. (This projection is also called Spherical Mercator or Web Mercator.) But not all of it – the bounds
// of Pseudo-Mercator are limited to approximately 85.06º North and South latitude.

// Putting it all together:
// Fun fact: This is why we store data in EPSG:4326, but display it in EPSG:3857!)


@Component({
  selector: 'app-openlayers-show-geojson',
  templateUrl: './openlayers-show-geojson.component.html',
  styleUrls: ['./openlayers-show-geojson.component.css']
})
export class OpenlayersShowGeojsonComponent implements AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  coordinatesPolygon = [
    [
      [8.1234, 49.12345],
      [8.1234, 48.12345],
      [11.1234, 48.12345],
      [11.1234, 49.12345],
      [8.1234, 49.12345]
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
    // let vectorSource = new VectorSource({features: []});
    // this.vectorLayer = new Vector({
    //   source: vectorSource,
    //   style: [polygonStyle]
    // });
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          })
        }),
        new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: 'assets/nld.geo.json'
          })
        })
      ],
      view: new View({
        // projection: "EPSG:4326",
        // center: [713079.7791264898, 6929220.284081122],
        center: transform([6.3, 52.0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7
      })
    });
    console.log(this.map.getView().getProjection());
    //  Shows: EPSG:3857 ==> WGS 84 / Pseudo-Mercator
  }

  addPolygon() {
    // const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.map.getView().getProjection());
    // this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
