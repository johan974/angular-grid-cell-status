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

@Injectable()
export class GeometryInternalCentroidService {
  errorMessage = '';

  calculateInternalCentroid(referenceGeometry: Geometry, candidateCentriod: string): Coordinate {
    let internalCentriod: Coordinate = null;
    let rdCoordToCheck: Coordinate;
    try {
      rdCoordToCheck = this.convertStringToCoordinate(candidateCentriod);
    } catch (e) {
      this.errorMessage = e.message;
      return null;
    }
    if (!referenceGeometry.intersectsCoordinate(rdCoordToCheck)) {
      if (referenceGeometry.getType() === GeometryType.POLYGON) {
        const isAPolygon: Polygon = referenceGeometry as Polygon;
        internalCentriod = isAPolygon.getInteriorPoint().getCoordinates();
      } else if (referenceGeometry.getType() === GeometryType.MULTI_POLYGON) {
        const isAPolygon: MultiPolygon = referenceGeometry as MultiPolygon;
        const multiPoint = isAPolygon.getInteriorPoints();
        if (multiPoint !== null) {
          internalCentriod = multiPoint.getPoint(0).getCoordinates();
        }
      } else if (referenceGeometry.getType() === GeometryType.CIRCLE) {
        const isAPolygon: Circle = referenceGeometry as Circle;
        internalCentriod = isAPolygon.getCenter();
      } else {
        throwError('Geometry with centroid not in the geometry is not Polygon, MultiPolygon or Circle');
      }
    } else {
      return rdCoordToCheck;
    }
    return internalCentriod;
  }

  coordinateToRdString(coordinate: Coordinate): string {
    if (coordinate !== null) {
      const nums = coordinate.slice(0, 2);
      return '' + nums[0] + ' ' + nums[1];
    }
    return '';
  }

  convertStringToCoordinate(coordinateString: string): Coordinate {
    if (coordinateString === null) {
      throw new Error('Invalid coordinate string: ' + coordinateString);
    }
    const coordinateStringParts = coordinateString.split(' ', 2);
    if (coordinateStringParts === null || coordinateStringParts.length !== 2) {
      throw new Error('Invalid coordinate string (number of parts): ' + coordinateString);
    }
    const coordinateParts: number[] = [];
    coordinateParts[0] = +coordinateStringParts[0];
    coordinateParts[1] = +coordinateStringParts[1];
    return coordinateParts;
  }

  readRdCoordinate(wkt: string): Coordinate {
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
    // return new WKT().readGeometry(wkt, {
    //   dataProjection: 'EPSG:28992',
    //   featureProjection: 'EPSG:28992'
    // });
    const geometry = new WKT().readGeometry(wkt);
    return geometry;
  }

}

