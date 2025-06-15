import { Form, Input, DatePicker, Button } from 'antd';
import { ToDoTaskFormProps } from '../api/entity';

const ToDoTaskForm: React.FC<ToDoTaskFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Task Title"
        name="title"
        rules={[{ required: true, message: 'Task title is required' }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>

      <Form.Item label="Task Notes" name="notes">
        <Input placeholder="Task notes" />
      </Form.Item>

      <Form.Item
        label="Due Date & Time"
        name="dueDateTime"
        rules={[{ required: true, message: 'Due date and time is required' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ToDoTaskForm;