import {Guid} from "guid-typescript";
import {Notifiable} from "fluent-validator-typescript";

export abstract class Message extends Notifiable {

    private _messageType: string;
    private _aggregateId: Guid;

    get messageType(): string {
        return this._messageType;
    }

    protected set messageType(value: string) {
        this._messageType = value;
    }

    get aggregateId(): Guid {
        return this._aggregateId;
    }

    protected set aggregateId(value: Guid) {
        this._aggregateId = value;
    }

    protected constructor() {
        super();
        
        this.messageType = this.constructor.name;
    }
}