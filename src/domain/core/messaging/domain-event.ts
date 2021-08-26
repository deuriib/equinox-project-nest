import {Message} from "./message";
import {IEvent} from "@nestjs/cqrs";
import {DateTime} from "luxon";

export abstract class DomainEvent extends Message implements IEvent {
    protected constructor(){
        super();

        this.timestamp = DateTime.now();
    }
    public timestamp: DateTime;
}