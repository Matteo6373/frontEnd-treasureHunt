import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-treasure-path-component',
  imports: [],
  templateUrl: './treasure-path-component.html',
  styleUrl: './treasure-path-component.css',
})
export class TreasurePathComponent implements AfterViewInit {
  @ViewChild('boat', { static: true }) boatRef!: ElementRef<SVGImageElement>;
  @ViewChild('sinPath', { static: true }) pathRef!: ElementRef<SVGPathElement>;
  @ViewChild('treasureSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  private boat!: SVGImageElement;
  private path!: SVGPathElement;
  private svg!: SVGSVGElement;
  private pathLength!: number;
  private readonly RESET_PROGRESS = 0.5;

  @Output() openModal = new EventEmitter<void>(); // Evento verso il genitore

  ngAfterViewInit() {
    this.boat = this.boatRef.nativeElement;
    this.path = this.pathRef.nativeElement;
    this.svg = this.svgRef.nativeElement;

    this.pathLength = this.path.getTotalLength();
  }

  private setBoatPosition(x: number, y: number): void {
    const bbox = this.boat.getBBox();
    this.boat.setAttribute('x', (x - bbox.width / 2).toString());
    this.boat.setAttribute('y', (y - bbox.height / 2).toString());
  }

  onBoatLoad() {
    const start = this.path.getPointAtLength(0);
    this.setBoatPosition(start.x + 8, start.y - 4);
    this.setupDrag();
  }

  private setupDrag(): void {
    let isDragging = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const svgRect = this.svg.getBoundingClientRect();
      const boatBBox = this.boat.getBBox();

      let mouseX = e.clientX - svgRect.left;
      mouseX = Math.max(0, Math.min(mouseX, svgRect.width));

      let progress = mouseX / svgRect.width;

      // Compensa larghezza barca
      const boatOffset = boatBBox.width / svgRect.width;
      progress = Math.min(progress, 1 - boatOffset);

      this.updateBoatPosition(progress);

      // Raggiunta fine → emetti evento
      if (progress >= 1 - boatOffset) {
        isDragging = false;
        this.openModal.emit(); // ✅ notifica al genitore
        this.updateBoatPosition(this.RESET_PROGRESS); // reset a metà
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    this.boat.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  private updateBoatPosition(progress: number): void {
    const point = this.path.getPointAtLength(this.pathLength * progress);
    this.setBoatPosition(point.x, point.y);
  }
}
