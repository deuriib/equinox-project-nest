import {Message} from "./message";
import {ValidationContract} from "fluent-validator-typescript";

export abstract class DomainCommand extends Message{
    protected constructor(){
        super();
        
        this.timestamp = Date.now();
        this.validationResult = new ValidationContract();
    }
    
    public validationResult:  ValidationContract;
    public timestamp: number;
    
    abstract isValid(): boolean;
}