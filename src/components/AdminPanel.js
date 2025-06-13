// components/AdminPanel.jsx
import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "./admin.css";

const AdminPanel = ({ userData, setUserData }) => {
  const [editingKey, setEditingKey] = useState(null);
  const [editData, setEditData] = useState({});

  // start editing
  const onEdit = (record, index) => {
    setEditingKey(index);
    setEditData({ ...record });
  };

  // save edits
  const saveEdit = (index) => {
    const newData = [...userData];
    newData[index] = editData;
    setUserData(newData);
    setEditingKey(null);
  };

  // define table columns
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      render: (_, __, index) =>
        editingKey === index
          ? <Input value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} />
          : userData[index].firstName,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (_, __, index) =>
        editingKey === index
          ? <Input value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} />
          : userData[index].lastName,
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      render: (_, __, index) =>
        editingKey === index
          ? <Input value={editData.bankName} onChange={(e) => setEditData({ ...editData, bankName: e.target.value })} />
          : userData[index].bankName,
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
      render: (_, __, index) =>
        editingKey === index
          ? <Input value={editData.ifscCode} onChange={(e) => setEditData({ ...editData, ifscCode: e.target.value })} />
          : userData[index].ifscCode,
    },
    {
      title: "Action",
      render: (_, __, index) =>
        editingKey === index
          ? <Button type="link" icon={<SaveOutlined />} onClick={() => saveEdit(index)} />
          : <Button type="link" icon={<EditOutlined />} className="animated-edit" onClick={() => onEdit(userData[index], index)} />,
    },
  ];

  return (
    <div>
      <h3>All Users</h3>
      <Table dataSource={userData} columns={columns} rowKey={(_, i) => i} pagination={false} />
    </div>
  );
};

export default AdminPanel;
