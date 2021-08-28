import {AutoMapper, mapFrom, ProfileBase} from "@nartc/automapper";
import {Customer} from "../../../domain/customer/models/customer.model";
import {CustomerListDto} from "../../customer/dtos/customer-list.dto";
import {Profile} from "nestjsx-automapper";

@Profile()
export class CustomerMapProfile extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();

        mapper.createMap(Customer, CustomerListDto)
            .forMember(dst => dst.id, mapFrom(src => src.id))
            .forMember(dst => dst.name, mapFrom(src => src.name))
            .forMember(dst => dst.email, mapFrom(src => src.email));
    }
}