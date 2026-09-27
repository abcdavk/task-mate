import { Component as BackgroundGradient } from "./components/ui/bg-gredient";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <BackgroundGradient className="app-background" />
      <section className="app-content m-5 p-20 max-w-7xl mx-auto items-center justify-center h-screen">
        <div className="text-left">
          <h1 className="text-black text-4xl font-normal tracking-wide">
            Hallo Gantengg
          </h1>
          <h1 className="text-black text-4xl font-normal tracking-wide">
            Sini bagi tugas lu, kek dikerjain aja
          </h1>
        </div>
      </section>
    </main>
  );
}

export default App;
