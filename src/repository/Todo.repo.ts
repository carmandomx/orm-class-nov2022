import { InferAttributes } from "sequelize";
import { Todo } from "../models/Todo.model";
import { TodoRouter } from "../routes/Todo.routes";

// Create operation

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

//fetchTodoById

export const fetchTodoById = async (id: number) => {


    try{
        const fetchTodo = await Todo.findByPk(id);
        return fetchTodo;

    }catch(error) {
        console.log(error);
    }
}

// Update

export const updateTodoById = async (id:number, todoModel: InferAttributes<Todo>) => {
    try{
        const updateTodo = await Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        },{
            where:{
                id: todoModel.id
            }
        });
        return updateTodo;
    }catch(error) {
        console.log(error);
    }
}

//Delete
export const deleteTodobyId = async (id:number) => {

    try{
        const deleteTodo = await Todo.destroy({
            where: {
                id:id
            }
        });
        return deleteTodo;
    }catch(err){
        console.log(err);
        return null;
    }
}