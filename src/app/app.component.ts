import { Component, OnInit } from '@angular/core';
import { Party } from './model/party';
import { Employment } from './model/employment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cnt: number = 0;
  parties: Party[] = new Array<Party>();
  mainFormParty: Party = new Party();

  ngOnInit() {
    const employment: Employment = new Employment().initConstructor('Asseco SEE', new Date(), 'Software developer');
    
    this.parties = new Array<Party>(
      new Party().initConstructor(1, 'Milan', 'Knezevic', 'Nikola', 'male', employment),
      new Party().initConstructor(2, 'Branko', 'Simovic', null, 'male', employment),
      new Party().initConstructor(3, 'Luka', 'Krivacevic', null, 'male', employment),
      new Party().initConstructor(4, 'Stefan', 'Milunovic', null, 'male', employment),
      new Party().initConstructor(5, 'Stefan', 'Cekic', null, 'male', employment)
    );

    this.cnt = 5;
  }

  handleMainFormCreate(party: Party) {
    party.partyNumber = ++this.cnt;
    this.parties.push(party);
  }

  handleMainFormEdit(party: Party) {
    for(let i = 0; i < this.parties.length; i++) {
      if(this.parties[i].partyNumber === party.partyNumber) {
        this.parties[i] = party;
        break;
      }
    }

    this.mainFormParty = new Party();
  }

  handleMainFormCancel() {
    this.mainFormParty = new Party();
  }

  handleMainGridEdit(partyNumber: number) {
    this.mainFormParty = this.parties.find(p => p.partyNumber === partyNumber);
  }

  handleMainGridDelete(partyNumber: number) {
    for(let i = 0; i < this.parties.length; i++) {
      if(this.parties[i].partyNumber === partyNumber) {
        this.parties.splice(i, 1);
        break;
      }
    }
  }

}