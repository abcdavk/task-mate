import { Component as BackgroundGradient } from "./components/ui/bg-gredient";
import "./App.css";
import "./styles/tasklist.css"; // [daftar] style bagian daftar tugas
import TaskForm from "./components/ui/form";
import { useState } from "react";
import TaskSection from "./components/ui/taskSection"; // [daftar]

// [daftar] tiap tugas sekarang punya `id`, dan tgl memakai format YYYY-MM-DD
const DUMMY_DATA = [
  {
    id: 1,
    judul: "Mengerjakan tugas anu",
    tgl: "2025-10-02",
    selesai: false,
  },
  {
    id: 2,
    judul: "Mengerjakan tugas lain",
    tgl: "2025-10-03",
    selesai: false,
  },
  {
    id: 3,
    judul: "Mengerjakan ppt",
    tgl: "2025-10-04",
    selesai: false,
  },
];

function App() {
  const [todo, setTodo] = useState(DUMMY_DATA);

  return (
    <main className="app-shell">
      <BackgroundGradient className="app-background" />
      <section className="app-content mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-5 px-5 py-12">
        <div className="w-full text-center">
          <h1 className="text-black text-4xl font-normal tracking-wide">
            Hallo Gantengg
          </h1>
          <h1 className="text-black text-4xl font-normal tracking-wide">
            Sini bagi tugas lu, kek dikerjain aja
          </h1>
        </div>

        <TaskSection tasks={todo} setTasks={setTodo} />

        <TaskForm
          onAddTask={(newTask) =>
            setTodo((currentTodo) => [
              ...currentTodo,
              { ...newTask, id: Date.now() },
            ])
          }
        />
      </section>
    </main>
  );
}

export default App;