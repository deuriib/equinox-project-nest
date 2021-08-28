﻿import {Module} from "@nestjs/common";
import {CustomerController} from "./customer/customer.controller";
import {CustomerService} from "./customer/services/customer.service";
import {DomainModule} from "src/domain/domain.module";
import {InfraModule} from "src/infra/infra.module";
import {AutomapperModule} from "nestjsx-automapper";

import './common';

@Module({
    imports: [
        AutomapperModule.withMapper(),
        DomainModule,
        InfraModule,
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [DomainModule, InfraModule]
})
export class ApplicationModule {
}