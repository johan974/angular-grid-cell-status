<?xml version="1.0" encoding="utf-8"?>
<gml:FeatureCollection xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       gml:id="foo" xmlns:gml="http://www.opengis.net/gml/3.2">
  <gml:featureMember>
    <TopLevelObject gml:id="TopLevelObject.1">
      <content>
        <Object gml:id="Object.1">
          <geometry>
            <gml:Polygon gml:id="id.8f853d13d0fd4ed7a389ea867293a79f" srsName="urn:ogc:def:crs:EPSG::28992">
              <gml:exterior>
                <gml:LinearRing>
                  <gml:posList srsDimension="2">173063 441818 173463 441818 173463 444818 173063 444818 173063 441818</gml:posList>
                </gml:LinearRing>
              </gml:exterior>
            </gml:Polygon>
          </geometry>
          <foo>bar</foo>
        </Object>
      </content>
      <content>
        <Object gml:id="Object.2">
          <geometry>
            <gml:Polygon gml:id="id.8f853d13d0fd4ed7a389ea867293a79e" srsName="urn:ogc:def:crs:EPSG::28992">
              <gml:exterior>
                <gml:LinearRing>
                  <gml:posList srsDimension="2">172063 440818 172463 440818 172463 442818 172063 443818 172063 440818</gml:posList>
                </gml:LinearRing>
              </gml:exterior>
            </gml:Polygon>
          </geometry>
          <foo>baz</foo>
        </Object>
      </content>
    </TopLevelObject>
  </gml:featureMember>
</gml:FeatureCollection>
