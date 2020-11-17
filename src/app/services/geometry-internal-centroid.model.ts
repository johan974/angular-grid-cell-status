import {Coordinate} from 'ol/coordinate';
/*
 * GeometryInternalCentroid - service en model
 *   Wanneer de locatie service een object oplevert, dan WERD de centroid_rd gebruikt
 *   om vervolgens een WMS object te selecteren via een gesimuleerde klik.
 *   Het probleem was dat de centroid/middelpunt buiten het object kan liggen (bijv. L-vormig object).
 * Deze service berekent of de centroid binnen het object ligt. Zo niet:
 *   isChanged = true
 *   coordinate bevat een coordinaat binnen het object.
 * Deze gewijzigde coordinaat kan gebruikt worden voor de gesimuleerde klik op het juiste object
 *   te selecteren.
 */
export class GeometryInternalCentroid {
  public errorMessage = '';
  public coordinate: Coordinate;
  public isChanged = false;
}
