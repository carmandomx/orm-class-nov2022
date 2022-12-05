import { UURL } from "../models/URL.models";

// Create operation

export const createURL =async (id:string, origUrl:string) => {
    try {
        const newModel = await UURL.create({
            id,
            origUrl
        })

        return newModel.id;
    } catch (error) {
        console.error(error);
    }
}

export const fetchUrlById  = async (id:string) => {
    try{
        const urlFetched = await UURL.findByPk(id);
        if(!urlFetched){
            return 'Record not found';
        }

        return urlFetched.origUrl;
    }
    catch(error){
        console.log(error);
    }
}
    
