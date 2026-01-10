import {Component, OnInit, signal} from '@angular/core';
import {TreasureHunt} from '../../model/TreasureHunt';
import {TreasureHuntService} from '../../services/treasure-hunt.service';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {Clue} from '../../model/Clue';
import {TreasurePathComponent} from '../treasure-path-component/treasure-path-component';

import {FormsModule} from '@angular/forms';
import {AddTreasureCardComponent} from '../add-treasure-card-component/add-treasure-card-component';
import {TreasureCardComponent} from '../treasure-card-component/treasure-card-component';
@Component({
  selector: 'app-treasure-hunt-component',
  imports: [
    DragDropModule,
    TreasurePathComponent,
    FormsModule,
    AddTreasureCardComponent,
    TreasureCardComponent
  ],
  templateUrl: './treasure-hunt-component.html',
  styleUrl: './treasure-hunt-component.css',
})
export class TreasureHuntComponent implements OnInit {
  treasureHunts = signal<TreasureHunt[]>([]);
  constructor(private treasureHuntService: TreasureHuntService) {
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
  addTreasure(newTreasure: TreasureHunt) {
    this.treasureHunts.update(list => [...list, newTreasure]);
  }

  updateTreasure(treasure: TreasureHunt) {
    this.treasureHunts.update(list =>
      list.map(t => {
        if (t.id !== treasure.id) return t;
        const oldTreasure = t;
        const updatedClues = treasure.clues.map(clueFromBackend => {
          const oldClue = oldTreasure.clues.find(c => c.id === clueFromBackend.id);
          if (oldClue) {
            return { ...clueFromBackend, showSolution: oldClue.showSolution };
          }
          return clueFromBackend;
        });
        return { ...treasure, clues: updatedClues };
      })
    );
  }


  deleteTreasure($event: TreasureHunt) {
    this.treasureHunts.update(list =>
      list.filter(t => t.id !== $event.id)
    );
  }
}
