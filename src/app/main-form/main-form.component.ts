import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Party } from '../model/party';
import { DatePipe } from '@angular/common';

var datePipe: DatePipe = new DatePipe("en-US");
var format: string = "y-MM-dd";

function nameValidator(): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value == null) return { 'name': true };

    if(!(<string>c.value).match('^[a-zA-Z ]*$')) 
      return { 'name': true };
    else
      return null;
  };
}

function futureDateValidator(): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value == null) return { 'futureDate': true }

    
    if((new Date(c.value)).getTime() > new Date().getTime()) return { 'futureDate': true };
    return null;
  }
}

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
  formGroup: FormGroup;
  
  @Output() handleCreate: EventEmitter<Party> = new EventEmitter<Party>();
  @Output() handleEdit: EventEmitter<Party> = new EventEmitter<Party>();
  @Output() handleCancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() party: Party;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      givenName: [this.party.givenName, [Validators.required, nameValidator()]],
      surname: [this.party.surname, [Validators.required, nameValidator()]],
      parentName: [this.party.parentName, [nameValidator()]],
      gender: [this.party.gender, [Validators.required]],
      employment: this.fb.group({
        employer: [this.party.employment.employer, [Validators.required, nameValidator()]],
        employmentDate: [this.party.employment.employmentDate, [Validators.required, futureDateValidator()]],
        employmentPosition: [this.party.employment.employmentPosition, [Validators.required, nameValidator()]]
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

      this.formGroup.get("employment.employmentDate").setValue(datePipe.transform(this.party.employment.employmentDate, format));
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
