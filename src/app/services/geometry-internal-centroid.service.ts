import Geometry from "ol/geom/Geometry";
import {Coordinate} from "ol/coordinate";
import GeometryType from "ol/geom/GeometryType";
import Polygon from "ol/geom/Polygon";
import MultiPolygon from "ol/geom/MultiPolygon";
import {Injectable} from "@angular/core";

@Injectable()
export class GeometryInternalCentroidService {
  calculateInternalCentroid( referenceGeometry: Geometry, candidateCentriod: string): Coordinate {
    let internalCentriod: Coordinate = null;
    const rdCoordToCheck = this.convertStringToCoordinate( candidateCentriod);
    if( ! referenceGeometry.intersectsCoordinate( rdCoordToCheck)) {
      if (referenceGeometry.getType() === GeometryType.POLYGON) {
        let isAPolygon: Polygon = referenceGeometry as Polygon;
        internalCentriod = isAPolygon.getInteriorPoint().getCoordinates();
      } if (referenceGeometry.getType() === GeometryType.MULTI_POLYGON) {
        let isAPolygon: MultiPolygon = referenceGeometry as MultiPolygon;
        const multiPoint = isAPolygon.getInteriorPoints();
        if( multiPoint !== null) {
          internalCentriod = multiPoint.getPoint( 0).getCoordinates();
        }
      }
    } else {
      return rdCoordToCheck;
    }
    return internalCentriod;
  }

  coordinateToRdString( coordinate: Coordinate): string {
    if( coordinate !== null) {
      const nums = coordinate.slice( 0, 2);
      return "" + nums[0] + " " + nums[1];
    }
    return "";
  }

  convertStringToCoordinate( coordinateString: string): Coordinate {
    if( coordinateString === null) {
      return null;
    }
    let coordinateStringParts = coordinateString.split(" ", 2);
    if( coordinateStringParts.length !== 2) {
      return null;
    }
    let coordinateParts: number[] = []
    coordinateParts[0] = +coordinateStringParts[0];
    coordinateParts[1] = +coordinateStringParts[1];
    return coordinateParts;
  }

}

