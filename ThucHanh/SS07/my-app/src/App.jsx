import Column from './components/Column';
import SaveTaskModalDemo from './components/Modal';
import { useEffect, useState } from 'react';
import { getAllData } from './api';
import { Spin, Alert, Empty } from 'antd';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [column, setColumn] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllData();

        setTaskList(data.tasks ?? []);
        setColumn(data.taskStatus ?? []);
      } catch (e) {
        setError('Failed to load data. Please try again later.');
        setTaskList([]);
        setColumn([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

function taskMatchesSearch(task, query) {
  const q = query.trim().toLowerCase();
  if (q === '') return true;

  const title = (task.title ?? '').toLowerCase();
  const description = (task.description ?? '').toLowerCase();

  return title.includes(q) || description.includes(q);
}

const filteredTasks = taskList.filter((t) => taskMatchesSearch(t, searchQuery));

function addTaskFromModal(payload) {
  setTaskList((prev) => {
    const nextId = prev.reduce((max, t) => Math.max(max, t.taskId), 0) + 1;
    const newTask = {
      taskId: nextId,
      title: payload.title.trim(),
      description: (payload.description ?? '').trim(),
      statusId: payload.statusId ?? 1,
      flagId: 1,
      assignedTo: payload.assignedTo ?? 1,
      deadline: payload.deadline ? new Date(payload.deadline) : new Date(),
      attachmentsCount: 0,
      tagLabel: payload.tagLabel ?? 'MindX School',
    };
    return [...prev, newTask];
  });
}

if(loading) {
  return (
    <div className="kanban__loading">
      <Spin size="large" />
      <p>Loading data...</p>
    </div>
  );
}

if(error) {
  return (
    <div className="kanban__error">
      <Alert message="Error" description={error} type="error" showIcon />
    </div>
  );
}

const isEmpty = column.length === 0 || taskList.length === 0;

if(isEmpty) {
  return (
    <div className="kanban__empty">
      <Empty description="No data available" />
    </div>
  );
}

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

    <SaveTaskModalDemo
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSubmit={(payload) => addTaskFromModal(payload)}
    />

    <div className="kanban__board">
      {column.map((col) => (
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
