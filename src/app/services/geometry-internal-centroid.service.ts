import Geometry from 'ol/geom/Geometry';
import {Coordinate} from 'ol/coordinate';
import GeometryType from 'ol/geom/GeometryType';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import {Injectable} from '@angular/core';
import Circle from 'ol/geom/Circle';
import {throwError} from 'rxjs';
import WKT from 'ol/format/WKT';
import Point from "ol/geom/Point";
import {GeometryInternalCentroid} from "./geometry-internal-centroid.model";

@Injectable()
export class GeometryInternalCentroidService {
  errorMessage = '';

  // Bepaal het juiste middelpunt binnen het object: geometrie en kandidaat middelpunt (coordinaat)
  determineInternalCentroid(referenceGeometry: Geometry, candidateCentriod: Coordinate): GeometryInternalCentroid {
    const calculateStatus: GeometryInternalCentroid = new GeometryInternalCentroid();
    calculateStatus.coordinate = candidateCentriod;
    if (!referenceGeometry.intersectsCoordinate(calculateStatus.coordinate)) {
      if (referenceGeometry.getType() === GeometryType.POLYGON) {
        const isAPolygon: Polygon = referenceGeometry as Polygon;
        calculateStatus.coordinate = isAPolygon.getInteriorPoint().getCoordinates();
      } else if (referenceGeometry.getType() === GeometryType.MULTI_POLYGON) {
        const isAPolygon: MultiPolygon = referenceGeometry as MultiPolygon;
        const multiPoint = isAPolygon.getInteriorPoints();
        if (multiPoint !== null) {
          calculateStatus.coordinate = multiPoint.getPoint(0).getCoordinates();
        }
      } else if (referenceGeometry.getType() === GeometryType.CIRCLE) {
        const isAPolygon: Circle = referenceGeometry as Circle;
        calculateStatus.coordinate = isAPolygon.getCenter();
      } else {
        throwError('Geometry with centroid not in the geometry is not Polygon, MultiPolygon or Circle');
      }
      calculateStatus.isChanged = true;
    } else {
      calculateStatus.isChanged = false;
      return calculateStatus;
    }
    return calculateStatus;
  }

  coordinateToRdString(centroid: GeometryInternalCentroid): string {
    if (centroid !== null && centroid.coordinate !== null) {
      return '' + centroid.coordinate[0] + ' ' + centroid.coordinate[1];
    }
    return '';
  }

  convertStringToCoordinate(coordinateString: string): Coordinate {
    if (!/\s/.test(coordinateString)) {
      throw new Error('Invalid coordinate string (number of parts): ' + coordinateString);
    }
    return coordinateString.split(' ', 2).map(x => +x);
  }

  readRdCoordinate(wkt: string): Coordinate {
    // As long as we are working with this RD projection, we can keep it simple
    // const geometry = new WKT().readGeometry(wkt, {
    //   dataProjection: 'EPSG:28992',
    //   featureProjection: 'EPSG:28992'
    // });
    const geometry = new WKT().readGeometry(wkt);
    if (geometry.getType() === GeometryType.POINT) {
      const point = geometry as Point;
      return point.getCoordinates();
    }
    throw new Error('Not a coordinate/point: ' + geometry.getType());
  }

  readRdGeometry(wkt: string): Geometry {
    // As long as we are working with this RD projection, we can keep it simple
    // return new WKT().readGeometry(wkt, {
    //   dataProjection: 'EPSG:28992',
    //   featureProjection: 'EPSG:28992'
    // });
    const geometry = new WKT().readGeometry(wkt);
    return geometry;
  }

  writeCoordinateAsWkt(coordinate: Coordinate): string {
    // There is not direct WKT() utility method for this
    return 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
  }

}

