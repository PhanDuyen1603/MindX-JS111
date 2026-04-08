import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { FlagFilled } from '@ant-design/icons';
import { taskStatus, users } from '../data/tasks';
import './Modal.css';

const { TextArea } = Input;

const modalTitle = (
  <div className="save-task-modal__title-wrap">
    <div className="save-task-modal__icon-wrap" aria-hidden>
      <FlagFilled className="save-task-modal__icon" />
    </div>
    <div className="save-task-modal__title-text">Save task</div>
  </div>
);

export default function NewItemModal({ open, onCancel, onCreate }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onCreate?.(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  const userOptions = users.map((u) => ({ value: u.userId, label: u.name }));
  const statusOptions = taskStatus.map((s) => ({ value: s.statusId, label: s.name }));

  return (
    <Modal
      wrapClassName="save-task-modal"
      title={modalTitle}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={560}
      destroyOnHidden
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          assignedTo: users[0]?.userId,
        }}
        colon={false}
        clearOnDestroy
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <Input placeholder="Type title of task" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="endDate" label="End Date">
              <DatePicker
                style={{ width: '100%' }}
                format="DD / MM / YYYY"
                placeholder="DD / MM / YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
          <Col xs={24} sm={14}>
            <Form.Item name="description" label="Description">
              <TextArea rows={5} placeholder="Type description..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={10}>
            <Form.Item name="assignedTo" label="Assign">
              <Select options={userOptions} placeholder="Choose assignee" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="statusId"
              label="Status"
              rules={[{ required: true, message: 'Please choose status' }]}
            >
              <Select options={statusOptions} placeholder="Choose status" />
            </Form.Item>
          </Col>
        </Row>

        <div className="save-task-modal__footer">
          <Button className="save-task-modal__btn-cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="save-task-modal__btn-save" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
