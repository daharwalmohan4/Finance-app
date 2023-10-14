import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddIncome({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "600" }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          values.amount = parseFloat(values.amount);
          onFinish(values, "income");
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
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
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

export default AddIncome;
