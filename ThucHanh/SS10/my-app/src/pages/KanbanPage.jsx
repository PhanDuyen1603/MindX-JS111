import { taskStatus as initialTaskStatus, users as initialUsers } from "../data";
import { useState, useEffect, useMemo } from "react";
import KanbanColumn from "../components/KanbanColumn";
import { fetchKanbanData } from "../api"
import searchIcon from "../assets/icons/search.svg";
import flagIcon from "../assets/icons/Icon__Flag.svg";
import { Form, Input, DatePicker, Select, Button, Modal, Row, Col, Spin } from "antd";
import "../App.css";

function KanbanPage() {
    console.log("KanbanPage rendered");
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [users, setUsers] = useState(initialUsers);
    const [taskStatus, setTaskStatus] = useState(initialTaskStatus);
    const [flags, setFlags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    function loadData() {
        setLoading(true);
        fetchKanbanData()
            .then((data) => {
                setTaskList(data.tasks ?? []);
                setUsers(data.users ?? []);
                setTaskStatus(data.taskStatus ?? []);
                setFlags(data.flags ?? []);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadData();
    }, []);

    const showModal = () => {
        form.setFieldsValue({ assign: 1, status: 1 });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newTaskId = Math.max(...taskList.map((t) => t.taskId), 0) + 1;
                const newTask = {
                    taskId: newTaskId,
                    title: values.title,
                    description: values.description || "",
                    statusId: values.status ?? 1,
                    flagId: values.flagId ?? 1,
                    assignedTo: values.assign ?? 1,
                    deadline: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
                    attachments: 0,
                };
                setTaskList([...taskList, newTask]);
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch(() => { });
    };

    const assignOptions = users.map((u) => ({
        value: u.userId,
        label: u.name,
    }));

    const statusOptions = taskStatus.map((s) => ({
        value: s.statusId,
        label: s.name,
    }));

    const columnTasks = useMemo(() => {
        return taskStatus.map((status) => {
            return taskList.filter((task) => {
                console.log("filler iteration");
                const matchesStatus = task.statusId === status.statusId;
                if (searchText.trim() === "") return matchesStatus;
                const search = searchText.toLowerCase();
                const matchTitle = task.title.toLowerCase().includes(search);
                const matcheDesc = task.description && task.description.toLowerCase().includes(search);
                return matchesStatus && (matchTitle || matcheDesc);
            });
        });
    }, [taskList, searchText, taskStatus]);

    return (
        <div className="app">
            <header className="header">
                <div className="search-box">
                    <img src={searchIcon} alt="" className="search-icon" />
                    <input type="text" placeholder="Search Items" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <button className="btn-new" onClick={showModal}>New Item</button>
                <button className="btn-reload" onClick={loadData} disabled={loading}>
                    Tải lại
                </button>
            </header>

            <main className="kanban-board"> 
                <Spin spinning={loading} tip="Dang tai du lieu...">
                    {taskStatus.map((status, index) => {
                        return (
                            <KanbanColumn key={status.statusId} status={status} tasks={columnTasks[index]} users={users} flags={flags} />
                        );
                    })}
                </Spin>
            </main>

            <Modal
                title={
                    <span className="modal-title-with-flag">
                        <img src={flagIcon} alt="" className="modal-flag-icon" />
                        Save task
                    </span>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                transitionName={import.meta.env.MODE === "test" ? "" : undefined}
                maskTransitionName={import.meta.env.MODE === "test" ? "" : undefined}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
                ]}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" initialValues={{ assign: 1, status: 1 }}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="title"
                                label="Title *"
                                rules={[{ required: true, message: "Title is required" }]}
                            >
                                <Input placeholder="Type title of task" />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea placeholder="Type description..." rows={3} />
                            </Form.Item>
                            <Form.Item name="status" label="Status">
                                <Select placeholder="Choose status" options={statusOptions} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="endDate" label="End Date">
                                <DatePicker format="DD / MM / YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item name="assign" label="Assign">
                                <Select placeholder="Choose assignee" options={assignOptions} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}

export default KanbanPage;
