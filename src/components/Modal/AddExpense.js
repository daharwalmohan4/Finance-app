import React from "react";
import { Button, Modal, Form, DatePicker, Select } from "antd";

function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: "600" }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          values.amount = parseFloat(values.amount);
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: "600" }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of your transaction",
            },
          ]}
        >
          <input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount",
            },
          ]}
        >
          <input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the expense date",
            },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select the tag",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="health">Health</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
