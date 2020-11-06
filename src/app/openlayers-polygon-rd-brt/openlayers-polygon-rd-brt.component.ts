import {AfterViewInit, Component} from '@angular/core';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import Projection from 'ol/proj/Projection';
import TileWMS from 'ol/source/TileWMS';
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import {addProjection, fromLonLat} from 'ol/proj';

import proj4 from 'proj4';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj'
import {Tile} from "ol/layer";
import XYZ from "ol/source/XYZ";
import Attribution from "ol/control/Attribution";

@Component({
  selector: 'app-openlayers-polygon-rd-brt',
  templateUrl: './openlayers-polygon-rd-brt.component.html',
  styleUrls: ['./openlayers-polygon-rd-brt.component.css']
})
export class OpenlayersPolygonRdBrtComponent implements AfterViewInit {
  vectorLayer: Vector;
  map: Map;
  myprojection: Projection;
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

    // let topNLWMS = new TileLayer({
    //   visible: true,
    //   opacity: 0.7,
    //   source: new TileWMS({
    //     url: 'https://geodata.nationaalgeoregister.nl/top10nlv2/wms',
    //     params: {
    //       LAYERS: 'top10nlv2',
    //       CRS: "EPSG:28992",
    //       tiled: true
    //     }
    //   })
    // });
    // let dutchProjection = new Projection({
    //   code: "EPSG:28992",
    //   units: "m",
    //   extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
    // });
    proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000  +ellps=bessel  +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772 +units=m +no_defs");
    register(proj4)
    let dutchProjection = GetProjection('EPSG:28992');

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

    // let mapView = new View({
    //   minZoom: 3,
    //   maxZoom: 15,
    //   projection: this.myprojection,
    //   center: [173563, 441818],
    //   zoom: 9,
    // });

    // TODO - only zoomed in, NOT lower zooming levels
    // this.map = new Map({
    //   target: "map",
    //   controls: [],
    //   layers: [topNLWMS, this.vectorLayer],
    //   view: mapView
    // });
    this.addPolygon();
    this.addPolygonInRd();
  }

  addPolygon() {
    // BOTH work !!!
    const geometry = new Polygon(this.coordinatesPolygonInRd);
    this.vectorLayer.getSource().addFeature(new Feature(geometry));

    // With conversion
    // const geometry = new Polygon(this.coordinatesPolygonInRd).transform("EPSG:28992", this.map.getView().getProjection());
    // this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  addPolygonInRd() {
    const geometry = new Polygon( this.coordinatesPolygon).transform( "EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
