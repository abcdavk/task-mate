import { useState } from "react";
import FilterBar from "./filterBar";
import TaskList from "./taskList";
import ConfirmDialog from "./confirmDialog";

function TaskSection({ tasks, setTasks, taskStorage }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const toggleTask = (id) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    taskStorage.editTask(id, { selesai: !task.selesai });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, selesai: !task.selesai } : task
      )
    );
  };

  const deleteTask = (id) => {
    taskStorage.removeTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  
  const requestDelete = (id) => setPendingDeleteId(id);
  const cancelDelete = () => setPendingDeleteId(null);
  const confirmDelete = () => {
    deleteTask(pendingDeleteId);
    setPendingDeleteId(null);
  };
  const pendingTask = tasks.find((task) => task.id === pendingDeleteId);

  const keyword = search.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    const matchSearch = task.judul.toLowerCase().includes(keyword);
    const matchStatus =
      filter === "all" ||
      (filter === "active" && !task.selesai) ||
      (filter === "completed" && task.selesai);
    return matchSearch && matchStatus;
  });

  return (
    <div className="tl-container">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <p className="tl-count">
        Menampilkan {visibleTasks.length} dari {tasks.length} tugas
      </p>

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={requestDelete}
      />

      {pendingTask && (
        <ConfirmDialog
          title="Hapus tugas ini?"
          message={`"${pendingTask.judul}" akan dihapus dari daftar dan tidak bisa dikembalikan.`}
          confirmLabel="Hapus"
          cancelLabel="Batal"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default TaskSection;