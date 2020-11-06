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
import TileLayer from "ol/layer/Tile";
import {defaults as defaultControls} from "ol/control";
import ZoomToExtent from "ol/control/ZoomToExtent";

@Component({
  selector: 'app-openlayers-show-gml',
  templateUrl: './openlayers-show-gml.component.html',
  styleUrls: ['./openlayers-show-gml.component.css']
})
export class OpenlayersShowGmlComponent implements OnInit, AfterViewInit {
  fileText: string;
  gmlFeatures: Feature<Geometry>[];
  vectorLayer: Vector;
  map: Map;
  myprojection: Projection;

  constructor(private httpClient: HttpClient) {
  }

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
        center: [813079.7791264898, 5929220.284081122],
        zoom: 7
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });

    this.addGmlFeatures();
  }

  addGmlFeatures() {
    this.vectorLayer.getSource().addFeatures(this.gmlFeatures);
  }
}
