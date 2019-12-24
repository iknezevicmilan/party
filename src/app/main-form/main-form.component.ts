import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Party } from '../model/party';
import { DatePipe } from '@angular/common';

export class MainFormParty {
  partyNumber: number;
  party: Party;
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit, OnChanges {

  datePipe: DatePipe = new DatePipe("en-US");
  format: string = "y-MM-dd";

  formGroup: FormGroup;
  
  @Output() handleCreate: EventEmitter<Party> = new EventEmitter<Party>();
  @Output() handleEdit: EventEmitter<Party> = new EventEmitter<Party>();
  @Output() handleCancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() party: Party;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      givenName: [this.party.givenName, [Validators.required]],
      surname: [this.party.surname, [Validators.required]],
      parentName: [this.party.parentName],
      gender: [this.party.gender, [Validators.required]],
      employment: this.fb.group({
        employer: [this.party.employment.employer, [Validators.required]],
        employmentDate: [this.party.employment.employmentDate, [Validators.required]],
        employmentPosition: [this.party.employment.employmentPosition, [Validators.required]]
      })
    });
  }

  ngOnChanges() {
    if(this.formGroup) {
      this.formGroup.patchValue({
        givenName: this.party.givenName,
        surname: this.party.surname,
        parentName: this.party.parentName,
        gender: this.party.gender,
        employment: {
          employer: this.party.employment.employer,
          employmentPosition: this.party.employment.employmentPosition
        }
      });

      this.formGroup.get("employment.employmentDate").setValue(this.datePipe.transform(this.party.employment.employmentDate, this.format));
    }
  }

  onSubmit(partyNumber: number = null) {
    const party = this.formGroup.value;

    if(partyNumber) {
      party.partyNumber = partyNumber;
      this.handleEdit.emit(party);
    } else {
      this.handleCreate.emit(party);
    }

    this.formGroup.reset();
  }

  onCancel() {
    this.handleCancel.emit();
    this.formGroup.reset();
  }

}
