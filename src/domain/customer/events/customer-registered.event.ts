import { Guid } from "guid-typescript";
import {DomainEvent} from "../../core/messaging/domain-event";
import {DateTime} from "luxon";

export class CustomerRegisteredEvent extends DomainEvent {
   
    constructor(readonly id: Guid, readonly name: string, readonly email: string, readonly birthDate: Date) {
        super();
    }
}