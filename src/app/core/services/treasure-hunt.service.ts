import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {TreasureHunt} from '../model/TreasureHunt';
import {InputAi} from '../model/InputAi';

@Injectable({
  providedIn: 'root',
})
export class TreasureHuntService {
  private readonly basePath = '/treasure-hunts';

  constructor(private api : ApiService) {}

  getAll(){
    return this.api.get<TreasureHunt[]>(this.basePath);
  }
  getById(id: string){
    return this.api.get<TreasureHunt>(`${this.basePath}/${id}`);
  }
  create(data: TreasureHunt){
    return this.api.post<TreasureHunt>(this.basePath, data);
  }
  delete(id: string) {
    return this.api.delete<TreasureHunt>(`${this.basePath}/${id}`);
  }
  crateClueAi(id: string, data: InputAi){
    return this.api.post<TreasureHunt>(`${this.basePath}/${id}/ai/clues`, data);
  }

}
