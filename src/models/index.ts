import { Sequelize } from "sequelize";
import { initTodoModel } from './Todo.model' // Modelos
import { initURLModel } from './URL.model';
import { Info, initInfoModel } from './A.model';
import { Bar, initBarModel } from './B.model';
import setup from './associations'
export let sequelize: Sequelize;

const models = [initTodoModel, initURLModel,initInfoModel, initBarModel, ];

export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {

        dialect: 'postgres',
        host: db_hostname,
    })


    for(const initModel of models) {
        initModel(sequelize);
    }
    // one-to-one
    
    setup();
    
    // Info.setBar()

    return sequelize;
}