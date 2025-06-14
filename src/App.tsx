import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

// Mock Data
const toDoLists = [
  {
    id: '1',
    title: 'Grocery Shopping',
    tasks: ['Buy milk', 'Get bread', 'Pick fruits']
  },
  {
    id: '2',
    title: 'Work Tasks',
    tasks: ['Finish report', 'Reply emails', 'Attend meeting']
  },
  {
    id: '3',
    title: 'Chores',
    tasks: ['Clean room', 'Do laundry', 'Take out trash']
  }
];

// Main Page - Shows all ToDoLists
const MainPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {toDoLists.map(list => (
        <Link key={list.id} to={`/list/${list.id}`}>
          <Card title={list.title} hoverable>
            <p>{list.tasks.length} Tasks</p>
          </Card>
        </Link>
      ))}
    </div>
  );
};

// Detail Page - Shows all tasks in a specific ToDoList
const CardDetailPage = () => {
  const { id } = useParams();
  const list = toDoLists.find(list => list.id === id);

  if (!list) {
    return <div className="p-6">ToDo List not found.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card title={<Title level={4}>{list.title}</Title>}>
        <List
          dataSource={list.tasks}
          renderItem={(task, index) => <List.Item>{index + 1}. {task}</List.Item>}
        />
      </Card>
    </div>
  );
};

// App Router Setup
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list/:id" element={<CardDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
