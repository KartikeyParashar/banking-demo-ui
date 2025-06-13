// App.js
import React, { useState } from "react";
import { Layout, Menu, ConfigProvider, theme } from "antd";
import {
  FormOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import StepperFlow from "./components/StepperFlow";
import AdminPanel from "./components/AdminPanel";
import { motion } from "framer-motion";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState("form");
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]); // All user data for Admin

  const addNewUser = (user) => {
    setUserData([...userData, user]);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="dark"
        >
          <motion.div
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              color: "white",
              textAlign: "center",
              margin: "16px 0",
              fontSize: "20px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            🏦 {!collapsed && "Banking UI"}
          </motion.div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="form" icon={<FormOutlined />}>Form Flow</Menu.Item>
            <Menu.Item key="admin" icon={<DashboardOutlined />}>Admin Panel</Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            background: "#141414",
            overflow: "hidden",
          }}
        >
          <Header style={{ background: "#001529", padding: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{marginBottom: "8px"}} role="img" aria-label="card">💳</span>
              <span>Banking Demo App</span>
            </motion.div>
          </Header>
          <Content
            style={{
              padding: "16px",
              background: "#141414",
              minHeight: "calc(100vh - 128px)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {selectedKey === "form" ? (
                <StepperFlow addNewUser={addNewUser} stepType="vertical" />
              ) : (
                <AdminPanel userData={userData} setUserData={setUserData} />
              )}
            </motion.div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              padding: "16px",
              background: "#001529",
              color: "#fff",
              fontSize: "16px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              🏦 Made with ❤️ for Interview | © {new Date().getFullYear()} Banking App Demo
            </motion.div>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
