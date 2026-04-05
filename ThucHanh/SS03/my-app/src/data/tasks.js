// Dữ liệu người dùng
export const users = [
  { userId: 1, name: "Nguyễn Văn A" },
  { userId: 2, name: "Trịnh Hồng M" },
  { userId: 3, name: "Lạc Khôi B" },
  { userId: 4, name: "Bá Thương M" }
];

// Dữ liệu trạng thái công việc
export const taskStatus = [
  { statusId: 1, name: "To do" },
  { statusId: 2, name: "In Progress" },
  { statusId: 3, name: "In Review" },
  { statusId: 4, name: "Done" }
];

// Dữ liệu cờ mức độ quan trọng (flag)
export const flags = [
  { flagId: 1, name: "Low", color: "#22c55e" },
  { flagId: 2, name: "Medium", color: "#f97316" },
  { flagId: 3, name: "High", color: "#ef4444" }
];

/** Nhãn hiển thị trên thẻ: MindX School hoặc tên user (qua assignedTo) */
export function getDisplayTag(task) {
  if (task.tagLabel) return task.tagLabel;
  const user = users.find((u) => u.userId === task.assignedTo);
  return user?.name ?? "";
}

// Dữ liệu công việc (khớp bố cục mẫu Kanban)
export const tasks = [
  {
    taskId: 1,
    title: "Mobile Wireframes",
    description: "Lên bộ khung ứng dụng cho phiên bản mobile.",
    statusId: 1,
    flagId: 3,
    assignedTo: 1,
    deadline: new Date("2026-04-12"),
    attachmentsCount: 3,
    tagLabel: "MindX School"
  },
  {
    taskId: 2,
    title: "Mobile Wireframes",
    description: "Thực hiện nghiên cứu người dùng để làm rõ nhu cầu.",
    statusId: 1,
    flagId: 3,
    assignedTo: 1,
    deadline: new Date("2026-04-12"),
    attachmentsCount: 1
  },
  {
    taskId: 3,
    title: "Client Call",
    description: "Cuộc họp trực tuyến với khách hàng để thảo luận dự án.",
    statusId: 1,
    flagId: 3,
    assignedTo: 2,
    deadline: new Date("2026-04-02"),
    attachmentsCount: 1
  },
  {
    taskId: 4,
    title: "Login Flow",
    description: "",
    statusId: 2,
    flagId: 2,
    assignedTo: 1,
    deadline: new Date("2026-04-03"),
    attachmentsCount: 1,
    tagLabel: "MindX School"
  },
  {
    taskId: 5,
    title: "Forgot Password Screen",
    description: "",
    statusId: 2,
    flagId: 3,
    assignedTo: 3,
    deadline: new Date("2026-04-06"),
    attachmentsCount: 1
  },
  {
    taskId: 6,
    title: "Landing Page",
    description: "",
    statusId: 3,
    flagId: 1,
    assignedTo: 1,
    deadline: new Date("2026-03-08"),
    attachmentsCount: 2,
    tagLabel: "MindX School"
  },
  {
    taskId: 7,
    title: "Annual Presentation",
    description: "Chuẩn bị bài thuyết trình với số liệu và biểu đồ.",
    statusId: 3,
    flagId: 3,
    assignedTo: 1,
    deadline: new Date("2026-03-15"),
    attachmentsCount: 1,
    tagLabel: "MindX School"
  },
  {
    taskId: 8,
    title: "Icons",
    description: "",
    statusId: 3,
    flagId: 2,
    assignedTo: 1,
    deadline: new Date("2026-04-10"),
    attachmentsCount: 1
  },
  {
    taskId: 9,
    title: "Onboarding Screens",
    description: "Thiết kế các màn hình hướng dẫn ban đầu cho ứng dụng.",
    statusId: 3,
    flagId: 3,
    assignedTo: 4,
    deadline: new Date("2026-03-17"),
    attachmentsCount: 1
  },
  {
    taskId: 10,
    title: "Product Mockups",
    description: "",
    statusId: 4,
    flagId: 1,
    assignedTo: 1,
    deadline: new Date("2026-03-02"),
    attachmentsCount: 1,
    tagLabel: "MindX School"
  },
  {
    taskId: 11,
    title: "Workshop Ideas",
    description: "",
    statusId: 4,
    flagId: 2,
    assignedTo: 1,
    deadline: new Date("2026-04-12"),
    attachmentsCount: 1,
    tagLabel: "MindX School"
  },
  {
    taskId: 12,
    title: "Navigation",
    description: "",
    statusId: 4,
    flagId: 3,
    assignedTo: 1,
    deadline: new Date("2026-03-15"),
    attachmentsCount: 1
  }
];
