export function filterTasks(tasks, flagId, statusId, assignedTo) {
    return tasks.filter(task => {
        return (
            (!flagId || task.flagId === flagId) &&
            (!statusId || task.statusId === statusId) &&
            (!assignedTo || task.assignedTo === assignedTo)
        )
    });
}

//them user moi vao data
export function addUser(users, name) {
    const newUser = {
        userId: users.length + 1,
        name
    };
    users.push(newUser);
}