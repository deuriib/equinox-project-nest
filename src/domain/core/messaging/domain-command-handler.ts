import {ValidationContract, Notification} from "fluent-validator-typescript";

export abstract class DomainCommandHandler {
    private _message: string;
    private readonly validationResult: ValidationContract;

    protected constructor() {
        this.validationResult = new ValidationContract();
    }
    
    protected addError = (message: string) => {
        this.validationResult.addNotification(new Notification('', message));
    }
    
    protected commit = (callback: () => void): Promise<ValidationContract> => {
        if(this.validationResult.valid) {
            callback();
        }
        
        return Promise.resolve(this.validationResult);
    }
}