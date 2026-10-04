const VAULTS_KEY = "vaults";
const CURRENT_VAULT_KEY = "current_vault";

export function getVaults() {
  try {
    return JSON.parse(localStorage.getItem(VAULTS_KEY)) || [];
  } catch {
    return [];
  }
}

export function createVault(nama) {
  const vaults = getVaults();
  const normalizedName = nama.trim();

  if (!normalizedName || vaults.some(
    (vault) => vault.nama.toLowerCase() === normalizedName.toLowerCase()
  )) {
    return null;
  }

  const vault = {
    id: Date.now().toString(),
    nama: normalizedName,
  };

  vaults.push(vault);

  localStorage.setItem(
    VAULTS_KEY,
    JSON.stringify(vaults)
  );
  localStorage.setItem(CURRENT_VAULT_KEY, vault.id);

  return vault;
}

export function renameVault(id, nama) {
  const normalizedName = nama.trim();
  const vaults = getVaults();
  const vaultExists = vaults.some((vault) => vault.id === id);
  const duplicateName = vaults.some(
    (vault) => vault.id !== id && vault.nama.toLowerCase() === normalizedName.toLowerCase()
  );

  if (!normalizedName || !vaultExists || duplicateName) return null;

  const updatedVaults = vaults.map((vault) =>
    vault.id === id ? { ...vault, nama: normalizedName } : vault
  );
  localStorage.setItem(VAULTS_KEY, JSON.stringify(updatedVaults));

  return updatedVaults.find((vault) => vault.id === id);
}

export function deleteVault(id) {
  const vaults = getVaults();
  const vault = vaults.find((item) => item.id === id);

  if (!vault) return null;

  const remainingVaults = vaults.filter((item) => item.id !== id);
  localStorage.setItem(VAULTS_KEY, JSON.stringify(remainingVaults));

  const currentVaultId = localStorage.getItem(CURRENT_VAULT_KEY);
  if (currentVaultId === id) {
    const nextVault = remainingVaults[0] ?? null;

    if (nextVault) {
      localStorage.setItem(CURRENT_VAULT_KEY, nextVault.id);
    } else {
      localStorage.removeItem(CURRENT_VAULT_KEY);
    }
  }

  localStorage.removeItem(`vault:${id}`);
  localStorage.removeItem(`vault:${vault.nama}`);

  return vault;
}

export function switchVault(id) {
  const vaults = getVaults();

  const vault = vaults.find(
    (vault) => vault.id === id
  );

  if (!vault) return null;

  localStorage.setItem(
    CURRENT_VAULT_KEY,
    vault.id
  );

  return vault;
}

export function getCurrentVault() {
  const currentVaultId = localStorage.getItem(
    CURRENT_VAULT_KEY
  );

  if (!currentVaultId) return null;

  const vaults = getVaults();

  return vaults.find(
    (vault) => vault.id === currentVaultId
  ) || null;
}