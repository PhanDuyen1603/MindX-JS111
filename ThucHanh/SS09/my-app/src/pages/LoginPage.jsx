import { useState } from "react";

import { Button, Card, Form, Input } from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      login(values.username);
      navigate(from, { replace: true });
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f0f2f5",
        padding: 16,
      }}
    >
      <Card title="Đăng nhập" style={{ width: 360 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Nhập tên đăng nhập" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  );
}