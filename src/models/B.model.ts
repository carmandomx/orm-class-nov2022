import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, ForeignKey, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { Info } from "./A.model";

export class Bar extends Model<InferAttributes<Bar>, InferCreationAttributes<Bar>> {

    declare id: CreationOptional<number>;
    declare desc: string;
    declare user_id: ForeignKey<Info['id']>;

    // oneToMany
    declare getAppointments: HasManyGetAssociationsMixin<Bar>
    declare addAppointment: HasManyAddAssociationMixin<Bar, number>;
    declare addAppointments: HasManyAddAssociationsMixin<Bar, number>;
    declare setAppointments: HasManySetAssociationsMixin<Bar, number>;
    declare removeAppointment: HasManyRemoveAssociationMixin<Bar, number>;
    declare removeAppointments: HasManyRemoveAssociationsMixin<Bar, number>;
    declare hasAppointment: HasManyHasAssociationMixin<Bar, number>;
    declare countAppointments: HasManyCountAssociationsMixin;
    declare createAppointment: HasManyCreateAssociationMixin<Bar, 'user_id'>;

}

export const initBarModel = (sequelize: Sequelize) => {
    Bar.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        desc: DataTypes.STRING
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})
}


