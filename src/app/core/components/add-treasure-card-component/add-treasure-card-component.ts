import { Component, EventEmitter, Output } from '@angular/core';
import {TreasureTheme} from '../../model/TreasureTheme';
import {TreasureHunt} from '../../model/TreasureHunt';
import {TreasureHuntService} from '../../services/treasure-hunt.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-treasure-card',
  templateUrl: './add-treasure-card-component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-treasure-card-component.css']
})
export class AddTreasureCardComponent {

  isEditing = false;
  newTreasureTheme: TreasureTheme = TreasureTheme.PIRATES;
  newTreasureHint = '';

  treasureThemes = Object.values(TreasureTheme);

  @Output() treasureCreated = new EventEmitter<TreasureHunt>();

  constructor(private treasureService: TreasureHuntService) {}

  startEditing() {
    this.isEditing = true;
  }

  saveTreasure(event: Event) {
    event.stopPropagation();
    const payload: TreasureHunt = {
      theme: this.newTreasureTheme,
      hint: this.newTreasureHint,
      clues: []
    };

    this.treasureService.create(payload).subscribe({
      next: (createdTreasure) => {
        console.log('Nuova caccia creata:', createdTreasure);
        this.treasureCreated.emit(createdTreasure);
        this.resetForm();
      },
      error: (err) => {
        console.error('Errore durante la creazione:', err);
      }
    });
  }

  cancelEditing(event: Event) {
    event.stopPropagation();
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.newTreasureTheme = TreasureTheme.PIRATES;
    this.newTreasureHint = '';
  }
}
