import {AfterViewInit, Component, ElementRef,ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-treasure-path-component',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
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

  constructor(private router:Router) {}

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

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const svgRect = this.svg.getBoundingClientRect();
      const boatBBox = this.boat.getBBox();

      let clientX = e.clientX;
      let mouseX = clientX - svgRect.left;
      mouseX = Math.max(0, Math.min(mouseX, svgRect.width));

      let progress = mouseX / svgRect.width;
      const boatOffset = boatBBox.width / svgRect.width;
      progress = Math.min(progress, 1 - boatOffset);

      this.updateBoatPosition(progress);

      if (progress >= 1 - boatOffset) {
        isDragging = false;
        this.boat.releasePointerCapture(e.pointerId);
        this.onTreasureReached();
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      this.boat.releasePointerCapture(e.pointerId);
    };

    this.boat.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      isDragging = true;
      this.boat.setPointerCapture(e.pointerId);
    });

    this.boat.addEventListener('pointermove', onPointerMove);
    this.boat.addEventListener('pointerup', onPointerUp);
    this.boat.addEventListener('pointercancel', onPointerUp);
  }

  private updateBoatPosition(progress: number): void {
    const point = this.path.getPointAtLength(this.pathLength * progress);
    this.setBoatPosition(point.x, point.y);
  }

  private onTreasureReached() {
    this.router.navigate(['/treasure-scroll']);
  }

}
