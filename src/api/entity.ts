export interface ToDoTask {
    id: string;
    title: string;
    notes: string;
    dueDateTime: Date;
    isDone: boolean;
}

export interface ToDoTaskList {
    id: string;
    name: string;
    tasks: ToDoTask[];
}

export interface CreateToDoTaskDto {
    title: string;
    notes: string;
    dueDateTime: Date;
    isDone: boolean;
    parentListId: string;
}

export interface UpdateToDoTaskDto {
    id: string;
    title: string;
    notes: string;
    dueDateTime: Date;
    isDone: boolean;
    parentListId: string;
}

export interface DeleteToDoTaskDto {
    id: string;
    parentListId: string;
}

export interface CreateToDoTaskListDto {
    name: string;
}

export interface UpdateToDoTaskListDto {
    id: string;
    name: string;
    tasks: ToDoTask[];
}