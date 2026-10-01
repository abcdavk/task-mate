import { Component as BackgroundGradient } from "./components/ui/bg-gredient";
import "./App.css";
import "./styles/tasklist.css";
import TaskForm from "./components/ui/form";
import { useState } from "react";
import TaskSection from "./components/ui/taskSection";
import WelcomePopUp from "./components/ui/welcome";
import VaultSidebar from "./components/ui/vaultSidebar";
import { getCurrentVault, getVaults, switchVault } from "./utils/vault";
import { TaskStorage } from "./utils/taskStorage";

function App() {
  const [vaults, setVaults] = useState(() => getVaults());
  const [currentVault, setCurrentVault] = useState(() => {
    const activeVault = getCurrentVault();
    if (activeVault) return activeVault;

    const firstVault = getVaults()[0];
    return firstVault ? switchVault(firstVault.id) : null;
  });
  const [todo, setTodo] = useState(() =>
    currentVault ? new TaskStorage(currentVault).getTasks() : []
  );

  const [showWelcome, setShowWelcome] = useState(() => getVaults().length === 0);
  const taskStorage = currentVault ? new TaskStorage(currentVault) : null;

  const handleVaultChange = (vault) => {
    setCurrentVault(vault);
    setTodo(new TaskStorage(vault).getTasks());
  };

  const onClose = () => {
    localStorage.setItem("has_init_vault", "true");
    setVaults(getVaults());
    const activeVault = getCurrentVault();
    if (activeVault) handleVaultChange(activeVault);
    setShowWelcome(false);
  };

  return (
    <main className="app-shell">
      {showWelcome && <WelcomePopUp onClose={onClose} />}

      <BackgroundGradient className="app-background" />

      <div className="app-layout">
        <VaultSidebar
          vaults={vaults}
          currentVault={currentVault}
          onVaultsChange={setVaults}
          onVaultChange={handleVaultChange}
        />

        <section className="app-content flex min-h-screen w-full flex-col items-center gap-5 px-5 py-12">
          <div className="w-full text-center">
            <h1 className="text-black text-4xl font-normal tracking-wide">
              Hallo Gantengg
            </h1>

            <h1 className="text-black text-4xl font-normal tracking-wide">
              Sini bagi tugas lu, kek dikerjain aja
            </h1>
          </div>

          {taskStorage && (
            <>
              <TaskSection
                tasks={todo}
                setTasks={setTodo}
                taskStorage={taskStorage}
              />

              <TaskForm
                onAddTask={(newTask) => {
                  const task = { ...newTask, id: Date.now() };
                  taskStorage.addTask(task);
                  setTodo((currentTodo) => [...currentTodo, task]);
                }}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;