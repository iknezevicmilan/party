export class Employment {
    employer: string;
    employmentDate: Date;
    employmentPosition: string;

    initConstructor(
        employer: string,
        employmentDate: Date,
        employmentPosition: string
    ): Employment {
        this.employer = employer;
        this.employmentDate = employmentDate;
        this.employmentPosition = employmentPosition;

        return this;
    } 
}