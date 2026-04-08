import TaskCard from "./TaskCard";
import { Tag } from 'antd';

function Column({ title, tasks }) {
  const count = tasks.length;

  return (
    <section className="column" aria-label={title}>
      <header className="column__header">
        <div className="column__title-row">
          <h3 className="column__title">{title}</h3>
          <Tag className="column__badge" aria-label={`${count} mục`}>
            {count}
          </Tag>
        </div>
        <div className="column__actions">
          <button type="button" className="column__circle-btn" aria-label="Thêm thẻ">
            +
          </button>
          <button type="button" className="column__circle-btn column__circle-btn--dots" aria-label="Tùy chọn cột">
            <span aria-hidden>⋯</span>
          </button>
        </div>
      </header>
      <div className="column__cards">
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>
    </section>
  );
}

export default Column;
