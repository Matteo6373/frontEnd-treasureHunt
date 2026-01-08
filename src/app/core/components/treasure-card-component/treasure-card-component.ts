import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TreasureHunt} from '../../model/TreasureHunt';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {Clue} from '../../model/Clue';
import {ClueService} from '../../services/clue-service';
import {ThemeImagePipe} from '../../pipes/theme-image-pipe';
import {TreasureHuntService} from '../../services/treasure-hunt.service';

@Component({
  selector: 'app-treasure-card-component',
  imports: [
    ThemeImagePipe,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './treasure-card-component.html',
  styleUrl: './treasure-card-component.css',
})
export class TreasureCardComponent {
  @Input() treasure!: TreasureHunt;
  @Output() clueDropped = new EventEmitter<{ treasure: TreasureHunt; event: CdkDragDrop<Clue[]> }>();
  @Output() treasureDeleted = new EventEmitter<TreasureHunt>();

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
          this.clueDropped.emit({ treasure: updatedTreasure, event });
        },
        error: (err) => console.error('Errore reorder clue', err),
      });
    }
  }


  protected createClue(treasure: TreasureHunt) {

  }

  protected generateCluesAI(treasure: TreasureHunt) {

  }

  protected deleteTreasure(treasure: TreasureHunt) {
    if (!confirm(`Sei sicuro di voler cancellare la caccia "${treasure.theme}"?`)) {
      return; // l'utente ha annullato
    }

    // Chiamata al servizio per cancellare dal backend
    this.treasureService.delete(treasure.id!).subscribe({
      next: () => {
        // Notifica il componente padre solo se la cancellazione ha avuto successo
        this.treasureDeleted.emit(treasure);
        console.log(`Caccia "${treasure.theme}" eliminata con successo.`);
      },
      error: (err) => {
        console.error(`Errore durante la cancellazione della caccia "${treasure.theme}":`, err);
        alert('Non è stato possibile cancellare la caccia. Riprova.');
      }
    });
  }

}
