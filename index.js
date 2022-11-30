const {Sequelize, DataTypes, Model} = require('sequelize');
const { startSequelize } = require('./models')
const { Todo } = require('./models/todo.model')
const dotenv = require('dotenv');

dotenv.config();

// URL:: http://www.google.com
// URI:: postgres://testSecure:root@localhost:5432/testdb2


// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}`);
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//     host: 'localhost',
//     port: 5432,
//     dialect: 'postgres'
// })

// 

// sequilize.define()

// const Person = sequelize.define('Person', {

//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING
//     }


// })

// console.log(Person === sequelize.models.Person)







const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

try {
    const sequelize = startSequelize(DB_NAME, DB_PASS, 'localhost', DB_USER)
    sequelize.authenticate().then(() => {
        console.log('DB connection is ok!')

        return sequelize.sync();
    }).then( async () => {
        const learnAPIDevelopment = Todo.build({
            description: 'Learn API Development before the end of the year 2022'
        }) 
        
        console.log(learnAPIDevelopment instanceof Todo);
        
        await learnAPIDevelopment.save();

        console.log('DB HAS BEEN SYNCED!')

    })

} catch (error) {
    console.error('Unable to reach DB', error);
}

// Person.sync({ force: true });