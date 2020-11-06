import {AfterViewInit, Component, OnInit} from '@angular/core';

import Map from "ol/Map";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import Projection from 'ol/proj/Projection';
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import {get as GetProjection} from 'ol/proj';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {Tile} from "ol/layer";
import XYZ from "ol/source/XYZ";

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {WFS} from "ol/format";

import GML3 from 'ol/format/GML3';
import Geometry from "ol/geom/Geometry";

@Component({
  selector: 'app-openlayers-show-gml',
  templateUrl: './openlayers-show-gml.component.html',
  styleUrls: ['./openlayers-show-gml.component.css']
})
export class OpenlayersShowGmlComponent implements OnInit, AfterViewInit {
  fileText: string;
  gmlFeatures: Feature<Geometry>[];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get('assets/file.gml', {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.fileText = data;
          this.gmlFeatures = new GML3().readFeatures(this.fileText);
        },
        error => {
          console.log(error);
        }
      );
  }

  vectorLayer: Vector;
  map: Map;
  myprojection: Projection;


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
      style: [polygonStyle]
    });
    // const vectorSource = new VectorSource({
    //   //url: 'assets/file.gml',
    //   format: new WFS({ srsName: "EPSG:23030" }),
    //   projection: 'EPSG:23030'
    // });
    // this.vectorLayer = new Vector({
    //   source: vectorSource
    // });

    // proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    // register(proj4)
    // let dutchProjection = GetProjection('EPSG:28992');

    this.map = new Map({
      layers: [
        new Tile({
          source: new XYZ({
            url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
          })
        }), this.vectorLayer
      ],
      view: new View({
        projection: dutchProjection,
        //center: fromLonLat([5.266524, 52.073253]),
        center: [173563, 441818],
        zoom: 10
      }),
      target: "map"
    });

    this.addGmlFeatures();
  }

  addGmlFeatures() {
    this.vectorLayer.getSource().addFeatures( this.gmlFeatures);
  }
}
