import { Injectable } from '@angular/core';
import { Party } from './model/party';
import { Employment } from './model/employment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private httpClient: HttpClient) { }

  getParties(): Party[] {
    const employment: Employment = new Employment().initConstructor('Asseco SEE', new Date(), 'Software developer');
    
    return new Array<Party>(
      new Party().initConstructor(1, 'Milan', 'Knezevic', 'Nikola', 'male', employment),
      new Party().initConstructor(2, 'Branko', 'Simovic', null, 'male', employment),
      new Party().initConstructor(3, 'Luka', 'Krivacevic', null, 'male', employment),
      new Party().initConstructor(4, 'Stefan', 'Milunovic', null, 'male', employment),
      new Party().initConstructor(5, 'Stefan', 'Cekic', null, 'male', employment),
      new Party().initConstructor(6, 'Anja', 'Gruber', null, 'female', employment)
    );
  }

}
