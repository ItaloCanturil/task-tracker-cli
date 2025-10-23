console.log(process.argv);
const fs = require("fs");

if (!fs.existsSync("task.json")) {
  fs.writeFileSync("task.json", "[]");
}

if (process.argv[2] == "add") {
  const task = {
    id: sequentialId(),
    description: process.argv[3],
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  console.log(task);
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.push(task);
  fs.writeFileSync("task.json", JSON.stringify(tasks));
}

if (process.argv[2] == "update") {
  const index = parseInt(process.argv[3]) - 1;
  const task = process.argv[4];
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks[index].description = task;
  fs.writeFileSync("task.json", JSON.stringify(tasks));
}

if (process.argv[2] == "mark-in-progress") {
  const index = parseInt(process.argv[3]) - 1;
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks[index].status = "in-progress";
  tasks[index].updatedAt = new Date().toISOString();
  fs.writeFileSync("task.json", JSON.stringify(tasks));
}

if (process.argv[2] == "mark-completed") {
  const index = parseInt(process.argv[3]) - 1;
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks[index].status = "completed";
  tasks[index].updatedAt = new Date().toISOString();
  fs.writeFileSync("task.json", JSON.stringify(tasks));
}

if (process.argv[2] == "list") {
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${JSON.stringify(task)}`);
  });
}

if (process.argv[2] == "remove") {
  const index = parseInt(process.argv[3]) - 1;
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.findIndex((task, idx) => {
    if (task.id == index) {
      tasks.splice(idx, 1);
      fs.writeFileSync("task.json", JSON.stringify(tasks));
      return;
    }
    console.log("Não existe uma tarefa com esse id");
    return;
  });
}

if (process.argv[2] == "list-in-progress") {
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.forEach((task, index) => {
    if (task.status == "in-progress") {
      console.log(`${index + 1}. ${JSON.stringify(task)}`);
    }
  });
}

if (process.argv[2] == "list-completed") {
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.forEach((task, index) => {
    if (task.status == "completed") {
      console.log(`${index + 1}. ${JSON.stringify(task)}`);
    }
  });
}

if (process.argv[2] == "list-all") {
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${JSON.stringify(task)}`);
  });
}

if (process.argv[2] == "" || process.argv.length == 2) {
  console.log("Please provide a command");
  console.log("add <task> - Add a new task");
  console.log("list - List all tasks");
  console.log("remove <index> - Remove a task by index");
  console.log("update <index> <task> - Update a task by index");
}

function sequentialId() {
  const tasks = JSON.parse(fs.readFileSync("task.json"));
  return tasks.length + 1;
}
