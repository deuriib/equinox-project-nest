import {ValidationContract, Notification} from "fluent-validator-typescript";

export abstract class DomainCommandHandler {
    private readonly validationResult: ValidationContract;

    protected constructor() {
        this.validationResult = new ValidationContract();
    }
    
    protected addError = (message: string): ValidationContract => {
        this.validationResult.addNotification(new Notification('', message));
        return this.validationResult;
    }
    
    protected commit = (callback): Promise<ValidationContract> => {
        if(this.validationResult.valid) {
            callback();
        }
        
        return Promise.resolve(this.validationResult);
    }
}