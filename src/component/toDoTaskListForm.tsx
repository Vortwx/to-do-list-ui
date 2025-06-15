import { Form, Input, DatePicker, Button } from 'antd';
import { CreateToDoTaskListDto, ToDoTaskListFormProps } from '../api/entity';

const ToDoTaskListForm: React.FC<ToDoTaskListFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="List Name"
        name="name"
        rules={[{ required: true, message: 'List name is required' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add List
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ToDoTaskListForm;