import axiosInstance from "../axiosInstance";
import { CreateToDoTaskListDto, ToDoTaskList, UpdateToDoTaskListDto } from "../entity";

export const getToDoTaskListById = async (id: string) : Promise<ToDoTaskList> => {
    try{
        const response = await axiosInstance.get<ToDoTaskList>(`/todolists/${id}`);
        return response.data;
    } catch (error){
        console.error("Error fetching ToDoTaskList by ID:", error);
        throw error;
    }
}

export const getAllToDoTaskLists = async () : Promise<ToDoTaskList[]> => {
    try{
        const response = await axiosInstance.get<ToDoTaskList[]>('/todolists');
        return response.data;
    } catch (error){
        console.error("Error fetching ToDoTaskLists:", error);
        throw error;
    }
}

export const createToDoTaskList = async (createTaskListData: CreateToDoTaskListDto) : Promise<ToDoTaskList> => {
    try {
        const response = await axiosInstance.post<ToDoTaskList>('/todolists', createTaskListData);
        return response.data;
    } catch (error){
        console.error("Error creating ToDoTaskList:", error);
        throw error;
    }
}

export const updateToDoTaskListById = async (id: string, updateTaskListData: UpdateToDoTaskListDto) => {
    try {
        await axiosInstance.put<ToDoTaskList>(`/todolists/${id}`, updateTaskListData);
    } catch (error){
        console.error("Error updating ToDoTaskList:", error);
        throw error;
    }
}

export const deleteToDoTaskListById = async (id: string) => {
    try {
        await axiosInstance.delete<ToDoTaskList>(`/todolists/${id}`);
    } catch (error){
        console.error("Error deleting ToDoTaskList:", error);
        throw error;
    }
}

export default {
    getToDoTaskListById,
    getAllToDoTaskLists,
    createToDoTaskList,
    updateToDoTaskListById,
    deleteToDoTaskListById
}