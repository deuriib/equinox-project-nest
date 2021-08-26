import {PickType} from "@nestjs/mapped-types";
import {CustomerCommand} from "./customer.command";
import { RegisterNewCustomerValidation } from "./validations/register-new-customer.validation";

export class RegisterNewCustomerCommand extends CustomerCommand {
    constructor(readonly name: string,
                readonly email: string,
                readonly birthDate: Date) {
        super(name, email, birthDate);
    }

    isValid(): boolean {
        this.validationResult = new RegisterNewCustomerValidation(this).validate();
        return this.validationResult.valid;
    }
}