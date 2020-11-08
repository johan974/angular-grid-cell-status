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
import {transform} from "ol/proj";
import WFS from "ol/format/WFS";
import TileLayer from "ol/layer/Tile";
import {createStringXY} from "ol/coordinate";
import GML2 from "ol/format/GML2";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import GeoJSON from 'ol/format/GeoJSON';
//import { flip } from '@turf/turf';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-openlayers-show-gml2-wfs100',
  templateUrl: './openlayers-show-gml2-wfs100.component.html',
  styleUrls: ['./openlayers-show-gml2-wfs100.component.css']
})
export class OpenlayersShowGml2Wfs100Component implements OnInit, AfterViewInit {
  fileText: string;
  gmlFeatures: Feature<Geometry>[] = [];
  vectorSource: VectorSource;
  vectorLayer: Vector;
  map: Map;
  dutchProjection: Projection;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    //this.httpClient.get('assets/polygon-gml2-wfs100-flipped-coords.xml', {responseType: 'text'})
    this.httpClient.get('assets/polygon-gml2-wfs100.xml', {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.fileText = data;
          var wfsFormat = new WFS({
            gmlFormat: new GML2()
          });
          this.gmlFeatures = wfsFormat.readFeatures(this.fileText, {
            featureProjection: 'EPSG:3857',
            dataProjection: 'EPSG:4326'
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
        center: transform([0.532597,47.428810],'EPSG:4326', 'EPSG:3857'),
        zoom: 12
      }),
      target: "map"
    });
    this.map.addControl(scaleInfo);
    this.map.addControl(mousePosition);
    this.addGmlFeatures();
  }

  addGmlFeatures() {
    if (this.gmlFeatures.length > 0) {
      // const geoJSON = new GeoJSON().writeFeaturesObject(this.gmlFeatures);
      // var flippedGeoJSON = turf.flip(geoJSON);
      // var flippedFeatures = new GeoJSON().readFeatures(flippedGeoJSON, {
      //   featureProjection: 'EPSG:3857',
      //   dataProjection: 'EPSG:4326'
      // });
      this.vectorLayer.getSource().addFeatures(this.gmlFeatures);
      // this.map.getView().fit( this.vectorSource.getExtent());
      console.log( this.map.getView().getProjection());
    }
  }
}
