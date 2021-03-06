import {GeometryInternalCentroidService} from './geometry-internal-centroid.service';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';

describe('Geometry inernal centroid', () => {
  let getInternalCentroid: GeometryInternalCentroidService;
  beforeEach(() => {
    getInternalCentroid = new GeometryInternalCentroidService();
  });

  it('Simple polygon', () => {
    const polygon = new Polygon([[[0, 0], [0, 50], [50, 50], [50, 0], [0, 0]]]);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [0, 0]))).toBe('0 0');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [1, 1]))).toBe('1 1');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100, 1]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100,100]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [50, 50]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [25, 25]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [0, 50]))).toBe('25 25');
  });

  it('L shape polygon', () => {
    const polygon = new Polygon([[[1, 1], [1, 90], [10, 90], [10, 10], [60, 10], [60, 1], [1, 1]]]);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [0, 0]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [1, 1]))).toBe('1 1');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100, 1]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100, 100]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [50, 50]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [1, 90]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [10, 10]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [30, 30]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [11, 11]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [50, 50]))).toBe('5.5 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [10, 90]))).toBe('5.5 45.5');
  });

  it('U shape polygon', () => {
    const polygon = new Polygon([[[1, 1], [1, 90], [10, 90], [10, 10], [50, 10], [50, 90], [60, 90], [60, 1], [1, 1]]]);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [0, 0]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [1, 1]))).toBe('1 1');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100, 1]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [100, 100]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [30, 30]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [11, 11]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [50, 50]))).toBe('50 50');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [1, 90]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [10, 10]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [10, 90]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [60, 10]))).toBe('55 45.5');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [60, 1]))).toBe('55 45.5');
  });

  it('Simple polygon with RD coords', () => {
    const polygon = new Polygon([[[200000, 300000], [200000, 300050], [200050, 300050], [200050, 300000], [200000, 300000]]]);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200000, 300000]))).toBe('200000 300000');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200001, 300001]))).toBe('200001 300001');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200100, 300001]))).toBe('200025 300025');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200100, 300100]))).toBe('200025 300025');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200050, 300050]))).toBe('200025 300025');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200025, 300025]))).toBe('200025 300025');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(polygon, [200000, 300050]))).toBe('200025 300025');

  });

  it('Multi polygon', () => {
    const polygonlist = [];
    polygonlist.push(new Polygon([[[0, 0], [0, 50], [50, 50], [50, 0], [0, 0]]]));
    polygonlist.push(new Polygon([[[100, 0], [100, 50], [150, 50], [150, 0], [100, 0]]]));
    const multipolygon = new MultiPolygon(polygonlist);
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [0, 0]))).toBe('0 0');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [1, 1]))).toBe('1 1');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [100, 1]))).toBe('100 1');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [100, 100]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [50, 50]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [25, 25]))).toBe('25 25');
    expect(getInternalCentroid.coordinateToRdString(
      getInternalCentroid.determineInternalCentroid(multipolygon, [0, 50]))).toBe('25 25');
  });

  it('Read from WKT', () => {
    const polygon = 'POLYGON((220000 460000, 230000 460000, 230000 480000, 220000 480000, 220000 460000))';
    const polygonGeometry = getInternalCentroid.readRdGeometry( polygon);
    expect( polygonGeometry.getType()).toBe( 'Polygon');
    expect( polygonGeometry.getExtent().toString()).toBe( '220000,460000,230000,480000');

    const coord = 'POINT(220000 460000)';
    const coordGeometry = getInternalCentroid.readRdGeometry( coord);
    expect( coordGeometry.getType()).toBe( 'Point');
    expect( getInternalCentroid.readRdCoordinate( coord).toString()).toBe( '220000,460000');
  });

});

