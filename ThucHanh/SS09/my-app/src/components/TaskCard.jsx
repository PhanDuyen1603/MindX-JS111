import { flags, getDisplayTag } from "../data/tasks";

function formatDueDate(date) {
  if (!date) return "";

  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function TaskCard({ task }) {
  const flag = flags.find((f) => f.flagId === task.flagId);
  const tagText = getDisplayTag(task);
  const attachments = task.attachmentsCount ?? 0;
  const showDescription =
    task.description && String(task.description).trim().length > 0;

  return (
    <article className="task-card">
      <div className="task-card__top">
        <h4 className="task-card__title">{task.title}</h4>
        <button type="button" className="task-card__icon-btn" aria-label="Chỉnh sửa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
      {showDescription && (
        <p className="task-card__desc">{task.description}</p>
      )}
      <span className="task-card__tag">{tagText}</span>
      <div className="task-card__footer">
        <span className="task-card__meta">
          <svg className="task-card__meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          {attachments > 0 && (
            <span className="task-card__attach-count">{attachments}</span>
          )}
        </span>
        <span
          className="task-card__flag"
          style={{ color: flag?.color ?? "#94a3b8" }}
          title={flag?.name}
          aria-label={`Ưu tiên: ${flag?.name ?? ""}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
          </svg>
        </span>
        <span className="task-card__meta task-card__due">
          <svg className="task-card__meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {formatDueDate(task.deadline)}
        </span>
      </div>
    </article>
  );
}

export default TaskCard;
