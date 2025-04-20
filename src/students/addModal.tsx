import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import FormItem from "antd/es/form/FormItem";

type ModalType = {
  isAdd: boolean;
  isModalVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  form: any;
  initialValues?: Record<string, any>; // 初始值
};

export default function AddModal({
  isAdd,
  isModalVisible,
  handleCancel,
  handleSubmit,
  isLoading,
  form,
  initialValues,
}: ModalType) {
  const testCount = 8; // 最多允许 9 个测验

  useEffect(() => {
    if (initialValues) {
      console.log(initialValues);
      form.setFieldsValue(initialValues); // 设置传入的初始值到表单
    }
  }, [initialValues, form, isModalVisible]);

  return (
    <Modal
      title={isAdd ? "新增成绩" : "录入成绩"}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={
        <>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit} type="primary" loading={isLoading}>
            确认
          </Button>
        </>
      }
    >
      <Form form={form} component={false}>
        {/* 学号 */}
        <FormItem
          required
          wrapperCol={{ span: 8 }} // 控制 input 的宽度
          label="学号"
          name="学号"
          rules={[
            { required: true, message: "学号不能为空！" }, // 必填校验规则
          ]}
        >
          <Input />
        </FormItem>

        {/* 姓名 */}
        <FormItem
          required
          wrapperCol={{ span: 6 }} // 控制 input 的宽度
          label="姓名"
          name="姓名"
          rules={[
            { required: true, message: "姓名不能为空！" }, // 必填校验规则
          ]}
        >
          <Input />
        </FormItem>

        {/* 动态测验成绩 */}
        {Array.from({ length: testCount }, (_, index) => {
          const testId = index + 1; // 测验编号
          return (
            <FormItem
              key={testId}
              label={`测试${testId}`}
              name={`test${testId}`} // 确保字段名唯一
              style={{ display: "flex" }}
            >
              <InputNumber
                min="0"
                max="100"
                placeholder="请输入成绩"
                style={{ width: "200px", marginRight: "20px" }}
              />
            </FormItem>
          );
        })}
        <FormItem
          key="video"
          label="视频分数"
          name="video" // 确保字段名唯一
          style={{ display: "flex" }}
        >
          <InputNumber
            min="0"
            max="100"
            placeholder="请输入成绩"
            style={{ width: "200px", marginRight: "20px" }}
          />
        </FormItem>
        <FormItem
          key="grade"
          label="期末成绩"
          name="grade" // 确保字段名唯一
          style={{ display: "flex" }}
        >
          <InputNumber
            min="0"
            max="100"
            placeholder="请输入成绩"
            style={{ width: "200px", marginRight: "20px" }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
}
