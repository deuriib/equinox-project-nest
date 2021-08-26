import {AggregateRoot} from "@nestjs/cqrs";
import {Guid} from "guid-typescript";
import {CustomerRegisteredEvent} from "../events/customer-registered.event";
import {DateTime} from "luxon";

export class Customer extends AggregateRoot {
    private _name: string;
    private _email: string;
    private _birthDate: Date;
    
    constructor(readonly id: Guid) {
        super();
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }
    get birthDate(): Date {
        return this._birthDate;
    }
    
    create(name: string, email: string, birthDate: Date): void {
        this._name = name;
        this._email = email;
        this._birthDate = birthDate;
        
        this.apply(new CustomerRegisteredEvent(this.id, this._name, this._email, this._birthDate));
    }
}