import { RiArrowUpLine, RiPriceTag3Line } from "@remixicon/react";
import { useRef, useState } from "react";

export default function Form({ onAddTask }) {
  const [error, setError] = useState("");
  const judulTodoRef = useRef(null);
  const tglTodoRef = useRef(null);

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
    tglTodoRef.current.value = "";
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

      <div className="mt-8 flex items-center justify-between pt-3">
        <div className="gap-2 flex">
          <input
            type="date"
            ref={tglTodoRef}
            aria-label="Tanggal tugas"
            className="rounded-full border border-slate-300/80 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-white/70"
          />
          <button
            type="button"
            aria-label="Kategori tugas"
            className="rounded-full border border-slate-300/80 px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-white/70"
          >
            <RiPriceTag3Line />
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
