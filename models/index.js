const { Sequelize } = require('sequelize');
const personModel = require('./person.model')
const { initTodoModel } = require('./todo.model');
let sequelize;

const models = [personModel, initTodoModel];

const startSequelize = (dbName, dbPass, dbHostname, dbUser) => {

    sequelize = new Sequelize(dbName, dbUser, dbPass, {
        dialect: 'postgres',
        host: dbHostname,

    })


    for (const initModel of models) {
        initModel(sequelize);
    }


    return sequelize;
}

module.exports = {
    sequelize,
    startSequelize
}