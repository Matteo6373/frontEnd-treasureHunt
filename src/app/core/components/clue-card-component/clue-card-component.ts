import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Clue} from '../../model/Clue';
import {TreasureHunt} from '../../model/TreasureHunt';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-clue-card-component',
  imports: [
    FormsModule,
  ],
  templateUrl: './clue-card-component.html',
  styleUrl: './clue-card-component.css',
})
export class ClueCardComponent {
  @Input() clue!: Clue;
  @Input() treasure!: TreasureHunt;

  @Output() clueUpdated = new EventEmitter<Clue>();
  @Output() clueDeleted = new EventEmitter<Clue>();

  protected readonly document = document;

  editClue() {
    const field: 'text' | 'solution' = this.clue.showSolution ? 'solution' : 'text';
    if(field === 'text') this.clue.editingText = true;
    else this.clue.editingSolution = true;

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const textarea = document.querySelector<HTMLTextAreaElement>(
        field === 'text'
          ? `#clue-textarea-${this.clue.id}`
          : `#clue-solution-${this.clue.id}`
      );
      if(textarea){
        textarea.focus();
        textarea.select();
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }

  saveClue() {
    this.clue.editingText = false;
    this.clue.editingSolution = false;
    this.clueUpdated.emit(this.clue);
  }

  deleteClue() {
    if (confirm('Sei sicuro di voler cancellare questo indizio?')) {
      this.clueDeleted.emit(this.clue);
    }
  }

}
