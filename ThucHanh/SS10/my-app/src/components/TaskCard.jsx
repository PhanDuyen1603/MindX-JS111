import editIcon from "../assets/icons/circum_edit.svg";
import clockIcon from "../assets/icons/Icon__Clock.svg";
import {memo} from "react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function TaskCard({ task, user, flag }) {
  console.count(`TaskCard re-rendered #${task.taskId}`);
  const d = new Date(task.deadline);
  const dateStr = MONTH_NAMES[d.getMonth()] + " " + d.getDate();

  const userName = user ? user.name : "";
  const flagColor = flag ? flag.color : "#9ca3af";
  const attachmentCount = task.attachments || 0;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4>{task.title}</h4>
        <button className="icon-btn" aria-label="Sửa">
          <img src={editIcon} alt="" />
        </button>
      </div>
      {task.description ? <p className="task-description">{task.description}</p> : null}
      <div className="task-assigned">{userName}</div>
      <div className="task-footer">
        <span className="task-attachments">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          {attachmentCount}
        </span>
        <span className="task-flag" title={flag ? flag.name : ""}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M14.4 6L14 4H5V21H7V14H12.6L13 16H20V6H14.4Z" fill={flagColor} />
          </svg>
        </span>
        <span className="task-deadline">
          <img src={clockIcon} alt="" />
          {dateStr}
        </span>
      </div>
    </div>
  );
}

export default memo(TaskCard);
