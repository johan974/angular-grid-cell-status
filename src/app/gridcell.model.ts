export class GridCell {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  status: string;
  lastCheck: Date;
  color: string;

  constructor(xminIn: number, yminIn: number, xmaxIn: number, ymaxIn: number, statusIn: string) {
    this.xmin = xminIn;
    this.ymin = yminIn;
    this.xmax = xmaxIn;
    this.ymax = ymaxIn;
    this.status = statusIn;
    this.color = '#00ff00'; // default
  }
}
