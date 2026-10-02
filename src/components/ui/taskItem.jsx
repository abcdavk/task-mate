import { useEffect, useState } from "react";
import { RiEdit2Line } from "@remixicon/react";
import { TagIcon, CalendarIcon, TrashIcon, CheckIcon } from "./icons";
import { isToday } from "../../utils/date";

const getCourseStorageKey = (vault) =>
  vault ? `vault:${vault.id}:courses` : "";

const getCoursesFromStorage = (vault) => {
  const storageKey = getCourseStorageKey(vault);
  if (!storageKey) return [];

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

function TaskItem({ task, onToggle, onDelete, onEdit, vault }) {
  const { id, judul, tgl, selesai, kategori, notes } = task;
  const dueToday = isToday(tgl);
  const [isEditing, setIsEditing] = useState(false);
  const [draftJudul, setDraftJudul] = useState(judul);
  const [draftTgl, setDraftTgl] = useState(tgl);
  const [draftNotes, setDraftNotes] = useState(notes);
  const [draftKategori, setDraftKategori] = useState(kategori ?? "");
  const [courses, setCourses] = useState(() => getCoursesFromStorage(vault));
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    setCourses(getCoursesFromStorage(vault));
  }, [vault]);

  const addCourse = () => {
    const normalizedCourse = newCourse.trim();
    if (!normalizedCourse || !vault) return;

    const storageKey = getCourseStorageKey(vault);
    const nextCourses = [...new Set([...courses, normalizedCourse])];
    localStorage.setItem(storageKey, JSON.stringify(nextCourses));
    setCourses(nextCourses);
    setDraftKategori(normalizedCourse);
    setNewCourse("");
  };

  const startEditing = () => {
    setDraftJudul(judul);
    setDraftTgl(tgl);
    setDraftNotes(notes);
    setDraftKategori(kategori ?? "");
    setCourses(getCoursesFromStorage(vault));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftJudul(judul);
    setDraftTgl(tgl);
    setDraftNotes(notes);
    setDraftKategori(kategori ?? "");
    setNewCourse("");
    setIsEditing(false);
  };

  const saveEdit = () => {
    const nextJudul = draftJudul.trim();
    const nextNotes = draftNotes.trim();
    const nextKategori = draftKategori.trim();

    if (!nextJudul || !draftTgl) {
      return;
    }

    onEdit(id, {
      judul: nextJudul,
      tgl: draftTgl,
      notes: nextNotes,
      kategori: nextKategori,
    });
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
          <textarea
            value={draftNotes}
            onChange={(event) => setDraftNotes(event.target.value)}
            className="task-item__editor-textarea"
            aria-label="Catatan tugas"
          />

          <input
            type="date"
            value={draftTgl}
            onChange={(event) => setDraftTgl(event.target.value)}
            className="task-item__editor-date"
            aria-label="Tanggal tugas"
          />

          <div className="task-item__editor-course-group">
            <label className="task-item__editor-label">Mata kuliah</label>

            {courses.length > 0 ? (
              <select
                value={draftKategori}
                onChange={(event) => setDraftKategori(event.target.value)}
                className="task-item__editor-select"
                aria-label="Mata kuliah tugas"
              >
                <option value="">Pilih matakuliah</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            ) : (
              <div className="task-item__editor-course-row">
                <input
                  type="text"
                  value={newCourse}
                  onChange={(event) => setNewCourse(event.target.value)}
                  placeholder="Tambah matakuliah"
                  className="task-item__editor-input task-item__editor-input--compact"
                  aria-label="Tambah matakuliah baru"
                />
                <button
                  type="button"
                  onClick={addCourse}
                  className="task-item__editor-btn task-item__editor-btn--small"
                >
                  Tambah
                </button>
              </div>
            )}

            {courses.length > 0 && (
              <div className="task-item__editor-course-row">
                <input
                  type="text"
                  value={newCourse}
                  onChange={(event) => setNewCourse(event.target.value)}
                  placeholder="Tambah matakuliah baru"
                  className="task-item__editor-input task-item__editor-input--compact"
                  aria-label="Tambah matakuliah baru"
                />
                <button
                  type="button"
                  onClick={addCourse}
                  className="task-item__editor-btn task-item__editor-btn--small"
                >
                  Tambah
                </button>
              </div>
            )}
          </div>

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

      {notes && <p className="task-item__notes">{notes}</p>}

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
