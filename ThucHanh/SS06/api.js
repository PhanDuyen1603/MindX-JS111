//nhiem vu cua file nay là goi API

export async function getAllData() {
    const res = await fetch("https://raw.githubusercontent.com/khoatranpc/Code-IntensiveT12.2024/refs/heads/main/lesson%206");

    const data = await res.json();
    return data;
}