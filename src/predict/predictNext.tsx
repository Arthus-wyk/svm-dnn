import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { render } from "@testing-library/react";
import PredictBtn from "../students/predictBtn";
import AddModal from "../students/addModal";
import AccuracyDisplay from "../components/AccuracyDisplay";
export default function PredictNext() {
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显示状态
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isAdd, setIsAdd] = useState(false);
  const [initialValues, setInitialValues] = useState<any>();
  const [form] = Form.useForm(); // 表单实例
  const [addForm] = Form.useForm(); // 表单实例
  const [pagination, setPagination] = useState({
    current: 1, // 当前页
    pageSize: 10, // 每页条数
    total: 0, // 总记录数
  });
  const {
    refetch,
    data,
    isFetching: isLoadingStudentList,
  } = useQuery({
    queryKey: ["getPredictList", pagination.current, pagination.pageSize],
    queryFn: async () => {
      const val = form.getFieldsValue();
      const { suanfa, ...rest } = val;
      const response = await axios.get("http://localhost:5000/getPredictList", {
        params: {
          page: pagination.current, // 当前页
          pageSize: pagination.pageSize, // 每页条数
          ...rest,
        },
        
      });
      const { data: records, total } = response.data;
      setPagination((prev) => ({
        ...prev,
        total: total, // 更新 total
      }));
      return records;
    },
    refetchOnWindowFocus: false, // 禁用窗口聚焦时刷新
    refetchOnReconnect: false,  // 禁用网络重新连接刷新
  });
  const handleQuery = async () => {
    setPagination({
      current: 1, // 当前页
      pageSize: 10, // 每页条数
      total: 0, // 总记录数
    });
    refetch();
  };
  const handleCancel = () => {
    setIsModalVisible(false); // 隐藏弹窗
    setLoading(false);
    addForm.resetFields(); // 清空表单
  };

  // 提交成绩
  const handleSubmit = async () => {
    addForm
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (isAdd) {
          const response = await fetch("http://localhost:5000/setStudent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          if (response.status !== 200) {
            messageApi.error("添加失败！");
          }

          const result = await response.json();

          if (result.success) {
            messageApi.info("添加成功!");
            refetch();
          } else {
            messageApi.error("添加失败！");
          }
        } else {
          const params = { ...values, id };
          const response = await fetch("http://localhost:5000/updStudent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
          });
          if (response.status !== 200) {
            messageApi.error("更新失败！");
          }

          const result = await response.json();

          if (result.success) {
            messageApi.info("更新成功!");
            refetch();
          } else {
            messageApi.error("更新失败！");
          }
        }

        setIsModalVisible(false);
        setLoading(false);
      })
      .catch((err) => {});
    setLoading(false);

    // 校验表单
  };

  // 处理分页变化
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  const addModal = () => {
    setIsAdd(true);
    setIsModalVisible(true); // 显示弹窗
  };
  const editModal = (r: any) => {
    setIsAdd(false);
    setIsModalVisible(true); // 显示弹窗
    setInitialValues(r);
    setId(r.id);
  };

  // 表格列配置
  const columns = [
    {
      title: "学号",
      dataIndex: "学号",
    },
    {
      title: "姓名",
      dataIndex: "姓名",
    },
    {
      title: "测试1",
      dataIndex: "test1",
    },
    {
      title: "测试2",
      dataIndex: "test2",
      render: (t: any, r: any) => {
        if (t == null && r.test1) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试3",
      dataIndex: "test3",
      render: (t: any, r: any) => {
        if (t == null && r.test2) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试4",
      dataIndex: "test4",
      render: (t: any, r: any) => {
        if (t == null && r.test3) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试5",
      dataIndex: "test5",
      render: (t: any, r: any) => {
        if (t == null && r.test4) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试6",
      dataIndex: "test6",
      render: (t: any, r: any) => {
        if (t == null && r.test5) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试7",
      dataIndex: "test7",
      render: (t: any, r: any) => {
        if (t == null && r.test6) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "测试8",
      dataIndex: "test8",
      render: (t: any, r: any) => {
        if (t == null && r.test7) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "视频分数",
      dataIndex: "video",
      render: (t: any, r: any) => {
        if (t == null && r.test8) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    {
      title: "期末成绩",
      dataIndex: "grade",
      render: (t: any, r: any) => {
        if (t == null && r.video) {
          return <PredictBtn form={form} r={r} />;
        }
        return t;
      },
    },
    
    {
      title: "操作",
      key: "action",
      render: (text: any, record: any) => {
        {
          return (
            record.grade == null && (
              <Button type="primary" onClick={() => editModal(record)}>
                录入成绩
              </Button>
            )
          );
        }
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "30px",
        }}
      >
        <AccuracyDisplay title={"SVM准确率"} accuracy={"0.5816"} />
        <AccuracyDisplay title={"DNN准确率"} accuracy={"0.3656"} />
        <AccuracyDisplay title={"DNN+SVM准确率"} accuracy={"0.4250"} />
      </div>
      <Divider />
      <Form
        form={form}
        layout="horizontal"
        style={{
          padding: "20px",
          marginTop: "50px",
          background: "#f9f9f9", // 给表单添加浅灰色背景
          borderRadius: "8px", // 添加圆角
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // 添加阴影
        }}
        initialValues={{
          suanfa: "svm", // 这里设置初始值，key 必须与 Form.Item 的 name 对应
        }}
      >
        <Row gutter={16}>
          {" "}
          {/* 添加 gutter 属性，增加栅格间距 */}
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 4 }} // 控制 label 的宽度
              wrapperCol={{ span: 16 }} // 控制 input 的宽度
              label="学号"
              name="学号"
            >
              <Input placeholder="请输入学号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              label="姓名"
              name="姓名"
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              label="算法"
              name="suanfa"
            >
              <Select
                options={[
                  { label: "SVM", value: "svm" },
                  { label: "DNN", value: "dnn" },
                ]}
                placeholder="请选择算法"
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            {" "}
            {/* 按钮右对齐 */}
            <Button
              type="primary"
              loading={isLoadingStudentList}
              onClick={handleQuery}
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              查询
            </Button>
          </Col>
        </Row>
      </Form>

      <div
        style={{
          padding: "10px",
          width: "100%",
          display: "flex",
          alignItems: "end",
        }}
      >
        <Button
          type="dashed"
          style={{
            marginLeft: "auto",
            color: "#52c41a",
            borderColor: "#52c41a",
          }}
          onClick={() => addModal()}
        >
          新增
        </Button>
      </div>

      <Table
        columns={columns} // 列配置
        dataSource={data} // 表格数据
        rowKey={(record: any) => record.id} // 每行的唯一标识
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true, // 是否可以调整每页条数
          showQuickJumper: true, // 是否可以快速跳转到某页
        }}
        loading={isLoadingStudentList} // 加载状态
        onChange={handleTableChange} // 处理分页或排序变化
        style={{
          background: "#f0f8ff", // 表格背景颜色，浅蓝色
          borderRadius: "8px", // 表格圆角
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // 表格阴影
          marginTop: "20px",
          border: "1px solid #d9d9d9", // 表格边框颜色
          padding: "10px",
        }}
      />

      {/* 成绩录入弹窗 */}
      <AddModal
        isAdd={isAdd}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        form={addForm}
        initialValues={initialValues}
      />
    </div>
  );
}
