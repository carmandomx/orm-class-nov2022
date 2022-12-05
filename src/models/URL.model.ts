import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class URL extends Model<InferAttributes<URL>, InferCreationAttributes<URL>> {

    declare id: string;
    declare origUrl: string;

}

export const initURLModel = (sequelize: Sequelize) => {
    URL.init({
    
        id: {
            type: DataTypes.STRING,
            primaryKey: true

        },
        origUrl: DataTypes.STRING
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}