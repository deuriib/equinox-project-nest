import {CustomerService} from "./services/customer.service";
import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Res} from "@nestjs/common";
import {CreateCustomerDto} from "./dtos/create-customer.dto";
import {response, Response} from "express";
import {CustomerListDto} from "./dtos/customer-list.dto";
import {get} from "http";

@Controller({
    path: 'customers',
    version: '1'
})
export class CustomerController {
    constructor(private customerService: CustomerService) {
    }
    
    @Get()
    async getAllCustomers() {
        return await this.customerService.getAllCustomers();
    }

    @Post()
    async createCustomer(@Res() res: Response, @Body() dto: CreateCustomerDto) {
        const validation = await this.customerService.createCustomer(dto);

        if (validation.invalid) {
            throw new BadRequestException(
                validation.notifications.Select(error => error.message).ToArray()
            );
        }

        return res.status(HttpStatus.CREATED);
    }
}