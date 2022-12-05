import { UURL } from "../models/URL.models";

// Create operation

export const createURL =async (id:string, origUrl:string) => {
    try {
        const newTodo = await UURL.create({
            id,
            origUrl
        })

        return newTodo.id;
    } catch (error) {
        console.error(error);
    }
}