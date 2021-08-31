import {Module} from "@nestjs/common";
import {CustomerController} from "./customer/customer.controller";
import {CustomerService} from "./customer/services/customer.service";
import {DomainModule} from "src/domain/domain.module";

import './common';
import {AutomapperModule} from "nestjsx-automapper";

@Module({
    imports: [
        AutomapperModule.withMapper({
            useUndefined: true,
            skipUnmappedAssertion: true,
            throwError: false
        }),
        DomainModule,
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [AutomapperModule, DomainModule]
})
export class ApplicationModule {
}