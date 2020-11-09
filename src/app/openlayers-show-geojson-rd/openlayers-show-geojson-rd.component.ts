import {AfterViewInit, Component, OnInit} from '@angular/core';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import GeoJSON from 'ol/format/GeoJSON';
import {get as GetProjection, transform} from "ol/proj";
import proj4 from "proj4";
import {register} from "ol/proj/proj4";
import Projection from "ol/proj/Projection";

@Component({
  selector: 'app-openlayers-show-geojson-rd',
  templateUrl: './openlayers-show-geojson-rd.component.html',
  styleUrls: ['./openlayers-show-geojson-rd.component.css']
})
export class OpenlayersShowGeojsonRdComponent implements OnInit, AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  dutchProjection: Projection;
  coordinatesPolygon = [
    [
      [8.1234, 49.12345],
      [8.1234, 48.12345],
      [11.1234, 48.12345],
      [11.1234, 49.12345],
      [8.1234, 49.12345]
    ]
  ];

  ngOnInit(): void {
    this.setProjectionRd();
  }

  setProjectionRd() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4);
    this.dutchProjection = GetProjection('EPSG:28992');
  }

  ngAfterViewInit() {
    let polygonStyleSuccess = new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.5)"
      }),
      stroke: new Stroke({
        color: "#ff2211",
        width: 7
      })
    });
    let polygonStyleFailed = new Style({
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.5)"
      }),
      stroke: new Stroke({
        color: "#22ccff",
        width: 7
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
              format: new GeoJSON({dataProjection: 'EPSG:28992', featureProjection: 'EPSG:28992'}),
              url: 'assets/polygon.geo.json',
            }),
            style: function (feature, resolution) {
              const status = feature.get('status').toUpperCase();
              return status === 'S' ? polygonStyleSuccess : polygonStyleFailed;
            }
          })
        ],
        view: new View({
          // projection: "EPSG:4326",
          // center: [713079.7791264898, 6929220.284081122],
          center: transform([5.86417, 52.445276], 'EPSG:4326', 'EPSG:3857'),
          zoom: 7
        })
      }
    );
    console
      .log(this.map.getView().getProjection()
      );
    //  Shows: EPSG:3857 ==> WGS 84 / Pseudo-Mercator
  }

  addPolygon() {
    // const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.map.getView().getProjection());
    // this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
