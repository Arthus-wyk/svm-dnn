
import { Button, Card, Form, InputNumber } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
import Title from "antd/es/skeleton/Title";
import React, { useState } from "react";
export default function PredictFinal() {
    const [tests, setTests] = useState([{ id: 1, value: "" }]); // 初始一个平时测验
    const [final, setFinal] = useState(""); // 期末成绩
    const [svmPrediction, setSvmPrediction] = useState(''); // 预测结果
    const [dnnPrediction, setDnnPrediction] = useState(''); // 预测结果
    const [warning, setWarning] = useState(""); // 不及格提示

    // 添加一个新的测验输入框
    const addTest = () => {
        if (tests.length < 9) {
            setTests([...tests, { id: tests.length + 1, value: "" }]);
        } else {
            alert("最多只能添加 9 个平时测验成绩！");
        }
    };
    const deleteTest = () => {
        setTests((preTests) => {
            return preTests.filter((text) => text.id != tests.length)
        })
    }

    // 更新平时测验的值
    const handleTestChange = (id:any, value:any) => {
        const updatedTests = tests.map((test) =>
            test.id === id ? { ...test, value } : test
        );
        setTests(updatedTests);
    };

    // 调用后端预测接口
    const predictScore = async () => {
        // 检查是否至少有 3 个成绩
        const validTests = tests.filter((test) => test.value !== "");
        if (validTests.length + (final ? 1 : 0) < 3) {
            alert("至少需要填写 3 个成绩才能进行预测！");
            return;
        }

        // 构造请求数据
        const data:any = {};
        validTests.forEach((test:any, index:any) => {
            data[`test${index + 1}`] = parseFloat(test.value);
        });
        // if(final)
        //     data.final = parseFloat(final);

        try {
            const response = await fetch("http://localhost:5000/predictGrade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            // 显示预测结果
            const svmPrediction = parseFloat(result.svm_prediction);
            if (!isNaN(svmPrediction)) 
                setSvmPrediction(svmPrediction.toFixed(2));
            const dnnPrediction = parseFloat(result.dnn_prediction);
            if (!isNaN(dnnPrediction)) 
                setDnnPrediction(dnnPrediction.toFixed(2))
            if (result.dnn_prediction < 60) {
                setWarning("该学生可能会不及格！");
            } else {
                setWarning("");
            }
        } catch (error) {
            console.error("预测失败：", error);
            alert("预测失败，请检查后端服务是否启动！");
        }
    };

    return (
        <div className="App" style={{width:"100%",height:"100%",display:'flex',alignItems:"center",flexDirection:'column', padding: "20px" }}>
            <span style={{ textAlign: "center" ,fontSize:'20px',padding:'10px'}}>
                学生期末成绩预测
            </span>
            <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Form layout="vertical">
                    <div >平时测验成绩</div>
                    {tests.map((test, index) => (
                        <Form.Item key={test.id} label={`测验 ${test.id}`} style={{ display: 'flex' }} required>
                            <InputNumber
                                min='0'
                                max='100'
                                value={test.value}
                                onChange={(value) => handleTestChange(test.id, value)}
                                placeholder="请输入成绩"
                                style={{ width: "200px", marginRight: "20px" }}
                            />
                            {(tests.length - 1 == index && index > 0) && <Button onClick={deleteTest} type="primary" danger >删除</Button>}

                        </Form.Item>
                    ))}
                    {tests.length < 9 && (
                        <Button type="dashed" onClick={addTest} block>
                            添加测验成绩
                        </Button>
                    )}
                    <Button type="primary" onClick={predictScore} block>
                        预测成绩
                    </Button>
                </Form>
            </Card>

            {svmPrediction !== null && (
                <Card
                    style={{
                        maxWidth: "600px",
                        margin: "20px auto",
                        backgroundColor: "#f6f8fa",
                    }}
                >
                    <div>预测结果</div>

                    <div>SVM 预测的成绩：</div> {svmPrediction}

                    <div>DNN 预测的成绩：</div> {dnnPrediction}

                    {warning && (
                        <div style={{ color: "red" }}>
                            <div>警告：</div> {warning}
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
