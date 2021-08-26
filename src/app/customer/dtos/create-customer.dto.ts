export class CreateCustomerDto {
    constructor(readonly name: string, readonly email: string, readonly birthDate: Date) {
    }
}