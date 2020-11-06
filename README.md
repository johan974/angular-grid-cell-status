# CanvasGrid

Show grid of cells that are clickable. 

## Versions

* DONE: canvas-grid -- simple grid using JS without openlayers
* DONE: canvas-variablegrid -- cells of various sizes using JS without openlayers
* DONE: openlayers-polygon -- adding polygon to openlayers6
* DONE: openlayers-polygon-rd -- adding polygon in RD projection
* DONE: openlayers-polygon-rd-brt -- adding polygon to BRT map

## Openlayers install

*  $ npm install ol --save
*  $ npm install @types/ol
*  $ npm install proj4
*  $ npm install @types/proj4
*  Voor proj4: voeg toe als compiler option in tsconfig.ts:  "allowSyntheticDefaultImports": true,
*  Add to angular.json: styles [ ... "node_modules/ol/ol.css", "styles.css"]
*  Look at the component openlayers-polygon

## TODO's
* WFS ... 
<code>
var wfs = new OpenLayers.Layer.Vector("WFS", {
            strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
            projection: new OpenLayers.Projection("ESPG:28992"),
            protocol: new OpenLayers.Protocol.WFS({
                url: geoserverURL,
                srsName: "EPSG:28992",                    
                maxFeatures: 20,
                featureType: "FEATURE",
                geometryName: "the_geom",   
                featureNS: "http://tempuri.org/"                   
            })              
        });
        map.addLayer(wfs);
</code>
