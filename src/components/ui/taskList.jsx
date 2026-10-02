import TaskItem from "./taskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty">
        <p className="task-empty__title">Tidak ada tugas</p>
        <p className="task-empty__text">
          Belum ada tugas yang sesuai dengan pencarian atau filter.
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
