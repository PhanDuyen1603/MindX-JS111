import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Input, Button, Card} from "antd";
import {useAuth} from "../contexts/AuthContext";

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            login(values.username);
            setLoading(false);
            navigate("/", {replace: true});
        }, 500);
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f2f5"}}>
            <Card title="Đăng nhập" style={{width: 360}}>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="username" label="Tên đăng nhập" rules={[{required: true, message: "Nhập tên đăng nhập"}]}>
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{required: true, message: "Nhập mật khẩu"}]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default LoginPage;