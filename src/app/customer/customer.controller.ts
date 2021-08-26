import {CustomerService} from "./services/customer.service";
import {Body, Controller, HttpStatus, Post, Res} from "@nestjs/common";
import {CreateCustomerDto} from "./dtos/create-customer.dto";
import {response, Response} from "express";

@Controller('api/customers')
export class CustomerController {
    constructor(private customerService: CustomerService) {
    }

    @Post()
    async createCustomer(@Res() res: Response, @Body() dto: CreateCustomerDto) {
        const validation = await this.customerService.createCustomer(dto);

        if (validation.invalid) {
            const response = {
                code: HttpStatus.BAD_REQUEST,
                errors: validation.notifications.Select(error => error.message).ToArray(),
            };
            return res.status(response.code).json(response);
        }

        return res.status(HttpStatus.CREATED);
    }
}