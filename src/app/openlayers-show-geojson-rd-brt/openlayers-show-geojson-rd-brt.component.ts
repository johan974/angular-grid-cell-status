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
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {createStringXY} from "ol/coordinate";
import {Tile} from "ol/layer";

import Select from 'ol/interaction/Select';
import Feature from "ol/Feature";

@Component({
  selector: 'app-openlayers-show-geojson-rd-brt',
  templateUrl: './openlayers-show-geojson-rd-brt.component.html',
  styleUrls: ['./openlayers-show-geojson-rd-brt.component.css']
})
export class OpenlayersShowGeojsonRdBrtComponent implements OnInit, AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  dutchProjection: Projection;
  myFeature: Feature;
  myFeatureName: string;
  myFeatureStatus: string;

  ngOnInit(): void {
    this.setProjectionRd();
  }

  setProjectionRd() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4);
    this.dutchProjection = GetProjection('EPSG:28992');
  }

  ngAfterViewInit() {
    const polygonStyleSuccess = new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.5)'
      }),
      stroke: new Stroke({
        color: '#ff2211',
        width: 7
      })
    });
    const polygonStyleFailed = new Style({
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.5)'
      }),
      stroke: new Stroke({
        color: '#22ccff',
        width: 7
      })
    });

    this.map = new Map({
        target: 'map',
        layers: [
          new Tile({
            source: new XYZ({
              url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
            })
          }),
          new VectorLayer({
            source: new VectorSource({
              format: new GeoJSON({dataProjection: 'EPSG:28992', featureProjection: 'EPSG:28992'}),
              url: 'assets/polygon.geo.json',
            }),
            style: (feature, resolution) => {
              const status = feature.get('status').toUpperCase();
              return status === 'S' ? polygonStyleSuccess : polygonStyleFailed;
            }
          })
        ],
        view: new View({
          projection: this.dutchProjection,
          center: [173563, 441818],
          zoom: 11
        })
      }
    );

    // Scale and current position
    const scaleInfo = new ScaleLine({
      units: 'degrees',
      minWidth: 100
    });
    const mousePosition = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: 'EPSG:28992',
      undefinedHTML: '&nbsp;No coordinate active'
    });
    this.map.addControl(scaleInfo);
    this.map.addControl(mousePosition);

    // Show features:
    const selectSingleClick = new Select();
    this.map.addInteraction(selectSingleClick);
    const that = this;
    selectSingleClick.on('select', e => {
      // console.log(e.target.getFeatures());
      e.target.getFeatures().forEach((feature) => {
        console.log(feature);
        that.myFeatureName = feature.get('name');
        that.myFeatureStatus = feature.get('status');
      });
    });
  }
}
