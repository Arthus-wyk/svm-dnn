import { Button } from "antd";
import { useState } from "react";
import PredictFinal from "./predictFinal";
import PredictNext from "./predictNext";

export default function () {
  // const [isFinal, setIsFinal] = useState<boolean>(false);
  // const handleChange = () => {
  //   setIsFinal(!isFinal);
  // };
  return (
    // <div
    //   style={{
    //     height: "100%",
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    // >
    //   <div
    //     style={{
    //       width: "100%",
    //       height: "50px",
    //       display: "flex",
    //       justifyContent: "flex-end",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Button type="primary" onClick={handleChange}>
    //       切换
    //     </Button>
    //   </div>
    //   <div
    //     style={{
    //       width: "100%",
    //       flex: 1,
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "start",
    //     }}
    //   >
    //     {isFinal ? <PredictFinal /> : <PredictNext />}
    //   </div>
    // </div>
    <PredictNext />
  );
}
