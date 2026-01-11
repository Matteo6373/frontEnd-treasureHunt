import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {TreasureHunt} from '../../model/TreasureHunt';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {Clue} from '../../model/Clue';
import {ClueService} from '../../services/clue-service';
import {ThemeImagePipe} from '../../pipes/theme-image-pipe';
import {TreasureHuntService} from '../../services/treasure-hunt.service';
import {AddClueComponent} from '../add-clue-component/add-clue-component';
import {ButtonGenererateAi} from '../button-genererate-ai/button-genererate-ai';
import {InputAi} from '../../model/InputAi';
import {FormsModule} from '@angular/forms';
import {ClueCardComponent} from '../clue-card-component/clue-card-component';

@Component({
  selector: 'app-treasure-card-component',
  imports: [
    ThemeImagePipe,
    CdkDropList,
    CdkDrag,
    AddClueComponent,
    ButtonGenererateAi,
    FormsModule,
    ClueCardComponent
  ],
  templateUrl: './treasure-card-component.html',
  styleUrl: './treasure-card-component.css',
})
export class TreasureCardComponent {
  @Input() treasure!: TreasureHunt;
  @Output() treasureUpdate =
    new EventEmitter<TreasureHunt>();
  @Output() treasureDeleted =
    new EventEmitter<TreasureHunt>();

  loading = signal(false);
  constructor(private clueService: ClueService,
              private treasureService: TreasureHuntService) {}

  dropClue(event: CdkDragDrop<Clue[]>) {
    if (event.previousIndex === event.currentIndex) return;

    const reorderedClues = [...this.treasure.clues];
    moveItemInArray(reorderedClues, event.previousIndex, event.currentIndex);

    const movedClue = reorderedClues[event.currentIndex];

    if (movedClue.id) {
      const payload = {
        step: event.currentIndex + 1,
        text: movedClue.text,
        solution: movedClue.solution
      };

      this.clueService.update(this.treasure.id!, movedClue.id, payload).subscribe({
        next: (updatedTreasure: TreasureHunt) => {
          this.treasureUpdate.emit(updatedTreasure);
        },
        error: (err) => console.error('Errore reorder clue', err),
      });
    }
  }


  protected deleteTreasure(treasure: TreasureHunt) {
    if (!confirm(`Sei sicuro di voler cancellare la caccia "${treasure.theme}"?`)) {
      return;
    }
    this.treasureService.delete(treasure.id!).subscribe({
      next: () => {
        this.treasureDeleted.emit(treasure);
      },
      error: (err) => {
        console.error(`Errore durante la cancellazione della caccia "${treasure.theme}":`, err);
        alert('Non è stato possibile cancellare la caccia. Riprova.');
      }
    });
  }

  protected addClue($event: { text: string; solution: string }) {
    const payload: Clue = {
      text: $event.text,
      solution: $event.solution
    };

    this.clueService.create(this.treasure.id!, payload).subscribe({
      next: (updatedTreasure: TreasureHunt) => {
        this.treasureUpdate.emit(updatedTreasure);
      },
      error: (err) => {
        console.error(`Errore create clue`, err);
      }
    });
  }

  protected generateCluesAI(treasure: TreasureHunt, count: number) {
    this.loading.set(true);
    const payload: InputAi = {
      difficulty: 'media',
      numberOfClues: Number(count),
    }
    this.treasureService.crateClueAi(treasure.id!, payload).subscribe({
      next: (updatedTreasure: TreasureHunt) => {
        this.treasureUpdate.emit(updatedTreasure);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(`Errore creating clue`, err);
      }
    })
  }
  protected deleteClue(clue: Clue) {
    if (!this.treasure.id || !clue.id) return;
    this.clueService.delete(this.treasure.id, clue.id).subscribe({
      next: (updatedTreasure: TreasureHunt) => {
        this.treasureUpdate.emit(updatedTreasure);
      },
      error: (err) => {
        console.error('Errore delete clue', err);
        alert('Errore durante la cancellazione dell’indizio');
      }
    });
  }
  protected saveClue(clue: Clue) {
    const payload: Clue = {
      step: clue.step,
      text: clue.text,
      solution: clue.solution
    };

    this.clueService.update(this.treasure.id!, clue.id!, payload).subscribe({
      next: (data: TreasureHunt) => {
        this.treasureUpdate.emit(data);
      },
      error: (err) => {
        console.error('Errore update clue', err);
        alert('Errore durante il salvataggio dell’indizio/soluzione');
      }
    });
  }

}
