import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Party } from '../model/party';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css']
})
export class MainGridComponent implements OnInit {

  @Input() parties: Party[]
  @Output() handleEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(partyNumber: number) {
    this.handleEdit.emit(partyNumber);
  }

  onDelete(partyNumber: number) {
    this.handleDelete.emit(partyNumber);
  }

}
