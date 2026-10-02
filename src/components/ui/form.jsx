import { RiArrowUpLine, RiCalendar2Line } from "@remixicon/react";
import { useRef, useState } from "react";

export default function Form({ onAddTask }) {
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const judulTodoRef = useRef(null);
  const tglTodoRef = useRef(null);

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

  function updateTodo(event) {
    event.preventDefault();
    const judul = judulTodoRef.current.value.trim();
    const tgl = tglTodoRef.current.value;

    if (!judul || !tgl) {
      setError("Tugas dan tanggal tidak boleh kosong");
      return;
    }

    onAddTask({ judul, tgl, selesai: false });
    judulTodoRef.current.value = "";
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    tglTodoRef.current.value = today;
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
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {selectedDate && (
        <div className="mt-2 w-fit cursor-pointer rounded-lg bg-white/70 px-3 border transition-colors hover:bg-white/70 border-slate-300/80 py-1 text-xs">
          <p className="text-black/70">{formatDate(selectedDate)}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3">
        <div className="flex gap-2">
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
