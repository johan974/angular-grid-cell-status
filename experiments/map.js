// import "ol/ol.css";
// import { defaults as defaultControls } from "ol/control";
//
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import XYZ from "ol/source/XYZ";
// import ZoomToExtent from "ol/control/ZoomToExtent";
// import VectorSource from "ol/source/Vector";
// import Vector from "ol/layer/Vector";
// import { Fill, Stroke, Style } from "ol/style";
// import Polygon from "ol/geom/Polygon";
// import Feature from "ol/Feature";

let coordinatesPolygon = [
  [
    [48.12345, 25.1234],
    [46.12345, 25.1234],
    [46.12345, 28.1234],
    [48.12345, 28.1234],
    [48.12345, 25.1234]
  ]
];

let polygonStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 0, 0.2)"
  }),
  stroke: new Stroke({
    color: "#ffcc33",
    width: 10
  })
});
let vectorSource = new VectorSource({ features: [] });
let vectorLayer = new Vector({
  source: vectorSource,
  styles: [polygonStyle]
});
let map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      })
    }),
    vectorLayer
  ],
  view: new View({
    center: [813079.7791264898, 5929220.284081122],
    zoom: 7
  }),
  controls: defaultControls().extend([
    new ZoomToExtent({
      extent: [
        813079.7791264898,
        5929220.284081122,
        848966.9639063801,
        5936863.986909639
      ]
    })
  ])
});
addPolygon();

function addPolygon() {
  const geometry = new Polygon(coordinatesPolygon).transform(
    "EPSG:4326",
    map.getView().getProjection()
  );
  vectorLayer.getSource().addFeature(new Feature(geometry));
}
