import { Button } from "antd";
import { useState } from "react";
import { predict } from "../apis/route";

export default function PredictBtn({form, r }: {form:any, r: any }) {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");
  const handlePredict = async (r: any) => {
    setLoading(true);
    const { id, 期末成绩, 学号, 姓名, ...rest } = r;
    console.log(rest);
    const renamedRest = Object.entries(rest)
      .filter(([key, value]) => key.startsWith("test") && value !== null) // 过滤条件：键名以 "测试" 开头且值不为 null
      .reduce((acc: any, [key, value], index) => {
        acc[`feature${index + 1}`] = value; // 将字段名改为 featureN
        return acc;
      }, {});
    console.log(renamedRest);
    const val = form.getFieldsValue();
    const data={...renamedRest,...{ suanfa: val.suanfa}}
    const result = await predict(data);
    setRes(result.prediction.toFixed(2));
  };
  const backToPredict=()=>{
    setRes("")
    setLoading(false)
  }
  return (
    <>
      {res == "" ? (
        <Button
          loading={loading}
          onClick={() => {
            handlePredict(r);
          }}
        >
          预测
        </Button>
      ) : (
        <div style={{cursor:'pointer', color: Number(res) >= 60 ? "green" : "red" }} onClick={()=>{backToPredict()}}>{res}</div>
      )}
    </>
  );
}
