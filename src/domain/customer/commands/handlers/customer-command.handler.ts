import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {RegisterNewCustomerCommand} from "../register-new-customer.command";
import {DomainCommandHandler} from "../../../core/messaging/domain-command-handler";
import {Customer} from "../../models/customer.model";
import {Guid} from "guid-typescript";
import {ValidationContract} from "fluent-validator-typescript";
import {CustomerDomainService} from "../../services/customer-domain.service";

@CommandHandler(RegisterNewCustomerCommand)
export class CustomerCommandHandler extends DomainCommandHandler
    implements ICommandHandler<RegisterNewCustomerCommand> {
    //TODO: add the customer repository dependency
    constructor(private eventBus: EventPublisher) {
        super();
    }

    async execute(command: RegisterNewCustomerCommand): Promise<ValidationContract> {
        if (!command.isValid()) {
            return command.validationResult;
        }
        
        const customer = this.eventBus.mergeObjectContext(
            CustomerDomainService.createNewCustomer(command.name, command.email, command.birthDate)
        );
        
        //TODO:Repository create customer 
        
        //if eny errors
        //add the error to the notification
        this.addError('Error creating de customer');
        
        // if everything is correct commit the domain model
        return await this.commit(customer.commit);
    }
}