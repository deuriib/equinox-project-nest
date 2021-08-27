import {IsDateString, IsEmail, IsNotEmpty} from "class-validator";
import {Guid} from "guid-typescript";

export class CustomerListDto {
    constructor(readonly id: Guid,
                readonly name: string,
                readonly email: string) {
    }
    
}