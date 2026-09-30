import { Component as BackgroundGradient } from "./components/ui/bg-gredient";
import "./App.css";
import TaskForm from "./components/ui/form";
import { useState } from "react";
import { ToDoItems } from "./components/ui/taskList";
const DUMMY_DATA = [
  {
    judul: "Mengerjakan tugas anu",
    tgl: "2/10/2025",
    selesai: false,
  },
  {
    judul: "Mengerjakan tugas lain",
    tgl: "3/10/2025",
    selesai: false,
  },
  {
    judul: "Mengerjakan ppt",
    tgl: "4/10/2025",
    selesai: true,
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
        {todo.map((item) => (
          <ToDoItems
            key={item.judul}
            judul={item.judul}
            tgl={item.tgl}
            selesai={item.selesai}
            update={setTodo}
          />
        ))}
        <TaskForm
          onAddTask={(newTask) =>
            setTodo((currentTodo) => [...currentTodo, newTask])
          }
        />
      </section>
    </main>
  );
}

export default App;
