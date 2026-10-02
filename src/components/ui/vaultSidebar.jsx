import { useState } from "react";
import {
  RiAddLine,
  RiCheckLine,
  RiCloseLine,
  RiEdit2Line,
  RiFolderLine,
  RiMenuLine,
} from "@remixicon/react";
import {
  createVault,
  getVaults,
  renameVault,
  switchVault,
} from "../../utils/vault";

export default function VaultSidebar({
  vaults,
  currentVault,
  onVaultsChange,
  onVaultChange,
}) {
  const [newVaultName, setNewVaultName] = useState("");
  const [editingVaultId, setEditingVaultId] = useState(null);
  const [editedVaultName, setEditedVaultName] = useState("");
  const [error, setError] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();

    const createdVault = createVault(newVaultName);

    if (!createdVault) {
      setError("Nama vault wajib diisi dan harus unik.");
      return;
    }

    setNewVaultName("");
    setError("");

    onVaultsChange(getVaults());
    onVaultChange(createdVault);
    setIsMobileOpen(false);
  };

  const handleRename = (event, id) => {
    event.preventDefault();

    const updatedVault = renameVault(id, editedVaultName);

    if (!updatedVault) {
      setError("Nama vault wajib diisi dan harus unik.");
      return;
    }

    setError("");
    setEditingVaultId(null);

    onVaultsChange(getVaults());

    if (currentVault?.id === id) {
      onVaultChange(updatedVault);
    }
  };

  const handleSwitch = (id) => {
    const selectedVault = switchVault(id);

    if (selectedVault) {
      onVaultChange(selectedVault);
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {!isMobileOpen && (
        <button
          type="button"
          className="
            fixed left-4 top-4 z-30
            grid size-11 place-items-center
            rounded-xl border border-slate-200
            bg-white/95 text-slate-700 shadow-lg
            backdrop-blur-xl
            transition
            hover:bg-slate-50
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            md:hidden
          "
          aria-label="Buka menu vault"
          aria-expanded={false}
          aria-controls="vault-sidebar"
          onClick={() => setIsMobileOpen(true)}
        >
          <RiMenuLine size={22} />
        </button>
      )}

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <button
          type="button"
          className="
            fixed inset-0 z-30
            cursor-default
            bg-slate-950/20
            backdrop-blur-[2px]
            md:hidden
          "
          aria-label="Tutup menu vault"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        id="vault-sidebar"
        className={`
          fixed inset-y-0 left-0 z-40
          flex h-screen w-72 max-w-[90vw]
          flex-col
          border-r border-slate-200
          bg-white
          shadow-xl
          transition-transform duration-200

          md:h-screen md:w-64
          md:flex-none
          md:translate-x-0

          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Vault tugas"
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-4 py-4 md:px-5 md:pt-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-[11px] font-semibold tracking-wider text-blue-600">
                TASK MATE
              </p>

              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Daftar Vault
              </h2>

              <p className="mt-1 truncate text-xs text-slate-500 md:hidden">
                {currentVault?.nama ?? "Belum ada vault"}
              </p>
            </div>

            <button
              type="button"
              className="
                grid size-9 shrink-0 place-items-center
                rounded-lg text-slate-500
                transition
                hover:bg-slate-100 hover:text-slate-800
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-blue-600
                md:hidden
              "
              aria-label="Tutup menu vault"
              onClick={() => setIsMobileOpen(false)}
            >
              <RiCloseLine size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-4">
          {/* Section label */}
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Vault kamu
            </span>

            <span
              className="
                rounded-full bg-slate-100
                px-2 py-0.5
                text-[11px] font-medium
                text-slate-500
              "
            >
              {vaults.length}
            </span>
          </div>

          {/* Vault list */}
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {vaults.map((vault) => {
              const isCurrent = currentVault?.id === vault.id;

              return (
                <li key={vault.id} className="min-w-0">
                  {editingVaultId === vault.id ? (
                    <form
                      className="
                        flex items-center gap-1
                        rounded-xl border border-blue-200
                        bg-blue-50 p-1
                      "
                      onSubmit={(event) =>
                        handleRename(event, vault.id)
                      }
                    >
                      <input
                        autoFocus
                        aria-label="Nama vault baru"
                        value={editedVaultName}
                        onChange={(event) =>
                          setEditedVaultName(event.target.value)
                        }
                        className="
                          h-9 min-w-0 flex-1
                          rounded-lg
                          border border-slate-200
                          bg-white
                          px-2.5
                          text-sm text-slate-800
                          outline-none
                          focus:border-blue-500
                          focus:ring-2 focus:ring-blue-500/20
                        "
                      />

                      <button
                        type="submit"
                        aria-label="Simpan nama vault"
                        title="Simpan"
                        className="
                          grid size-9 shrink-0 place-items-center
                          rounded-lg
                          text-blue-700
                          transition
                          hover:bg-blue-100
                          focus-visible:outline-2
                          focus-visible:outline-offset-1
                          focus-visible:outline-blue-600
                        "
                      >
                        <RiCheckLine size={19} />
                      </button>

                      <button
                        type="button"
                        aria-label="Batal mengubah nama vault"
                        title="Batal"
                        className="
                          grid size-9 shrink-0 place-items-center
                          rounded-lg
                          text-slate-500
                          transition
                          hover:bg-slate-100
                          hover:text-slate-800
                          focus-visible:outline-2
                          focus-visible:outline-offset-1
                          focus-visible:outline-slate-600
                        "
                        onClick={() => {
                          setEditingVaultId(null);
                          setError("");
                        }}
                      >
                        <RiCloseLine size={19} />
                      </button>
                    </form>
                  ) : (
                    <div
                      className={`
                        group
                        flex min-w-0 items-center
                        rounded-xl
                        transition

                        ${
                          isCurrent
                            ? "bg-blue-50 ring-1 ring-blue-200"
                            : "hover:bg-slate-50"
                        }
                      `}
                    >
                      <button
                        type="button"
                        className={`
                          flex min-w-0 flex-1
                          items-center gap-3
                          rounded-xl
                          px-3 py-2.5
                          text-left text-sm
                          transition
                          focus-visible:outline-2
                          focus-visible:outline-offset-[-2px]
                          focus-visible:outline-blue-600

                          ${
                            isCurrent
                              ? "font-semibold text-blue-900"
                              : "font-medium text-slate-700"
                          }
                        `}
                        aria-current={
                          isCurrent ? "true" : undefined
                        }
                        onClick={() => handleSwitch(vault.id)}
                      >
                        <RiFolderLine
                          size={19}
                          className={`
                            shrink-0
                            ${
                              isCurrent
                                ? "text-blue-600"
                                : "text-slate-400"
                            }
                          `}
                        />

                        <span className="truncate">
                          {vault.nama}
                        </span>
                      </button>

                      <button
                        type="button"
                        className="
                          mr-1 grid size-8 shrink-0 place-items-center
                          rounded-lg
                          text-slate-400
                          opacity-0
                          transition

                          group-hover:opacity-100

                          hover:bg-white
                          hover:text-slate-700

                          focus-visible:opacity-100
                          focus-visible:outline-2
                          focus-visible:outline-offset-1
                          focus-visible:outline-blue-600
                        "
                        aria-label={`Ubah nama ${vault.nama}`}
                        title="Ubah nama vault"
                        onClick={() => {
                          setEditingVaultId(vault.id);
                          setEditedVaultName(vault.nama);
                          setError("");
                        }}
                      >
                        <RiEdit2Line size={17} />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Error */}
          {error && (
            <p
              className="
                mt-3 rounded-lg
                border border-rose-200
                bg-rose-50
                px-3 py-2
                text-xs leading-relaxed
                text-rose-700
              "
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Create vault */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2 px-1 text-xs font-medium text-slate-500">
              Buat vault baru
            </p>

            <form
              className="flex gap-2"
              onSubmit={handleCreate}
            >
              <label className="sr-only" htmlFor="new-vault-name">
                Nama vault baru
              </label>

              <input
                id="new-vault-name"
                placeholder="Contoh: Kuliah"
                value={newVaultName}
                onChange={(event) => {
                  setNewVaultName(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                className="
                  h-10 min-w-0 flex-1
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  px-3
                  text-sm text-slate-800
                  outline-none
                  placeholder:text-slate-400

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

              <button
                type="submit"
                aria-label="Tambah vault"
                title="Tambah vault"
                className="
                  grid size-10 shrink-0
                  place-items-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-sm
                  transition

                  hover:bg-blue-700
                  active:scale-95

                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-blue-600
                "
              >
                <RiAddLine size={21} />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}