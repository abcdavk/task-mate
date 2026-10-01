const STORAGE_KEY = "tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function removeTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function editTask(id, changes) {
  const tasks = getTasks().map(task =>
    task.id === id
      ? { ...task, ...changes }
      : task
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}