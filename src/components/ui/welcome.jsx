import { useState } from "react";
import { createVault } from "../../utils/vault";

export default function WelcomePopUp({ onClose }) {
  const [vault, setVault] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vault.trim() === "") {
      setError("Nama vault tidak boleh kosong.");
      return;
    }

    setError("");

    const createdVault = createVault(vault);
    if (!createdVault) {
      setError("Nama vault sudah digunakan.");
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-7 shadow-2xl backdrop-blur-xl">

        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-slate-400">
            Hai halo
          </p>

          <h2 className="text-3xl font-medium tracking-tight text-slate-800">
            Tugas mu numpuk tuh!
          </h2>

          <p className="mt-3 leading-relaxed text-slate-500">
            Tambahkan tugas yang perlu kamu kerjakan, tentukan deadlinenya,
            dan tandai sudah selesai ketika sudah beres.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <p className="mt-3 leading-relaxed text-slate-500">
            Nama Vault:
          </p>

          <input
            type="text"
            name="vault"
            id="vault"
            value={vault}
            onChange={(e) => {
              setVault(e.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Contoh: Tugas Kuliah"
            className={`mt-1 w-full rounded-2xl bg-slate-200 p-4 text-base text-slate-800 outline-none placeholder:text-slate-500 ${
              error ? "border border-red-400" : ""
            }`}
          />

          {error ? (
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-5 rounded-2xl border border-red-500 text-center text-xs text-red-500">
                !
              </div>

              <span className="text-sm text-red-400">
                {error}
              </span>
            </div>
          ) : (
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-5 rounded-2xl border border-blue-500 text-center text-xs text-blue-500">
                !
              </div>

              <span className="text-sm text-slate-400">
                Vault itu folder untuk memisahkan tugas-tugas mu.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600 active:scale-[0.98]"
          >
            Mulai
          </button>
        </form>

      </div>
    </div>
  );
}