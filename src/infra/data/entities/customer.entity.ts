import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Guid} from "guid-typescript";
import {isEmail} from "class-validator";

@Table({
    tableName: 'Customers',
    version: true,
})
export class CustomerEntity extends Model{
    @Column({type: DataType.UUID, primaryKey: true, allowNull: false, field: 'Id'})
    id: Guid;

    @Column({type: DataType.STRING, allowNull: false, field: 'Name'})
    name: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true, field: 'Email', validate: {
        isEmail: true,
        }})
    email: string;
    
    @Column({type: DataType.DATE, allowNull: false, field: 'BirthDate'})
    birthDate: Date;
}