import {AfterViewInit, Component, OnInit} from '@angular/core';

import Map from "ol/Map";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import Projection from 'ol/proj/Projection';
import Feature from "ol/Feature";
import XYZ from "ol/source/XYZ";

import {HttpClient} from '@angular/common/http';

import GML3 from 'ol/format/GML3';
import Geometry from "ol/geom/Geometry";
import {Tile} from "ol/layer";
import proj4 from "proj4";
import {register} from "ol/proj/proj4";
import {get as GetProjection} from "ol/proj";
import WFS from "ol/format/WFS";
import {createStringXY} from "ol/coordinate";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";

@Component({
  selector: 'app-openlayers-show-gml',
  templateUrl: './openlayers-show-gml.component.html',
  styleUrls: ['./openlayers-show-gml.component.css']
})
export class OpenlayersShowGmlComponent implements OnInit, AfterViewInit {
  fileText: string;
  gmlFeatures: Feature<Geometry>[] = [];
  vectorLayer: Vector;
  map: Map;
  dutchProjection: Projection;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.setProjectionRd();
    this.httpClient.get('assets/file-rd.gml', {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.fileText = data;
          this.gmlFeatures = new GML3().readFeatures(this.fileText, {
            featureProjection: 'EPSG:28992', dataProjection: 'EPSG:28992'
          });
          this.addGmlFeatures();
        },
        error => {
          console.log(error);
        }
      );
  }

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
    // format: new WFS({gmlFormat: format.GML3 }),
    let vectorSource = new VectorSource({
      format: new WFS(),
      features: []
    });
    this.vectorLayer = new Vector({
      source: vectorSource,
      style: [polygonStyle]
    });
    let scaleInfo = new ScaleLine({
      units: 'degrees',
      minWidth: 100
    });
    const mousePosition = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: 'EPSG:28992',
      undefinedHTML: '&nbsp;No coordinate active'
    });

    this.map = new Map({
      layers: [
        new Tile({
          source: new XYZ({
            url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
          })
        }),
        this.vectorLayer
      ],
      view: new View({
        projection: this.dutchProjection,
        center: [173063, 441818],
        zoom: 12
      }),
      target: "map"
    });
    this.map.addControl(scaleInfo);
    this.map.addControl(mousePosition);
    this.addGmlFeatures();
  }


  setProjectionRd() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4)
    this.dutchProjection = GetProjection('EPSG:28992');
  }

  addGmlFeatures() {
    if (this.gmlFeatures.length > 0) {
      this.vectorLayer.getSource().addFeatures(this.gmlFeatures);
    }
  }
}
