import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, HasOneSetAssociationMixin, Association, HasOneGetAssociationMixin, HasOneCreateAssociationMixin } from "sequelize";
import { Bar } from "./B.model";

export class Info extends Model<InferAttributes<Info>, InferCreationAttributes<Info>> {

    declare id: CreationOptional<number>;
    declare text: string;
    // Todos los metodos para el HasOne
    declare setBar: HasOneSetAssociationMixin<Bar, number>;
    declare getBar: HasOneGetAssociationMixin<Bar>;
    declare createBar: HasOneCreateAssociationMixin<Bar>;


    declare static associations: {
        bar: Association<Info, Bar>
    }

}

export const initInfoModel = (sequelize: Sequelize) => {
    Info.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        text: DataTypes.STRING
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}