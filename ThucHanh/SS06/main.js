// muc dich cua file nay de test bai tap
import { getAllData } from "./api.js";
import { filterTasks } from "./taskService.js";
import { addUser } from "./taskService.js";

async function testCau1() {
    const data = await getAllData();

    console.log("User data:", data.users);
    console.log("Task data:", data.tasks);
    console.log("Flags data:", data.flags);
    console.log("TaskStatus data:", data.taskStatus);
}

async function testCau2() {
    const data = await getAllData();

    const result = filterTasks(data.tasks, 3);
    console.log("Filtered tasks:", result);
}

async function testCau3() {
    const data = await getAllData();
    
    console.log("Users before adding:", data.users);
    addUser(data.users, "New User");
    console.log("Users after adding:", data.users);
}

testCau1();
testCau2();
testCau3();