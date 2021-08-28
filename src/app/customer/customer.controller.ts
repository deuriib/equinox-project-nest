import {CustomerService} from "./services/customer.service";
import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Res} from "@nestjs/common";
import {CreateCustomerDto} from "./dtos/create-customer.dto";
import {response, Response} from "express";
import {CustomerListDto} from "./dtos/customer-list.dto";
import {get} from "http";
import {
    ApiBadRequestResponse, ApiBody,
    ApiConsumes,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiProduces, ApiTags
} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {HttpExceptionResponse} from "../common/filters/http-exception-filter";

@ApiHeader({
    name: 'api-version',
    description: 'Version of the API',
    example: '1'
})
@ApiTags('Customer')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@ApiInternalServerErrorResponse()
@Controller({
    path: 'customers',
    version: '1'
})
export class CustomerController {
    constructor(private customerService: CustomerService) {
    }

    @ApiOkResponse({
        description: 'OK',
        type: CustomerListDto,
    })
    
    @Get()
    async getAllCustomers(@Res() res: Response): Promise<Response> {
        const customers = await this.customerService.getAllCustomers();
        return res.status(HttpStatus.OK).json(customers);
    }

    @ApiOkResponse({
        description: 'Ok'
    })
    @ApiBody({
        type: CreateCustomerDto,
        required: true,
    })
    @ApiBadRequestResponse({
        type: HttpExceptionResponse,
    })
    @Post()
    async createCustomer(@Res() res: Response, @Body() dto: CreateCustomerDto): Promise<Response> {
        const validation = await this.customerService.createCustomer(dto);

        if (validation.invalid) {
            throw new BadRequestException(
                validation.notifications.Select(error => error.message).ToArray()
            );
        }

        return res.status(HttpStatus.CREATED);
    }
}