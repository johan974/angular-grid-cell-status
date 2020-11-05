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
import {addProjection} from 'ol/proj';

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
      [5.1234, 52.12345],
      [5.1234, 51.12345],
      [8.1234, 51.12345],
      [8.1234, 52.12345],
      [5.1234, 52.12345]
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
      styles: [polygonStyle]
    });

    let topNLWMS = new TileLayer({
      visible: true,
      opacity: 0.7,
      source: new TileWMS({
        url: 'https://geodata.nationaalgeoregister.nl/top10nlv2/wms',
        params: {
          LAYERS: 'top10nlv2',
          CRS: "EPSG:28992",
          tiled: true
        }
      })
    });

    let projectionExtent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    this.myprojection = new Projection({
      code: "EPSG:28992",
      units: "m",
      extent: projectionExtent
    });

    let mapView = new View({
      minZoom: 3,
      maxZoom: 15,
      projection: this.myprojection,
      center: [173563, 441818],
      zoom: 9,
    });

    // TODO - only zoomed in, NOT lower zooming levels
    this.map = new Map({
      target: "map",
      controls: [],
      layers: [topNLWMS, this.vectorLayer],
      view: mapView
    });
    this.addPolygon();
    this.addPolygonInRd();
  }

  addPolygon() {
    // TODO - does not work yet
    const projectionExtentRd = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    let projectionRd = new Projection({
      code: "EPSG:28992",
      units: "m",
      extent: projectionExtentRd
    });
    addProjection(projectionRd);
    const geometry = new Polygon(this.coordinatesPolygon).transform("EPSG:4326", this.map.getView().getProjection());
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }

  addPolygonInRd() {
    // WORKS !!
    const geometry = new Polygon(this.coordinatesPolygonInRd);
    this.vectorLayer.getSource().addFeature(new Feature(geometry));
  }
}
