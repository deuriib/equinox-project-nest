import {CustomerValidation} from "./customer.validation";
import {RegisterNewCustomerCommand} from "../register-new-customer.command";
import {ValidationContract} from "fluent-validator-typescript";

export class RegisterNewCustomerValidation extends CustomerValidation {
    constructor(readonly command: RegisterNewCustomerCommand){
        super(command);
    }

    validate(): ValidationContract {
        this.validateName();
        this.validateEmail();
        this.validateBirthDate();
        
        return this;
    }
}