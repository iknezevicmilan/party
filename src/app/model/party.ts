import { Employment } from './employment';

export class Party {
    partyNumber: number;
    givenName: string;
    surname: string;
    parentName: string;
    gender: string;
    employment: Employment = new Employment();

    constructor() { }

    initConstructor(
        partyNumber: number,
        givenName: string,
        surname: string,
        parentName: string,
        gender: string,
        employment: Employment
    ) : Party {
        this.partyNumber = partyNumber;
        this.givenName = givenName;
        this.surname = surname;
        this.parentName = parentName;
        this.gender = gender;
        this.employment = employment;

        return this;
    }
}