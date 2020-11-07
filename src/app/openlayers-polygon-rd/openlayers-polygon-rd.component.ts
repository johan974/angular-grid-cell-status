import {AfterViewInit, Component} from '@angular/core';
import {defaults as defaultControls} from 'ol/control';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import ZoomToExtent from "ol/control/ZoomToExtent";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import {get as GetProjection} from 'ol/proj';
import proj4 from "proj4";
import {register} from "ol/proj/proj4";
import ScaleLine from "ol/control/ScaleLine";

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
      style: [polygonStyle]
    });
    let mousePosition = new ScaleLine({
      units: 'degrees',
      minWidth: 100
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
    this.map.addControl(mousePosition);
    this.addPolygon();
    this.addPolygonInRd();
  }

  addPolygon() {
    const geometry = new Polygon(this.coordinatesPolygon).transform("EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  addPolygonInRd() {
    proj4.defs("EPSG:28992", "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4)
    let dutchProjection = GetProjection('EPSG:28992');
    const geometry = new Polygon(this.coordinatesPolygonInRd).transform('EPSG:28992', this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
