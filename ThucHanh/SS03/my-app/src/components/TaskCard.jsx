function TaskCard({ task }) { // prop task nhận vào một đối tượng công việc
    return (
        <>
        <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
        </>
    );
}

export default TaskCard;
