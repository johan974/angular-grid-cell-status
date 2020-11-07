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

@Component({
  selector: 'app-openlayers-polygon-rd-brt',
  templateUrl: './openlayers-polygon-rd-brt.component.html',
  styleUrls: ['./openlayers-polygon-rd-brt.component.css']
})
export class OpenlayersPolygonRdBrtComponent implements OnInit, AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  dutchProjection: Projection;
  coordinatesPolygon = [
    [
      [5.1234, 51.92345],
      [5.1234, 51.72345],
      [6.1234, 51.72345],
      [6.1234, 51.92345],
      [5.1234, 51.92345]
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

  ngOnInit(): void {
    this.setProjectionRd();
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
    let vectorSource = new VectorSource({features: []});
    this.vectorLayer = new Vector({
      source: vectorSource,
      style: [polygonStyle]
    });

    this.map = new Map({
      layers: [
        new Tile({
          source: new XYZ({
            url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
          })
        }), this.vectorLayer
      ],
      view: new View({
        projection: this.dutchProjection,
        //center: fromLonLat([5.266524, 52.073253]),
        center: [173563, 441818],
        zoom: 10
      }),
      target: "map"
    });

    this.addPolygon();
    this.addPolygonInRd();
  }

  setProjectionRd() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4)
    this.dutchProjection = GetProjection('EPSG:28992');
  }

  addPolygon() {
    // BOTH work !!!
    const geometry = new Polygon(this.coordinatesPolygonInRd);
    const myfeature = new Feature(geometry)
    this.vectorLayer.getSource().addFeature(myfeature);

    // WORKS: With conversion
    // const geometry = new Polygon(this.coordinatesPolygonInRd).transform("EPSG:28992", this.map.getView().getProjection());
    // this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  addPolygonInRd() {
    const geometry = new Polygon(this.coordinatesPolygon).transform("EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
