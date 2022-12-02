import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class UURL extends Model<InferAttributes<UURL>, InferCreationAttributes<UURL>> {

    declare id: string;
    declare origUrl: string;

    getId(): string {
        return this.id;
    }


}

export const initUURLModel = (sequelize: Sequelize) => {
    UURL.init({
    
        id: {
            type: DataTypes.STRING,
            primaryKey: true

        },
        origUrl: DataTypes.STRING
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}