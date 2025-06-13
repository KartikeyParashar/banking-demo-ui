import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "./admin.css";

const AdminPanel = ({ userData, setUserData }) => {
  const [editingKey, setEditingKey] = useState(null);
  const [editData, setEditData] = useState({});
  const [showScrollNote, setShowScrollNote] = useState(false);
  const tableWrapperRef = useRef(null);

  const onEdit = (record, index) => {
    setEditingKey(index);
    setEditData({ ...record });
  };

  const saveEdit = (index) => {
    const newData = [...userData];
    newData[index] = editData;
    setUserData(newData);
    setEditingKey(null);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditData({});
  };

  useEffect(() => {
    const el = tableWrapperRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowScrollNote(true);
    } else {
      setShowScrollNote(false);
    }
  }, [userData, editingKey, editData]);

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

  const getEditInputStyle = (original, edited) => {
    return original !== edited ? { border: "1px solid #f39c12" } : {};
  };

  return (
    <div style={{ overflowX: "auto", minHeight: "200px", backgroundColor: "#121212", padding: "16px" }}>
      <h3 style={{ color: "white", marginBottom: "16px" }}>All Users</h3>
      {userData.length === 0 ? (
        <p style={{ color: "#999", textAlign: "center", padding: "20px", backgroundColor: "#1e1e1e", width: "100%", height: "65vh" }}>
          No user data available.
        </p>
      ) : (
        <>
          <div ref={tableWrapperRef} style={{ overflowX: "auto", width: "100%" }}>
            <div style={{ display: "inline-block", minWidth: `${150 * (userData.length + (editingKey !== null ? 2 : 1))}px` }}>
              <table style={{ color: "white", borderCollapse: "collapse", backgroundColor: "#121212", tableLayout: "auto" }}>
                <thead>
                  <tr>
                    <th style={headerStyle}>Field</th>
                    {userData.map((_, index) => (
                      <React.Fragment key={index}>
                        <th style={{ ...headerStyle, textAlign: "center" }}>User {index + 1}</th>
                        {editingKey === index && (
                          <th style={{ ...headerStyle, textAlign: "center", backgroundColor: "#222" }}>Edited</th>
                        )}
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "First Name", key: "firstName" },
                    { label: "Last Name", key: "lastName" },
                    { label: "Bank Name", key: "bankName" },
                    { label: "IFSC Code", key: "ifscCode" },
                  ].map((field) => (
                    <tr key={field.key}>
                      <td style={{ ...cellStyle, fontWeight: "bold", backgroundColor: "#1e1e1e" }}>{field.label}</td>
                      {userData.map((user, index) => (
                        <React.Fragment key={index}>
                          <td style={cellStyle}>{user[field.key]}</td>
                          {editingKey === index && (
                            <td style={cellStyle}>
                              <Input
                                value={editData[field.key]}
                                onChange={(e) =>
                                  setEditData({ ...editData, [field.key]: e.target.value })
                                }
                                style={getEditInputStyle(user[field.key], editData[field.key])}
                              />
                            </td>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td style={{ ...cellStyle, fontWeight: "bold", backgroundColor: "#1e1e1e" }}>Action</td>
                    {userData.map((_, index) => (
                      <React.Fragment key={index}>
                        <td colSpan={editingKey === index ? 2 : 1} style={{ ...cellStyle, textAlign: "center" }}>
                          {editingKey === index ? (
                            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                              <Button type="link" icon={<SaveOutlined />} onClick={() => saveEdit(index)} />
                              <Button type="link" icon={<CloseOutlined />} onClick={cancelEdit} />
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
          {showScrollNote && (
            <p style={{ color: "#666", fontSize: "12px", textAlign: "right", marginTop: "4px" }}>
              👉 Scroll horizontally to view more users
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;
