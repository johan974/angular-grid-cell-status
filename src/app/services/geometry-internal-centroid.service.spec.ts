import {GeometryInternalCentroidService} from "./geometry-internal-centroid.service";
import Polygon from "ol/geom/Polygon";
import {toStringXY} from "ol/coordinate";
import MultiPolygon from "ol/geom/MultiPolygon";

describe('Geometry inernal centroid', () => {
  let getInternalCentroid: GeometryInternalCentroidService;
  beforeEach(() => {
    getInternalCentroid = new GeometryInternalCentroidService();
  });

  it('Simple polygon', () => {
    const polygon = new Polygon( [[[0, 0], [0, 50], [50,50], [50, 0], [0,0]]])
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "0 0"))).toBe('0 0');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "1 1"))).toBe('1 1');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 1"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 100"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "50 50"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "25 25"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "0 50"))).toBe('25 25');
  });

  it('L shape polygon', () => {
    const polygon = new Polygon( [[[1, 1], [1, 90], [10,90], [10, 10], [60,10], [60, 1], [1,1]]])
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "0 0"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "1 1"))).toBe('1 1');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 1"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 100"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "50 50"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "1 90"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "10 10"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "30 30"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "11 11"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "50 50"))).toBe('5.5 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "10 90"))).toBe('5.5 45.5');
  });

  it('U shape polygon', () => {
    const polygon = new Polygon( [[[1, 1], [1, 90], [10,90], [10, 10], [50,10], [50, 90], [60,90], [60,1], [1,1]]])
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "0 0"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "1 1"))).toBe('1 1');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 1"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "100 100"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "30 30"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "11 11"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "50 50"))).toBe('50 50');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "1 90"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "10 10"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "10 90"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "60 10"))).toBe('55 45.5');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( polygon, "60 1"))).toBe('55 45.5');
  });

  it('Multi polygon', () => {
    const polygonlist = [];
    polygonlist.push( new Polygon( [[[0, 0], [0, 50], [50,50], [50, 0], [0,0]]]));
    polygonlist.push( new Polygon( [[[100, 0], [100, 50], [150,50], [150, 0], [100,0]]]));
    const multipolygon = new MultiPolygon(polygonlist);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "0 0"))).toBe('0 0');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "1 1"))).toBe('1 1');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "100 1"))).toBe('100 1');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "100 100"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "50 50"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "25 25"))).toBe('25 25');
    expect( getInternalCentroid.coordinateToRdString(
      getInternalCentroid.calculateInternalCentroid( multipolygon, "0 50"))).toBe('25 25');
  });

});

