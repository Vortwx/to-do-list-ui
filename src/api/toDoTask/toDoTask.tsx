import axiosInstance from "../axiosInstance";
import { CreateToDoTaskDto, DeleteToDoTaskDto, ToDoTask, UpdateToDoTaskDto } from "../entity";

export const getToDoTaskById = async () : Promise<ToDoTask> => {
    try{
        const response = await axiosInstance.get<ToDoTask>('/tasks');
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
        const response = await axiosInstance.post<ToDoTask>('/tasks', createTaskData);
        return response.data;
    } catch (error){
        console.error("Error creating ToDoTask:", error);
        throw error;
    }
}

export const updateToDoTask = async (taskId: string, updateTaskData: UpdateToDoTaskDto) => {
    try {
        await axiosInstance.put<ToDoTask>(`/tasks/${taskId}parentListId?=${updateTaskData.parentListId}`, updateTaskData);
    } catch (error){
        console.error("Error updating ToDoTask:", error);
        throw error;
    }
}

export const deleteToDoTask = async (taskId: string, deleteTaskData: DeleteToDoTaskDto) => {
    try {
        await axiosInstance.delete<ToDoTask>(`/tasks/${taskId}parentListId?=${deleteTaskData.parentListId}`);
    } catch (error){
        console.error("Error deleting ToDoTask:", error);
        throw error;
    }
}


