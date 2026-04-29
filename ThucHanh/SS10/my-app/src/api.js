import { flags, tasks, taskStatus } from "./data";

const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/Test-API-2?apiKey=69aada0c3d8d68a55c599a36";

export async function fetchKanbanData() {
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Khong tai duoc du lieu");
    const json  = await res.json();

    const list = json?.data?.data ?? [];
    const payload = list.find((item) => item?.data?.data?.[0]?.tasks)?.data?.data?.[0];
    if(!payload) throw new Error("Du lieu khong dung dinh dang");

    return{
        users: payload.users ?? [],
        taskStatus: payload.taskStatus ?? [],
        flags: payload.flags ?? [],
        tasks: payload.tasks ?? [],

    }
    
}