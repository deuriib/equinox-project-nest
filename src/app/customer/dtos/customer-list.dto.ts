import {IsDateString, IsEmail, IsNotEmpty} from "class-validator";
import {Guid} from "guid-typescript";

export class CustomerListDto {
    id: Guid;
    name: string;
    email: string;
}