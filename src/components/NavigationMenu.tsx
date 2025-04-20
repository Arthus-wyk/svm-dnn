import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const NavigationMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string; }) => {
    if (e.key === "1") {
      navigate("/");
    } else if (e.key === "2") {
      navigate("/predict");
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      onClick={handleMenuClick}
      items={[
        { key: "1", label: "StudentData" },
        { key: "2", label: "Predict" },
      ]}
    />
  );
};

export default NavigationMenu;
