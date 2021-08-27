import {IsEmail, IsNotEmpty, IsString, IsDateString} from 'class-validator';


export class CreateCustomerDto {
    @IsNotEmpty({message: 'The customer name is required'})
    @IsString()
    name: string;

    @IsEmail({}, {message: 'Please enter a valid email address'})
    @IsNotEmpty({message: 'Please provide an email address'})
    email: string;

    @IsDateString({strict: false},{message: 'Please enter a valid birth date, with format yyyy-MM-dd'})
    @IsNotEmpty({message: 'The customer BirthDate is required'})
    birthDate: Date;
}