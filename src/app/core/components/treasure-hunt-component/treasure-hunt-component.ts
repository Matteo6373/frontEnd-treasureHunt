import {Component, OnInit, signal} from '@angular/core';
import {TreasureHunt} from '../../model/TreasureHunt';
import {TreasureHuntService} from '../../services/treasure-hunt.service';
import {ThemeImagePipe} from '../../pipes/theme-image-pipe';
import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {ClueService} from '../../services/clue-service';
import {Clue} from '../../model/Clue';
import {TreasurePathComponent} from '../treasure-path-component/treasure-path-component';
declare var bootstrap: any;
@Component({
  selector: 'app-treasure-hunt-component',
  imports: [
    ThemeImagePipe,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    TreasurePathComponent
  ],
  templateUrl: './treasure-hunt-component.html',
  styleUrl: './treasure-hunt-component.css',
})
export class TreasureHuntComponent implements OnInit {
  treasureHunts = signal<TreasureHunt[]>([]);

  constructor(private treasureHuntService: TreasureHuntService,
              private clueService: ClueService,) {
  }
  ngOnInit() {
    this.treasureHuntService.getAll().subscribe({
      next: (data: TreasureHunt[]) => {
        this.treasureHunts.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  protected dropClue(
    event: CdkDragDrop<Clue[]>,
    treasure: TreasureHunt
  ) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    // 1️⃣ Cloniamo l'array per non mutare direttamente
    const reorderedClues = [...treasure.clues];

    // 2️⃣ Riordiniamo
    moveItemInArray(
      reorderedClues,
      event.previousIndex,
      event.currentIndex
    );

    // 3️⃣ Ricalcoliamo gli step
    const updatedClue: Clue = {
      ...reorderedClues[event.currentIndex],
      step: event.currentIndex + 1,
    };

    // 4️⃣ Chiamata backend (una sola clue)
    this.clueService
      .update(treasure.id, updatedClue.id, updatedClue)
      .subscribe({
        next: (updatedTreasure: TreasureHunt) => {

          // 5️⃣ Aggiorniamo SOLO quella treasure nel signal
          this.treasureHunts.update((hunts) =>
            hunts.map((h) =>
              h.id === updatedTreasure.id ? updatedTreasure : h
            )
          );
          console.log(this.treasureHunts());
        },
        error: (err) => {
          console.error('Errore reorder clue', err);
        },
      });
  }
  openNewTreasureModal(): void {
    const modalEl = document.getElementById('newTreasureModal');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

}
