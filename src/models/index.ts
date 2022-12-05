import { Sequelize } from "sequelize";
import {  initTodoModel } from './Todo.model' // Modelos
import {  initUURLModel } from './URL.models' // Modelos


export let sequelize: Sequelize;

const models = [initTodoModel, initUURLModel];

export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {

        dialect: 'postgres',
        host: db_hostname,
    })


    for(const initModel of models) {
        initModel(sequelize);
    }


    return sequelize;
}