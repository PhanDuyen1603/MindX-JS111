import { useState } from 'react';
import { tasks } from './data/tasks';
import Column from './components/Column';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <h2>Todo App</h2>
      <Column title="To do" tasks={tasks}/>
     </div>
    </>
  )
}

export default App
