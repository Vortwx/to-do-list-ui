export interface ToDoTask {
    id: string;
    title: string;
    notes: string | null;
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
    notes: string | null;
    dueDateTime: Date;
    isDone: boolean;
    parentListId: string;
}

export interface UpdateToDoTaskDto {
    id: string;
    title?: string;
    notes?: string | null;
    dueDateTime?: Date;
    isDone?: boolean;
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
    name?: string;
}

export interface ToDoListsViewProps {
    toDoTaskLists: ToDoTaskList[];
    onCreateList: (name: string) => void;
    onDeleteList: (id: string) => void;
    onSwitchListView: (id: string) => void;
}

export interface ToDoTasksViewProps {
    selectedList: ToDoTaskList;
    onCreateTask: (taskData: CreateToDoTaskDto) => void;
    onUpdateTask: (id: string, taskData: UpdateToDoTaskDto) => void;
    onDeleteTask: (id: string, taskData: DeleteToDoTaskDto) => void;
    onBackToLists: () => void;
}

export type ToDoTaskFormProps = {
    onSubmit: (taskData: Pick<CreateToDoTaskDto, 'title' | 'notes' | 'dueDateTime'>) => void;
};

export type ToDoTaskListFormProps = {
    onSubmit: (taskData: Pick<CreateToDoTaskListDto, 'name'>) => void;
};