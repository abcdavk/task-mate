import {
  RiArrowUpLine,
  RiCalendar2Line,
  RiBookOpenLine,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

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

export default function Form({ onAddTask, vault }) {
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [courses, setCourses] = useState(() => getCoursesFromStorage(vault));
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const judulTodoRef = useRef(null);
  const tglTodoRef = useRef(null);
  const notesTodoRef = useRef(null);
  const coursePickerRef = useRef(null);
  const courseButtonRef = useRef(null);

  useEffect(() => {
    const nextCourses = getCoursesFromStorage(vault);
    setCourses(nextCourses);

    if (!nextCourses.includes(selectedCourse)) {
      setSelectedCourse("");
    }
  }, [vault]);

  useEffect(() => {
    if (!showCoursePicker) return;

    const handlePointerDown = (event) => {
      const isInsidePicker = coursePickerRef.current?.contains(event.target);
      const isInsideButton = courseButtonRef.current?.contains(event.target);

      if (!isInsidePicker && !isInsideButton) {
        setShowCoursePicker(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [showCoursePicker]);

  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  function openDatePicker() {
    if (!tglTodoRef.current) return;

    if (typeof tglTodoRef.current.showPicker === "function") {
      tglTodoRef.current.showPicker();
      return;
    }

    tglTodoRef.current.focus();
  }

  function addCourse() {
    const normalizedCourse = newCourse.trim();
    if (!normalizedCourse) return;

    const storageKey = getCourseStorageKey(vault);
    const nextCourses = [...new Set([...(courses || []), normalizedCourse])];

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(nextCourses));
    }

    setCourses(nextCourses);
    setSelectedCourse(normalizedCourse);
    setNewCourse("");
    setShowCoursePicker(false);
  }

  function removeCourse(courseToRemove) {
    if (!courseToRemove) return;

    const storageKey = getCourseStorageKey(vault);
    const nextCourses = courses.filter((course) => course !== courseToRemove);

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(nextCourses));
    }

    setCourses(nextCourses);

    if (selectedCourse === courseToRemove) {
      setSelectedCourse("");
    }
  }

  function updateTodo(event) {
    event.preventDefault();
    const judul = judulTodoRef.current.value.trim();
    const tgl = tglTodoRef.current.value;
    const notes = notesTodoRef.current.value.trim();

    if (!judul || !tgl) {
      setError("Tugas dan tanggal tidak boleh kosong");
      return;
    }

    onAddTask({ judul, tgl, notes, kategori: selectedCourse, selesai: false });
    judulTodoRef.current.value = "";
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    tglTodoRef.current.value = today;
    notesTodoRef.current.value = "";
    setSelectedCourse("");
    setError("");
  }

  return (
    <form
      onSubmit={updateTodo}
      className="fixed bottom-8 left-1/2 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-lg shadow-slate-950/10 backdrop-blur-md sm:p-5"
    >
      <input
        type="text"
        name="task"
        placeholder="Your Task Here"
        className="w-full bg-transparent px-1 py-2 text-base text-slate-800 outline-none placeholder:text-slate-500"
        ref={judulTodoRef}
      />
      <div className="w-full bg-black/30 h-px"></div>
      <textarea
        name="notes"
        placeholder="Your Notes"
        className="w-full bg-transparent px-1 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-500"
        ref={notesTodoRef}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {selectedDate && (
        <div className="mt-1 w-fit cursor-pointer rounded-lg bg-white/70 px-3 border transition-colors hover:bg-white/70 border-slate-300/80 py-1 text-xs">
          <p className="text-black/70">{formatDate(selectedDate)}</p>
        </div>
      )}

      {selectedCourse && (
        <div className="mt-2 inline-flex items-center gap-2 text-black/70 rounded-lg border border-slate-300/80 bg-white/70 px-3 py-1 text-xs font-medium">
          <RiBookOpenLine className="size-3.5" />
          {selectedCourse}
        </div>
      )}

      <div className="flex items-center justify-between pt-3">
        <div className="relative flex gap-2">
          <button
            type="button"
            onClick={openDatePicker}
            aria-label="Pilih tanggal tugas"
            className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-slate-300/80 bg-white/70 transition-colors hover:bg-white/70"
          >
            <RiCalendar2Line className="size-4 text-black/70" />
            <input
              type="date"
              ref={tglTodoRef}
              value={selectedDate || new Date().toISOString().split("T")[0]}
              onChange={(event) => setSelectedDate(event.target.value)}
              aria-label="Tanggal tugas"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 pointer-events-none"
            />
          </button>

          <div className="relative">
            <button
              ref={courseButtonRef}
              type="button"
              onClick={() => setShowCoursePicker((value) => !value)}
              aria-label="Pilih matakuliah"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-slate-300/80 bg-white/70 transition-colors hover:bg-white/70"
            >
              <RiBookOpenLine className="size-4 text-black/70" />
            </button>

            {showCoursePicker && (
              <div
                ref={coursePickerRef}
                className="absolute bottom-12 left-0 z-20 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-950/10"
              >
                {courses.length > 0 ? (
                  <div className="max-h-40 space-y-1 overflow-y-auto">
                    {courses.map((course) => (
                      <div
                        key={course}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowCoursePicker(false);
                          }}
                          className="flex-1 text-left text-sm text-slate-700 transition-colors"
                        >
                          {course}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCourse(course)}
                          aria-label={`Hapus matakuliah ${course}`}
                          className="rounded-md px-1.5 py-0.5 text-xs text-slate-500 transition-colors hover:text-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="px-2 py-1 text-xs text-slate-500">
                    Belum ada matakuliah
                  </p>
                )}

                <div className="mt-2 flex gap-2 border-t border-slate-200 pt-2">
                  <input
                    type="text"
                    value={newCourse}
                    onChange={(event) => setNewCourse(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addCourse();
                      }
                    }}
                    placeholder="Tambah matakuliah"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-sky-400"
                  />
                  <button
                    type="button"
                    onClick={addCourse}
                    className="rounded-lg bg-sky-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          aria-label="Tambah tugas"
          className="grid size-10 place-items-center rounded-full bg-blue-600 text-xl leading-none text-white transition-colors hover:bg-blue-700"
        >
          <RiArrowUpLine />
        </button>
      </div>
    </form>
  );
}
