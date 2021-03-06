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
import Geometry from "ol/geom/Geometry";
import proj4 from "proj4";
import {register} from "ol/proj/proj4";
import {get as GetProjection, transform} from "ol/proj";
import WFS from "ol/format/WFS";
import TileLayer from "ol/layer/Tile";
import {createStringXY, format} from "ol/coordinate";
import GML3 from "ol/format/GML3";
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
  vectorSource: VectorSource;
  map: Map;
  newProjection: Projection;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.defineProjection();
    this.httpClient.get('assets/wfs113-epsg-2154.xml', {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.fileText = data;
          var wfsFormat = new WFS({
            gmlFormat: new GML3()
          });
          this.gmlFeatures = wfsFormat.readFeatures(this.fileText, {
            featureProjection: 'EPSG:2154',
            dataProjection: 'EPSG:2154'
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
        color: "rgba(255, 0, 0, 0.8)"
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 10
      })
    });
    this.vectorSource = new VectorSource({
      format: new WFS(),
      features: []
    });
    this.vectorLayer = new Vector({
      source: this.vectorSource,
      style: [polygonStyle]
    });

    let scaleInfo = new ScaleLine({
      units: 'degrees',
      minWidth: 100
    });
    const mousePosition = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: 'EPSG:3857',
      undefinedHTML: '&nbsp;No coordinate active'
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          })
        }),
        this.vectorLayer
      ],
      view: new View({
        //projection: this.dutchProjection,
        center: transform([830867.49,7382438.52],'EPSG:2154', 'EPSG:3857'),
        zoom: 9
      }),
      target: "map"
    });
    this.map.addControl(scaleInfo);
    this.map.addControl(mousePosition);
    this.addGmlFeatures();
  }

  defineProjection() {
    proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    register(proj4);
    this.newProjection = GetProjection('EPSG:2154');
  }


  addGmlFeatures() {
    if (this.gmlFeatures.length > 0) {
      this.vectorLayer.getSource().addFeatures(this.gmlFeatures);
      //this.map.getView().fit( this.vectorSource.getExtent());
      console.log( this.map.getView().getProjection());
    }
  }
}
