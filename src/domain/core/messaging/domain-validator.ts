import {ValidationContract} from "fluent-validator-typescript";
import {DomainCommand} from "./domain-command";

export abstract class DomainValidator extends ValidationContract {
    abstract validate(command: DomainCommand): ValidationContract
}