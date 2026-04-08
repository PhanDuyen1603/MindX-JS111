import { tasks as initialTasks, taskStatus } from './data/tasks';
import Column from './components/Column';
import NewItemModal from './components/Modal';
import { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [taskList, setTaskList] = useState(initialTasks);
  const [modalOpen, setModalOpen] = useState(false);

  function taskMatchesSearch(task, query) {
    const q = query.trim().toLowerCase();
    if (q === '') return true;

    const title = (task.title ?? '').toLowerCase();
    const description = (task.description ?? '').toLowerCase();

    return title.includes(q) || description.includes(q);
  }

  const filteredTasks = taskList.filter((t) => taskMatchesSearch(t, searchQuery));

  const handleCreateItem = (values) => {
    const nextId = Math.max(0, ...taskList.map((t) => t.taskId)) + 1;
    const deadline =
      values.endDate && typeof values.endDate.toDate === 'function'
        ? values.endDate.toDate()
        : new Date();
    setTaskList((prev) => [
      ...prev,
      {
        taskId: nextId,
        title: values.title,
        description: values.description ?? '',
        statusId: values.statusId,
        flagId: 1,
        assignedTo: values.assignedTo ?? 1,
        deadline,
        attachmentsCount: 0,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div className="kanban">
      <header className="kanban__toolbar">
        <label className="kanban__search-wrap">
          <span className="visually-hidden">Tìm kiếm</span>
          <svg
            className="kanban__search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            className="kanban__search"
            placeholder="Search Items"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="kanban__btn-primary"
          onClick={() => setModalOpen(true)}
        >
          New Item
        </button>
      </header>

      <NewItemModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onCreate={handleCreateItem}
      />

      <div className="kanban__board">
        {taskStatus.map((col) => (
          <Column
            key={col.statusId}
            title={col.name}
            tasks={filteredTasks.filter((t) => t.statusId === col.statusId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
