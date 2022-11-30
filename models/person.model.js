const { Model, DataTypes } = require('sequelize');
// const { sequelize } = require('./index')

class Person extends Model {}


const initPersonModel = (sequelize) => {
    Person.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        }
    }, {
        name: 'Person',
        tableName: 'Persons',
        sequelize
    })
}

module.exports = initPersonModel;