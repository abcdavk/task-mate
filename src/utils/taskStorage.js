export class TaskStorage {
  constructor(vault) {
    this.storageKey = `vault:${vault.id}`;
    this.legacyStorageKey = `vault:${vault.nama}`;
  }

  getTasks() {
    const tasks = localStorage.getItem(this.storageKey);

    if (tasks !== null) {
      return JSON.parse(tasks);
    }

    const legacyTasks = localStorage.getItem(this.legacyStorageKey);
    if (!legacyTasks) return [];

    const parsedTasks = JSON.parse(legacyTasks);
    localStorage.setItem(this.storageKey, JSON.stringify(parsedTasks));
    localStorage.removeItem(this.legacyStorageKey);
    return parsedTasks;
  }

  addTask(task) {
    const tasks = this.getTasks();

    tasks.push(task);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );
  }

  removeTask(id) {
    const tasks = this.getTasks().filter(
      task => task.id !== id
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );
  }

  editTask(id, changes) {
    const tasks = this.getTasks().map(task =>
      task.id === id
        ? { ...task, ...changes }
        : task
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );
  }
}