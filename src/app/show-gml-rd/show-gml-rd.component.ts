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
  selector: 'app-show-gml-rd',
  templateUrl: './show-gml-rd.component.html',
  styleUrls: ['./show-gml-rd.component.css']
})
export class ShowGmlRdComponent implements OnInit, AfterViewInit {
  fileText: string;
  gmlFeatures: Feature<Geometry>[] = [];
  vectorLayer: Vector;
  vectorSource: VectorSource;
  map: Map;
  dutchProjection: Projection;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.defineProjection();
    this.httpClient.get('assets/wfs113-epsg-28992.xml', {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.fileText = data;
          var wfsFormat = new WFS({
            gmlFormat: new GML3()
          });
          this.gmlFeatures = wfsFormat.readFeatures(this.fileText, {
            featureProjection: 'EPSG:3857',
            dataProjection: 'EPSG:28992'
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
        center: transform([173063,441818],'EPSG:28992', 'EPSG:3857'),
        zoom: 9
      }),
      target: "map"
    });
    this.map.addControl(scaleInfo);
    this.map.addControl(mousePosition);
    this.addGmlFeatures();
  }

  defineProjection() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4)
    this.dutchProjection = GetProjection('EPSG:28992');
  }

  addGmlFeatures() {
    if (this.gmlFeatures.length > 0) {
      this.vectorLayer.getSource().addFeatures(this.gmlFeatures);
      //this.map.getView().fit( this.vectorSource.getExtent());
      console.log( this.map.getView().getProjection());
    }
  }
}
