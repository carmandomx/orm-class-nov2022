import dotenv from 'dotenv';
dotenv.config();

import  app from "../../app";
import { startSequelize } from "../../models";
import { Sequelize } from 'sequelize';
import request from 'supertest';
import envs from '../../models/configDBs';

describe('Todo rutes', () => { 
    let testDB: Sequelize;

    beforeAll(async () => {
        testDB = startSequelize(envs.test.database, envs.test.passwd, envs.test.host, envs.test.username);

        await testDB.sync({ force: true});
    })

    afterAll(async () => {
        await testDB.close()
    })

    it('[POST] /todos - should return 201 after its creation',async () => {
        const res = await request(app)
            .post('/todos')
            .send({ description: 'Unit testing with Jest and Supertest ;)' });


        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1
        })
    })


    it('[POST] /todos - should return 400 after receiving incorrect body', async () => {

        const res = await request(app)
            .post('/todos')
            .send({})

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: 'No description'
        })


    })

 })