import {Component, EventEmitter, HostListener, Input, Output, Signal, signal} from '@angular/core';
import {TreasureHunt} from '../../model/TreasureHunt';

@Component({
  selector: 'app-button-genererate-ai',
  imports: [],
  templateUrl: './button-genererate-ai.html',
  styleUrl: './button-genererate-ai.css',
})
export class ButtonGenererateAi {
  @Input() treasure!: TreasureHunt;
  @Output() generate = new EventEmitter<{ treasure: TreasureHunt; count: number }>();

  showNumberPicker = signal(false);
  hoverNumber = signal(1);

  holdTimeout: any;

  startHold(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.holdTimeout = setTimeout(() => {
      this.showNumberPicker.set(true);
      this.hoverNumber.set(1);
    }, 300);
  }

  endHold() {
    if (this.holdTimeout) clearTimeout(this.holdTimeout);
    this.holdTimeout = null;

    if (this.showNumberPicker()) {

      setTimeout(() => {
        this.generate.emit({ treasure: this.treasure, count: this.hoverNumber() });
        this.showNumberPicker.set(false);
      }, 300);
    }
  }

  pickNumber(n: number) {
    setTimeout(() => {
      this.generate.emit({ treasure: this.treasure, count: n });
      this.showNumberPicker.set(false);
    }, 1000);
  }
  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    if (!this.showNumberPicker()) return;

    const target = event.target as HTMLElement;
    const wrapper = document.querySelector('.position-relative.d-inline-block');
    if (wrapper && !wrapper.contains(target)) {
      this.showNumberPicker.set(false);
    }
  }
}
