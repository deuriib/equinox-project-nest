import {Guid} from "guid-typescript";
import {DomainCommand} from "../../core/messaging/domain-command";

export abstract class CustomerCommand extends DomainCommand {
    protected constructor(readonly name: string, readonly email: string, readonly birthDate: Date, readonly id: Guid = Guid.createEmpty()) {
        super();
    }
}