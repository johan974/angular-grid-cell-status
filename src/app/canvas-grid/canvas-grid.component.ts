import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.css']
})
export class CanvasGridComponent implements OnInit {
  @ViewChild('myCanvas', {static: true}) canvas;
  canvasWidth = '<unknown>';
  canvasHeight = '<unknown>';
  cellRows = 100;
  cellColumns = 100;
  canvasWidthPx = 1000;
  canvasHeigthPx = 1000;
  clickedInfo = 'Nothing clicked yet';

  rowCellHeight = 10;
  colCellWidth = 10;

  onResize() {
    this.computeWidthAndHeight();
  }

  computeWidthAndHeight() {
    // Not a good thing to do but will get you going.
    // I need to look into the Renderer service instead.
    const canvasElement = this.canvas.nativeElement;

    // These don't change (canvas intrinsic dimensions)
    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    // These will change (scaling applied by the style)
    const computedStyles = getComputedStyle(canvasElement);
    this.canvasWidth = computedStyles.width;
    this.canvasHeight = computedStyles.height;

    this.rowCellHeight = this.canvasHeigthPx / this.cellRows;
    this.colCellWidth = this.canvasWidthPx / this.cellColumns;
  }

  ngOnInit() {
    this.computeWidthAndHeight();
    this.drawGrid();
  }

  drawGrid() {
    const canvasElement = this.canvas.nativeElement;
    let ctx = canvasElement.getContext("2d");
    for (let row = 0; row < this.cellRows; row++) {
      for (let column = 0; column < this.cellColumns; column++) {
        ctx.fillStyle = (((row + column) % 2 == 0) ? '#00ff00' : '#ff0000');
        ctx.fillRect(column * this.colCellWidth, row * this.rowCellHeight, this.colCellWidth, this.rowCellHeight);
      }
    }
  }

  drawCell(row: number, col: number) {
    const canvasElement = this.canvas.nativeElement;
    let ctx = canvasElement.getContext("2d");
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(col * this.colCellWidth, row * this.rowCellHeight, this.colCellWidth, this.rowCellHeight);
  }

  // @HostListener('document:click', ['$event'])
  // handleClick(event) {
  //   this.clickedInfo = 'x = ' + event.target.x + ', y = ' + event.target.y;
  // }
  handleClick(event: MouseEvent): void {
    // this.clickedInfo = 'x = ' + event.clientX + ', y = ' + event.clientY;
    // this.clickedInfo = 'x = ' + event.offsetX + ', y = ' + event.offsetY;
    let clickedRow = Math.floor((event.offsetY / this.rowCellHeight));
    let clickedCol = Math.floor((event.offsetX / this.colCellWidth));
    this.clickedInfo = 'row = ' + clickedRow + ', col = ' + clickedCol;
    this.drawCell(clickedRow, clickedCol);
  }

}
