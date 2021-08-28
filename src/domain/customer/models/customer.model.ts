import {AggregateRoot} from "@nestjs/cqrs";
import {Guid} from "guid-typescript";
import {CustomerRegisteredEvent} from "../events/customer-registered.event";
import {DateTime} from "luxon";

export class Customer extends AggregateRoot {

    constructor(readonly id: Guid,
                readonly name: string,
                readonly email: string,
                readonly birthDate: Date) {
        super();
     
    }
}