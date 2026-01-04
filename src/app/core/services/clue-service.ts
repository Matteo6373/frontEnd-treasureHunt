import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TreasureHunt } from '../model/TreasureHunt';
import {Clue} from '../model/Clue';

@Injectable({
  providedIn: 'root',
})
export class ClueService {

  private readonly basePath = '/treasure-hunts';

  constructor(private api: ApiService) {}

  create(treasureHuntId: string, clue: Clue) {
    return this.api.post<TreasureHunt>(
      `${this.basePath}/${treasureHuntId}/clues`, clue
    );
  }

  update(treasureHuntId: string, clueId: string, clue: Clue) {
    return this.api.put<TreasureHunt>(
      `${this.basePath}/${treasureHuntId}/clues/${clueId}`, clue
    );
  }

  delete(treasureHuntId: string, clueId: string) {
    return this.api.delete<TreasureHunt>(
      `${this.basePath}/${treasureHuntId}/clues/${clueId}`
    );
  }
}
