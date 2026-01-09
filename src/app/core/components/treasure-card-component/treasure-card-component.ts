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

@Component({
  selector: 'app-treasure-card-component',
  imports: [
    ThemeImagePipe,
    CdkDropList,
    CdkDrag,
    AddClueComponent,
    ButtonGenererateAi
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

    const movedClue: Clue = {
      ...reorderedClues[event.currentIndex],
      step: event.currentIndex + 1
    };

    if (movedClue.id) {
      this.clueService.update(this.treasure.id!, movedClue.id, movedClue).subscribe({
        next: (updatedTreasure: TreasureHunt) => {
          console.log(updatedTreasure);
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

}
