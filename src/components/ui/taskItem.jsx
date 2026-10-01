import { TagIcon, CalendarIcon, TrashIcon, CheckIcon } from "./icons";
import { isToday } from "../../utils/date";

function TaskItem({ task, onToggle, onDelete }) {
  const { id, judul, tgl, selesai, kategori } = task;
  const dueToday = isToday(tgl);

  return (
    <li className={`task-item ${selesai ? "is-completed" : ""}`}>
      <div className="task-item__top">
        <button
          type="button"
          role="checkbox"
          aria-checked={selesai}
          className="task-item__check"
          onClick={() => onToggle(id)}
          aria-label={`${selesai ? "Tandai belum selesai" : "Tandai selesai"}: ${judul}`}
        >
          {selesai && <CheckIcon size={14} strokeWidth={3} />}
        </button>

        <button
          type="button"
          className="task-item__delete"
          onClick={() => onDelete(id)}
          aria-label={`Hapus tugas ${judul}`}
          title="Hapus"
        >
          <TrashIcon size={18} />
        </button>
      </div>

      <h3 className="task-item__title">{judul}</h3>

      <div className="task-item__meta">
        {kategori && (
          <span className="task-item__course">
            <TagIcon size={14} />
            {kategori}
          </span>
        )}
        <span className={`task-item__deadline ${dueToday ? "is-today" : ""}`}>
          <CalendarIcon size={15} />
          <span>
            <span className="sr-only">Deadline </span>
            {dueToday ? "Today" : tgl}
          </span>
        </span>
      </div>
    </li>
  );
}

export default TaskItem;