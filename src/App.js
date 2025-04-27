import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Predict from "./predict/index";
import NavigationMenu from './components/NavigationMenu'
import Students from './students';
import 'antd/dist/reset.css'; // 对于 Ant Design v5
import QueryProvider from './components/providers'
function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  return (
    <QueryProvider>

    <Router>
      <Layout style={{background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
        <Header style={{width:"100%" }}>
          <NavigationMenu />
        </Header>
        <Content style={{height:'100%' }}>
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Content>
       
      </Layout>
    </Router>
    </QueryProvider>
  );
}

export default App;
