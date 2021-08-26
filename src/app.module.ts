import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CustomerController} from "./app/customer/customer.controller";
import { CustomerService } from './app/customer/services/customer.service';
import {CqrsModule} from "@nestjs/cqrs";
import {CustomerCommandHandler} from "./domain/customer/commands/handlers/customer-command.handler";
import {CustomerEventHandler} from "./domain/customer/events/handlers/customer-event.handler";

export const CommandHandlers = [CustomerCommandHandler];
export const EventHandlers =  [CustomerEventHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService,
      ...CommandHandlers,
      ...EventHandlers,
  ],
})
export class AppModule {}
