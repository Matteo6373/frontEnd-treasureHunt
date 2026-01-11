import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Clue} from '../../model/Clue';

@Component({
  selector: 'app-add-clue-component',
  imports: [
    FormsModule
  ],
  templateUrl: './add-clue-component.html',
  styleUrl: './add-clue-component.css',
})
export class AddClueComponent {
  @Input() treasure!: any;
  @Output() add = new EventEmitter<{ text: string; solution: string }>();
  @ViewChild('solutionInput') solutionInput!: ElementRef<HTMLInputElement>;

  clueText = '';
  solution = '';

  submit() {
    if (!this.clueText.trim() || !this.solution.trim()) return;

    this.add.emit({
      text: this.clueText.trim(),
      solution: this.solution.trim()
    });

    this.clueText = '';
    this.solution = '';
  }

  protected focusSolution() {
    this.solutionInput.nativeElement.focus();
  }
}
