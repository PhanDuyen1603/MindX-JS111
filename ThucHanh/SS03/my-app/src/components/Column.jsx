import TaskCard from "./TaskCard";

function Column({ title, tasks }) { // prop title là tiêu đề cột, prop tasks là mảng công việc trong cột
    return (
        <>
        <div className="column">
            <h3>{title}</h3>
            {tasks.map(task => (
                <TaskCard key={task.taskId} task={task} /> // render TaskCard cho mỗi công việc trong cột
            ))}
        </div>
        </>
    );
}

export default Column;
