/**
 * 💳 App Component
 *
 * 🧩 Purpose:
 * Main entry point for the Banking Demo App. Provides navigation via sidebar
 * and routes between the User Form (Stepper) and the Admin Panel.
 *
 * 🌟 Features:
 * - 🧭 Collapsible Sider navigation with framer-motion animation
 * - 📝 StepperForm to add new users
 * - 🛠 AdminPanel to view/edit users in table format
 * - 🎨 Dark theme with Ant Design ConfigProvider
 * - 🎞️ Smooth animations with Framer Motion
 */

import React, { useState } from "react";
import { Layout, Menu, ConfigProvider, theme } from "antd";
import { FormOutlined, DashboardOutlined } from "@ant-design/icons";
import StepperFlow from "./components/UserForm/StepperFlow";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { motion } from "framer-motion";

// ⛳ AntD Layout structure
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  // 📌 State to control selected menu (form/admin), sider collapse, and user data
  const [selectedKey, setSelectedKey] = useState("form");
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]);

  /**
   * ➕ Add New User
   * Called from StepperFlow to update AdminPanel user list.
   * @param {Object} user - The user object to add
   */
  const addNewUser = (user) => {
    try {
      setUserData([...userData, user]);
    } catch (error) {
      console.error("❌ Error while adding user:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // 🌑 Dark Theme
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          background: "#000",
          overflow: "hidden",
        }}
      >
        {/* 📚 Sidebar Navigation */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="dark"
        >
          {/* 🎬 Logo animation */}
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

          {/* 🧭 Menu Items */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => {
              try {
                setSelectedKey(key);
              } catch (error) {
                console.error("❌ Error while selecting menu:", error);
              }
            }}
          >
            <Menu.Item key="form" icon={<FormOutlined />}>
              Form Flow
            </Menu.Item>
            <Menu.Item key="admin" icon={<DashboardOutlined />}>
              Admin Panel
            </Menu.Item>
          </Menu>
        </Sider>

        {/* 🧱 Main Layout Content */}
        <Layout style={{ background: "#141414", overflow: "hidden" }}>
          {/* 🧢 Header */}
          <Header
            style={{
              background: "#001529",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
              <span style={{ marginBottom: "8px" }} role="img" aria-label="card">
                💳
              </span>
              <span>Banking Demo App</span>
            </motion.div>
          </Header>

          {/* 📦 Content Body */}
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

          {/* 🧠 Footer */}
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