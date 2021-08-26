import {ValidationContract} from "fluent-validator-typescript";
import {CustomerCommand} from "../customer.command";
import {DomainValidator} from "../../../core/messaging/domain-validator";
import {DateTime} from "luxon";

export abstract class CustomerValidation extends DomainValidator {

    protected constructor(readonly command: CustomerCommand) {
        super();
    }

    protected validateName(): void {
        this.stringIsNotNullOrEmpty(this.command.name, 'name', 'Please ensure you enter a name');
        this.hasMinLen(this.command.name, 3, 'name', 'The Name must have between 3 and 150 characters');
        this.hasMaxLen(this.command.name, 150, 'name', 'The Name must have between 3 and 150 characters');
    }

    protected validateBirthDate(): void {
        const birthDate = DateTime.fromFormat(this.command.birthDate.toString(), 'dd/MM/yyyy');
        this.isTrue(birthDate.isValid, 'birthDate', 'Please ensure you enter a BirthDate');
        this.isTrue(this.haveMinimumAge(birthDate), 'birthDate', 'The customer must have 18 years or more');
    }

    protected validateEmail(): void {
        this.stringIsNotNullOrEmpty(this.command.email, 'email', 'Please ensure you enter a email address');
        this.isEmail(this.command.email, 'email', 'Please enter a valid email address');
    }

    protected validateId(): void {
        this.guidIsNotEmpty(this.command.id, 'id', 'A valid Id is required');
    }

    private haveMinimumAge = (birthDate: DateTime): boolean => {
        const age = -18;
        return birthDate.diffNow('years').years < age
    };
}