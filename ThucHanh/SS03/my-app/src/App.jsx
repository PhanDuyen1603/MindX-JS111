import { tasks, taskStatus } from "./data/tasks";
import Column from "./components/Column";
import "./App.css";

function App() {
  return (
    <div className="kanban">
      <header className="kanban__toolbar">
        <label className="kanban__search-wrap">
          <span className="visually-hidden">Tìm kiếm</span>
          <svg className="kanban__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            className="kanban__search"
            placeholder="Search Items"
            autoComplete="off"
          />
        </label>
        <button type="button" className="kanban__btn-primary">
          New Item
        </button>
      </header>

      <div className="kanban__board">
        {taskStatus.map((col) => (
          <Column
            key={col.statusId}
            title={col.name}
            tasks={tasks.filter((t) => t.statusId === col.statusId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
