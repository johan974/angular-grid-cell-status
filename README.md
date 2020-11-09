# CanvasGrid

Show grid of cells that are clickable. 

## Versions

<table class="wikitable">
<caption>Features</caption>
<tbody>
<tr>
<th>Feature</th>
<th>Description</th>
</tr>
<tr>
<td>canvas-grid</td>
<td>simple grid using JS without openlayers</td>
</tr>
<tr>
<td>canvas-variablegrid</td>
<td>cells of various sizes using JS without openlayers</td>
</tr>
<tr>
<td>openlayers-polygon</td>
<td>adding polygon to openlayers6</td>
</tr>
<tr>
<td>openlayers-polygon-rd</td>
<td>adding polygon in RD projection</td>
</tr>
<tr>
<td>openlayers-polygon-rd-brt</td>
<td>adding polygon to BRT map</td>
</tr>
<tr>
<td>openlayers-polygon-colors-rd-brt</td>
<td>Adding polygons to BRT map with dynamic styles</td>
</tr>
<tr>
<td>openlayers-show-geojson</td>
<td>Show GeoJson (borders NL)</td>
</tr>
<tr>
<td>openlayers-show-geojson-rd</td>
<td>Show GeoJson in RD coordinates</td>
</tr>
<tr>
<td>openlayers-show-geojson-rd-brt</td>
<td>Show GeoJson in RD coordinates on BRT map</td>
</tr>
<tr>
<td>openlayers-show-geojson-rd-brt</td>
<td>Show GeoJson in RD coordinates on BRT map PLUS click show name and status</td>
</tr>
<tr>
<td>openlayers-show-gml2-wfs100</td>
<td>Show GML v2 (WFS1.0.0) file</td>
</tr>
<tr>
<td>openlayers-show-gml</td>
<td>Show GML v3 (WFS1.1.0) file</td>
</tr>
<tr>
<td>openlayers-show-gml-rd</td>
<td>Show GML v3 (WFS1.1.0) RD file</td>
</tr>
<tr>
<td>openlayers-show-gml-rd-brt</td>
<td>Show GML v3 (WFS1.1.0) RD file on BRT</td>
</tr>
<tr>
<td>openlayers-show-gml-test-rd</td>
<td>Show GML v3 (WFS1.1.0) RD BGT test</td>
</tr>
</tbody>
</table>

## Todo

* Loading GML file
* Loading GML file in RD coords
* Drawing polygon and store
* Updating polygon and store

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
            projection: new Projection("ESPG:28992"),
            protocol: new WFS({
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
