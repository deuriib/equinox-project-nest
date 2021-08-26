export interface ICustomerRepository {
    createCustomer(): Promise<boolean>;
}