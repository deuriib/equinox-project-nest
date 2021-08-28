import {IsEmail, IsNotEmpty, IsString, IsDateString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class CreateCustomerDto {
    @ApiProperty({
        type: String,
        name: 'name',
        nullable: false,
        required: true,
        description: 'name of the customer'
    })
    @IsNotEmpty({message: 'The customer name is required'})
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        name: 'email',
        nullable: false,
        required: true,
        description: 'email of the customer'
    })
    @IsEmail({}, {message: 'Please enter a valid email address'})
    @IsNotEmpty({message: 'Please provide an email address'})
    email: string;

    @ApiProperty({
        type: Date,
        name: 'birthDate',
        nullable: false,
        required: true,
        description: 'birth date of the customer',
        format: 'yyyy-MM-dd'
    })
    @IsDateString({strict: false},{message: 'Please enter a valid birth date, with format yyyy-MM-dd'})
    @IsNotEmpty({message: 'The customer BirthDate is required'})
    birthDate: Date;
}