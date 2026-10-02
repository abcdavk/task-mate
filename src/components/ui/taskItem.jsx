import { useState } from "react";
import { RiEdit2Line } from "@remixicon/react";
import { TagIcon, CalendarIcon, TrashIcon, CheckIcon } from "./icons";
import { isToday } from "../../utils/date";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const { id, judul, tgl, selesai, kategori } = task;
  const dueToday = isToday(tgl);
  const [isEditing, setIsEditing] = useState(false);
  const [draftJudul, setDraftJudul] = useState(judul);
  const [draftTgl, setDraftTgl] = useState(tgl);

  const startEditing = () => {
    setDraftJudul(judul);
    setDraftTgl(tgl);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftJudul(judul);
    setDraftTgl(tgl);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const nextJudul = draftJudul.trim();

    if (!nextJudul || !draftTgl) {
      return;
    }

    onEdit(id, { judul: nextJudul, tgl: draftTgl });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className={`task-item ${selesai ? "is-completed" : ""}`}>
        <div className="task-item__editor">
          <input
            type="text"
            value={draftJudul}
            onChange={(event) => setDraftJudul(event.target.value)}
            className="task-item__editor-input"
            aria-label="Judul tugas"
          />

          <input
            type="date"
            value={draftTgl}
            onChange={(event) => setDraftTgl(event.target.value)}
            className="task-item__editor-date"
            aria-label="Tanggal tugas"
          />

          <div className="task-item__editor-actions">
            <button
              type="button"
              className="task-item__editor-btn task-item__editor-btn--save"
              onClick={saveEdit}
            >
              Simpan
            </button>
            <button
              type="button"
              className="task-item__editor-btn task-item__editor-btn--cancel"
              onClick={cancelEditing}
            >
              Batal
            </button>
          </div>
        </div>
      </li>
    );
  }

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

        <div className="task-item__actions">
          <button
            type="button"
            className="task-item__delete"
            onClick={() => onDelete(id)}
            aria-label={`Hapus tugas ${judul}`}
            title="Hapus"
          >
            <TrashIcon size={18} />
          </button>

          <button
            type="button"
            className="task-item__edit"
            onClick={startEditing}
            aria-label={`Edit tugas ${judul}`}
            title="Edit"
          >
            <RiEdit2Line size={16} />
          </button>
        </div>
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
