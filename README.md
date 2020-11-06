# CanvasGrid

Show grid of cells that are clickable. 

## Versions

* DONE: v1 - canvas-grid -- all grids are computed and have the same size
* DONE: v2 - upgrade from Angular 7 to 10
* DONE: v3 - canvas-variable-grid -- size of grids is determined by the input data
* DONE: v4 - map polygons above openlayers map
* DONE: OSM with R
* DONE: RD projection - with RD coordinates  
* TODO: v5 - working with GeoJson input

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
