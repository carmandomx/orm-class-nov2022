import dotenv from 'dotenv';
dotenv.config();

import  app from "../../app";
import { startSequelize } from "../../models";
import { Sequelize } from 'sequelize';
import { createTodo } from '../../repository/Todo.repo'
import request from 'supertest';
import envs from '../../models/configDBs';

describe('Todo rutes', () => { 
    let testDB: Sequelize;

    beforeAll(async () => {
        testDB = startSequelize(envs.test.database, envs.test.passwd, envs.test.host, envs.test.username);

        await testDB.sync({ force: true, logging: false});
        await createTodo('Test for GET');
        await createTodo('Test for PUT');
        await createTodo('Test for DELETE');
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
            id: 4
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

    it('[GET] /todos - should return 400 after trying to get an invalid id', async () => {

        const res = await request(app)
            .get('/todos/0')

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: 'Invalid id'
        })

    })

    it('[GET] /todos - should return 400 after trying to get an inexistent id', async () => {

        const res = await request(app)
            .get('/todos/123')

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: 'Todo not found.'
        })

    })

    it('[GET] /todos - should return 200 after obtaining an existent path', async () => {

        const res = await request(app)
            .get('/todos/1')

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1)
        expect(res.body.description).toEqual('Unit testing with Jest and Supertest ;)')
        expect(res.body.is_completed).toEqual(false)
        expect(res.body.createdAt && res.body.updatedAt).toBeTruthy()

    })

    it('[GET] /:todoId - should return 200 and the found entity', async () => {
        const res = await request(app)
            .get('/todos/1')
            .send();

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('description', 'Test for GET');
        expect(res.body).toHaveProperty('is_completed', false);
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    } )

    it('[GET] /:todoId - should return 400 if the id is out of range', async () => {
        const res = await request(app)
            .get('/todos/0')
            .send();

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: 'Invalid id'
        })

    })

    it('[GET] /:todoId - should return 400 if the todo with that Id is not found', async () => {
        const res = await request(app)
            .get('/todos/234')
            .send();

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Todo not found.'
        })
    })

    
    it('[PUT] /:todoId - should return 201 if the update goes through', async () => {
        const res = await request(app)
            .put('/todos/2')
            .send({
                id: 2,
                description: 'Test for PUT - updated',
                is_completed: true
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 2);
        expect(res.body).toHaveProperty('description', 'Test for PUT - updated');
        expect(res.body).toHaveProperty('is_completed', true);
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('createdAt');


    })

    it('[PUT] /:todoId - should return 400 if the id is out of range', async () => {
        const res = await request(app)
            .put('/todos/0')
            .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Invalid id'
        })
    })

    it('[PUT] /:todoId - should return 400 if todo is not found',async () => {
        const res = await request(app)
            .put('/todos/234')
            .send({
                id: 2,
                description: 'Test for PUT - updated',
                is_completed: true
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Update failed'
        })
    })

    it('[DELETE] /:todoId - should return status 200', async () => {
        const res = await request(app)
            .delete('/todos/3')
            .send();

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({})
    })
 })