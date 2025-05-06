import { IRelationship } from "../models/interfaces/IRelationship.model";

export const isRelationship = (variable: any): variable is IRelationship => {
    return (
        variable && typeof variable === "object"
        &&  typeof variable.userId1 === "string"
        &&  typeof variable.userId2 === "string"
    );
}

export const isRelationshipSet = (variable: any): variable is IRelationship[] => {
    return (
        Array.isArray(variable)
        &&  variable.every(
            (item: any) => isRelationship(item)
        )
    );
}