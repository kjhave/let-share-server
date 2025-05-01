import { IFinancialRelationship } from "../models/interfaces/IFinancialRelationship.model";

const isFinancialRelation = (variable: any): variable is IFinancialRelationship => {
    return (
        variable && typeof variable === "object"
        &&  typeof variable.userId1 === "string"
        &&  typeof variable.userId2 === "string"
        &&  typeof variable.amount  === "number"
    );
}

export const isFinancialRelationshipSet = (variable: any): variable is IFinancialRelationship[] => {
    return (
        Array.isArray(variable)
        &&  variable.every(
            (item: any) => isFinancialRelation(item)
        )
    );
}