import axiosInstance from "../axiosInstance";
import { CreateToDoTaskDto, DeleteToDoTaskDto, ToDoTask, UpdateToDoTaskDto } from "../entity";

export const getToDoTaskById = async (id: string) : Promise<ToDoTask> => {
    try{
        const response = await axiosInstance.get<ToDoTask>(`/tasks/${id}`);
        return response.data;
    } catch (error){
        console.error("Error fetching ToDoTask by ID:", error);
        throw error;
    }
}

export const getToDoTaskByDueDateTime = async (dueDateTime: Date) : Promise<ToDoTask[]> => {
    try{
        const response = await axiosInstance.get<ToDoTask[]>(`/tasks/byduedate?dueDateTime=${dueDateTime}`);
        return response.data;
    } catch (error){
        console.error("Error fetching ToDoTask by Due Date:", error);
        throw error;
    }
}

export const createToDoTask = async (createTaskData: CreateToDoTaskDto) : Promise<ToDoTask> => {
    try {
        console.log("input",createTaskData)
        const response = await axiosInstance.post<ToDoTask>('/tasks', createTaskData);
        console.log("REsponse",response.data)
        return response.data;
    } catch (error){
        console.error("Error creating ToDoTask:", error);
        throw error;
    }
}

export const updateToDoTask = async (taskId: string, updateTaskData: UpdateToDoTaskDto) => {
    try {
        await axiosInstance.put<ToDoTask>(`/tasks/${taskId}`, updateTaskData);
    } catch (error){
        console.error("Error updating ToDoTask:", error);
        throw error;
    }
}

export const deleteToDoTask = async (taskId: string, deleteTaskData: DeleteToDoTaskDto) => {
    try {
        await axiosInstance.delete<ToDoTask>(`/tasks/${taskId}`,{
            data: deleteTaskData
        });
    } catch (error){
        console.error("Error deleting ToDoTask:", error);
        throw error;
    }
}

export default {
    getToDoTaskById,
    getToDoTaskByDueDateTime,
    createToDoTask,
    updateToDoTask,
    deleteToDoTask
}


