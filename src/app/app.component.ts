import { Component, OnInit } from '@angular/core';
import { Party } from './model/party';
import { PartyService } from './party.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cnt: number = 0;
  parties: Party[] = new Array<Party>();
  mainFormParty: Party = new Party();

  constructor(private partyService: PartyService) { }

  ngOnInit() {
    this.parties = this.partyService.getParties();
    this.cnt = this.parties.length - 1;
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