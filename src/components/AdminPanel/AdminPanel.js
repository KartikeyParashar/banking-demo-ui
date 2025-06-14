/**
 * 📋 AdminPanel Component
 *
 * 🧩 Purpose:
 * Renders a horizontally scrollable user table with inline editing functionality.
 * Ideal for admin dashboards to view and update user data on the fly.
 *
 * 💡 Features:
 * - ✅ Displays First Name, Last Name, Bank Name, and IFSC Code for each user
 * - ✍️ Inline editing of user details, one user at a time
 * - 💾 Save and ❌ Cancel buttons for edits
 * - 🖼️ Friendly "No Data" UI when the user list is empty
 * - 🧭 Scroll hint shown if table overflows horizontally
 *
 * 📦 Props:
 * @param {Array} userData - List of user objects to display
 * @param {Function} setUserData - Function to update user data after edit
 *
 * 🧙 Developer Tip:
 * Use this in admin dashboards where quick inline edits are essential 💡
 */

import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "./admin.css";

// 🎛️ AdminPanel component to manage and edit user data
const AdminPanel = ({ userData, setUserData }) => {
  const [editingKey, setEditingKey] = useState(null); // 🔑 Index of user being edited
  const [editData, setEditData] = useState({});       // ✍️ Current editable user data
  const [showScrollNote, setShowScrollNote] = useState(false); // 👀 Scroll hint flag
  const tableWrapperRef = useRef(null);               // 🧭 Ref to detect scroll overflow

  // 🛠 Enter edit mode for a user
  const onEdit = (record, index) => {
    try {
      setEditingKey(index);
      setEditData({ ...record });
    } catch (error) {
      console.error("⚠️ Error while entering edit mode:", error);
    }
  };

  // 💾 Save changes
  const saveEdit = (index) => {
    try {
      const newData = [...userData];
      newData[index] = editData;
      setUserData(newData);
      setEditingKey(null);
    } catch (error) {
      console.error("💥 Error while saving data:", error);
    }
  };

  // ❌ Cancel editing
  const cancelEdit = () => {
    try {
      setEditingKey(null);
      setEditData({});
    } catch (error) {
      console.error("🚫 Error while cancelling edit:", error);
    }
  };

  // 🧮 Scroll note logic
  useEffect(() => {
    try {
      const el = tableWrapperRef.current;
      setShowScrollNote(el && el.scrollWidth > el.clientWidth);
    } catch (error) {
      console.error("🔁 Error detecting scroll:", error);
    }
  }, [userData, editingKey, editData]);

  // 🎨 Style constants
  const headerStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #666",
    backgroundColor: "#1e1e1e",
    color: "#ffd700",
    fontWeight: "bold",
    minWidth: "150px"
  };

  const cellStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #444",
    borderRight: "1px solid #444",
    color: "#ccc",
    minWidth: "150px"
  };

  const getEditInputStyle = (original, edited) =>
    original !== edited ? { border: "1px solid #f39c12" } : {};

  return (
    <div
      style={{
        overflowX: "auto",
        minHeight: "200px",
        backgroundColor: "#121212",
        padding: "16px"
      }}
    >
      <h3 style={{ color: "white", marginBottom: "16px" }}>👥 All Users</h3>

      {/* 📭 No Data UI */}
      {userData.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "65vh",
            backgroundColor: "#1e1e1e",
            width: "100%"
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6598/6598510.png"
            alt="No Data"
            style={{ width: "80px", marginBottom: "12px", opacity: 0.6 }}
          />
          <p style={{ color: "#999", fontSize: "16px" }}>No user data available.</p>
        </div>
      ) : (
        <>
          {/* 📋 Data Table */}
          <div ref={tableWrapperRef} style={{ overflowX: "auto", width: "100%" }}>
            <div
              style={{
                display: "inline-block",
                minWidth: `${150 * (userData.length + (editingKey !== null ? 2 : 1))}px`
              }}
            >
              <table
                style={{
                  color: "white",
                  borderCollapse: "collapse",
                  backgroundColor: "#121212",
                  tableLayout: "auto"
                }}
              >
                <thead>
                  <tr>
                    <th style={headerStyle}>Field</th>
                    {userData.map((_, index) => (
                      <React.Fragment key={index}>
                        <th style={{ ...headerStyle, textAlign: "center" }}>
                          User {index + 1}
                        </th>
                        {editingKey === index && (
                          <th
                            style={{
                              ...headerStyle,
                              textAlign: "center",
                              backgroundColor: "#222"
                            }}
                          >
                            📝 Edited
                          </th>
                        )}
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* 📌 Field Rows */}
                  {[
                    { label: "First Name", key: "firstName" },
                    { label: "Last Name", key: "lastName" },
                    { label: "Bank Name", key: "bankName" },
                    { label: "IFSC Code", key: "ifscCode" }
                  ].map((field) => (
                    <tr key={field.key}>
                      <td
                        style={{
                          ...cellStyle,
                          fontWeight: "bold",
                          backgroundColor: "#1e1e1e"
                        }}
                      >
                        {field.label}
                      </td>
                      {userData.map((user, index) => (
                        <React.Fragment key={index}>
                          <td style={cellStyle}>{user[field.key]}</td>
                          {editingKey === index && (
                            <td style={cellStyle}>
                              <Input
                                value={editData[field.key]}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    [field.key]: e.target.value
                                  })
                                }
                                style={getEditInputStyle(
                                  user[field.key],
                                  editData[field.key]
                                )}
                              />
                            </td>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}

                  {/* ⚙️ Actions */}
                  <tr>
                    <td
                      style={{
                        ...cellStyle,
                        fontWeight: "bold",
                        backgroundColor: "#1e1e1e"
                      }}
                    >
                      Action
                    </td>
                    {userData.map((_, index) => (
                      <React.Fragment key={index}>
                        <td
                          colSpan={editingKey === index ? 2 : 1}
                          style={{ ...cellStyle, textAlign: "center" }}
                        >
                          {editingKey === index ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px"
                              }}
                            >
                              <Button
                                type="link"
                                icon={<SaveOutlined />}
                                onClick={() => saveEdit(index)}
                              />
                              <Button
                                type="link"
                                icon={<CloseOutlined />}
                                onClick={cancelEdit}
                              />
                            </div>
                          ) : (
                            <Button
                              type="link"
                              icon={<EditOutlined />}
                              onClick={() => onEdit(userData[index], index)}
                            />
                          )}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 👉 Scroll note */}
          {showScrollNote && (
            <p
              style={{
                color: "#666",
                fontSize: "12px",
                textAlign: "right",
                marginTop: "4px"
              }}
            >
              👉 Scroll horizontally to view more users
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;