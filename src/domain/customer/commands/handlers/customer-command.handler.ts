import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {RegisterNewCustomerCommand} from "../register-new-customer.command";
import {DomainCommandHandler} from "../../../core/messaging/domain-command-handler";
import {ValidationContract} from "fluent-validator-typescript";
import {CustomerDomainService} from "../../services/customer-domain.service";
import {ICustomerRepository} from "../../../../infra/data/repositories/customer.repository";
import {Guid} from "guid-typescript";

@CommandHandler(RegisterNewCustomerCommand)
export class CustomerCommandHandler extends DomainCommandHandler
    implements ICommandHandler<RegisterNewCustomerCommand, ValidationContract> {

    constructor(
        private eventBus: EventPublisher,
        private customerRepository: ICustomerRepository
    ) {
        super();
    }

    async execute(command: RegisterNewCustomerCommand): Promise<ValidationContract> {
        if (!command.isValid()) {
            return command.validationResult;
        }

        const customer = this.eventBus.mergeObjectContext(
            CustomerDomainService.createNewCustomer(Guid.create(), command.name, command.email, command.birthDate)
        );

        if (await this.customerRepository.findOneByEmail(customer.email) != null) {
            return this.addError('The customer e-mail has already been taken.');
        }

        const success = await this.customerRepository.createCustomer(customer);

        if (!success) {
            this.addError(`An error has occurred creating the customer with id: ${customer.id.toString()}`);
        }

        console.info('Saved customer', customer);
        return await this.commit(customer.commit());
    }
}