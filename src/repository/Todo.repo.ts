import { InferAttributes } from "sequelize";
import { Todo } from "../models/Todo.model";

// Create operation

export const listTodos =async (is_completed: boolean) => {
    const res = await Todo.findAll({
        attributes: ['id'], // SELECT id From "Todos" WHERE is_completed = true;
        where: {
            is_completed: true
        }
    })


    return res;
}


export const createTodo =async (description:string) => {
    try {
        const newTodo = await Todo.create({
            description
        })


        return newTodo.id;
    } catch (error) {
        console.error(error);
        
    }
}

export const fetchTodoById = async (id: number) => {
    try {
        const foundTodo = await Todo.findByPk(id);

        return foundTodo;

    } catch (error) {
        console.error(error);

        return null;
    }
}

export const updateTodoById = async (id: number, todoModel: InferAttributes<Todo>) => {

    try {
        const foo = await Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where: {
                id: id // WHERE ID = 234
            }
        })
        return foo;
    } catch (error) {
        console.log(error);
        return null;
    }


}

export const deleteTodoById = async (id: number) => {
    try {
        const foo = await Todo.destroy({
            where: {
                id: id
            }
        })
        console.log(foo);
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}