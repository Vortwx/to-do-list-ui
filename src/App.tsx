import React, { useState, useEffect, useRef } from 'react';
import { Button, List, Modal, Typography, message, Spin, Card, Space } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { createToDoTask, deleteToDoTask, updateToDoTask } from './api/toDoTask/toDoTask';
import { getAllToDoTaskLists, createToDoTaskList, deleteToDoTaskListById, getToDoTaskListById } from './api/toDoTaskList/toDoTaskList';
import { CreateToDoTaskDto, CreateToDoTaskListDto, DeleteToDoTaskDto, ToDoListsViewProps, ToDoTaskList, ToDoTasksViewProps, UpdateToDoTaskDto } from './api/entity';
import ToDoTaskForm from './component/toDoTaskForm';
import ToDoTaskListForm from './component/toDoTaskListForm';

const { Title, Text } = Typography;
const { confirm } = Modal;

const App = () => {
  const [toDoTaskLists, setToDoTaskLists] = useState<ToDoTaskList[]>([]);
  const [selectedList, setSelectedList] = useState<ToDoTaskList | null>();
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
  
    fetchTodoLists();
    hasFetchedRef.current = true;
  }, []);

  const fetchTodoLists = async () => {
    setLoading(true);
    try {
      const data = await getAllToDoTaskLists();
      setToDoTaskLists(data);
    } catch (err: any) {
      message.error('Failed to load todo lists. Please try again.');
      console.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (name: string) => {
    try {
      const data: CreateToDoTaskListDto = { name };
      await createToDoTaskList(data);
      fetchTodoLists();
      message.success('List created');
    } catch (err: any) {
      message.error('Failed to create list.');
      console.error(err.response.data);
    }
  };

  const handleDeleteList = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this list?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await deleteToDoTaskListById(id);
          setToDoTaskLists((prev) => prev.filter((list) => list.id !== id));
          if (selectedList?.id === id) setSelectedList(null);
          message.success('List deleted');
        } catch (err: any) {
          message.error('Failed to delete list.');
          console.error(err.response.data);
        }
      },
    });
  };

  const handleSwitchListView = async (id: string) => {
    setLoading(true);
    try {
      const data = await getToDoTaskListById(id);
      setSelectedList(data);
    } catch {
      message.error('Failed to load tasks for selected list.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMainPage = () => {
    setSelectedList(null);
    fetchTodoLists();
  };

  const handleCreateTask = async (taskData: CreateToDoTaskDto) => {
    try {
      await createToDoTask(taskData);
      handleSwitchListView(taskData.parentListId);
      message.success('Task added');
    } catch (err: any) {
      message.error('Failed to create task.');
      console.error(err.response.data);
    }
  };

  const handleUpdateTask = async (id: string, updatedFields: UpdateToDoTaskDto) => {
    try {
      await updateToDoTask(id, updatedFields);
      handleSwitchListView(updatedFields.parentListId);
    } catch (err: any) {
      message.error('Failed to update task.');
      console.error(err.response.data);
    }
  };

  const handleDeleteTask = (id: string, metadata: DeleteToDoTaskDto) => {
    confirm({
      title: 'Are you sure you want to delete this task?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await deleteToDoTask(id, metadata);
          message.success('Task deleted');
        } catch (err: any) {
          message.error('Failed to delete task.');
          console.error(err.response.data);
        }
      },
    });
  };

  const ToDoListsView: React.FC<ToDoListsViewProps> = ({ toDoTaskLists, onCreateList, onDeleteList, onSwitchListView }) => {
  
    const handleSubmit = (values: Pick<CreateToDoTaskListDto, 'name'>) => {
      onCreateList(values.name)
    };
  
    return (
      <Card title="To-Do Lists" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Space style={{ marginBottom: 16 }}>
          <ToDoTaskListForm onSubmit={handleSubmit} />
        </Space>
        <List
          dataSource={toDoTaskLists}
          renderItem={(list) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => onSwitchListView(list.id)}>View Tasks</Button>,
                <Button danger onClick={() => onDeleteList(list.id)}>Delete</Button>,
              ]}
            >
              <Text>{list.name} ({list.tasks?.length || 0} tasks)</Text>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  const ToDoTasksView: React.FC<ToDoTasksViewProps> = ({ selectedList, onCreateTask, onUpdateTask, onDeleteTask, onBackToLists }) => {
  
    const handleSubmitTask = (values: Pick<CreateToDoTaskDto, 'title' | 'notes' | 'dueDateTime'>) => {
      const taskData: CreateToDoTaskDto = {
        title: values.title.trim(),
        notes: values.notes ? values.notes.trim() : '',
        dueDateTime: values.dueDateTime,
        isDone: false,
        parentListId: selectedList.id
      };
      onCreateTask(taskData);
    };

    const handleRefreshTasks = async () => {
      try {
        const updatedList = await getToDoTaskListById(selectedList.id);
        setSelectedList(updatedList); // This assumes you have a setSelectedList state
      } catch (error) {
        message.error('Failed to refresh tasks');
        console.error(error);
      }
    };
  
    return (
      <Card
        title={<>
          <Button onClick={onBackToLists} style={{ marginRight: 8 }}>&larr; Back</Button>
          {selectedList.name}
        </>}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <ToDoTaskForm onSubmit={handleSubmitTask} />
        </Space>
  
        <List
          style={{ marginTop: 24 }}
          header={`${selectedList.tasks?.length || 0} Tasks`}
          bordered
          dataSource={selectedList.tasks || []}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => onUpdateTask(task.id, { id: task.id, isDone: !task.isDone, parentListId: selectedList.id })}>
                  {task.isDone ? 'Undo' : 'Done'}
                </Button>,
                <Button
                  danger
                  onClick={async () => {
                      await onDeleteTask(task.id, {
                        id: task.id,
                        parentListId: selectedList.id,
                      });
                      await handleRefreshTasks();
                  }}
                >
                  Delete
                </Button>,
              ]}
            >
              <div style={{ flex: 1 }}>
                <Text delete={task.isDone} strong>{task.title}</Text><br />
                {task.notes && <Text type="secondary">{task.notes}</Text>}<br />
                {task.dueDateTime && <Text type="secondary">Due: {new Date(task.dueDateTime).toLocaleString()}</Text>}
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };

  if (loading) return <Spin fullscreen />;

  return (
    <div style={{ padding: 24, position: 'relative' }}>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title level={2} style={{ margin: 0 }}>ToDoList</Title>
      <Button
        type="default"
        icon={<ReloadOutlined />}
        onClick={fetchTodoLists}
      >
        Refresh Lists
      </Button>
    </div>

    {selectedList ? (
      <ToDoTasksView
        selectedList={selectedList}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onBackToLists={handleBackToMainPage}
      />
    ) : (
      <ToDoListsView
        toDoTaskLists={toDoTaskLists}
        onCreateList={handleCreateList}
        onDeleteList={handleDeleteList}
        onSwitchListView={handleSwitchListView}
      />
    )}
    </div>
  );
};

export default App;