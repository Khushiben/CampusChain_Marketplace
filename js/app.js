/* app.js - shared across all pages
   Responsibilities:
   - Wallet connect / disconnect
   - Manage listed items (CRUD via localStorage)
   - Helpers for QR scan, ENS, and buy flow
*/

let provider = null;
if (window.ethereum) provider = new ethers.BrowserProvider(window.ethereum);

// -------- Wallet Connection --------
async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("⚠️ Please install MetaMask first.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress = accounts[0];
    sessionStorage.setItem("userAddress", userAddress);

    // 🔹 Try ENS name first
    const ensName = await resolveENS(userAddress);
    if (ensName) {
      sessionStorage.setItem("username", ensName);
    } else {
      // 🔹 Ask user for a display name if ENS not found
      let username = sessionStorage.getItem("username");
      if (!username) {
        username = prompt("Enter your display name (e.g., Khushi):") || "User";
        sessionStorage.setItem("username", username);
      }
    }

    await updateConnectButton();

  } catch (err) {
    console.error("Wallet connect error:", err);
    alert("❌ Could not connect wallet.");
  }
}

async function updateConnectButton() {
  const btn = document.getElementById("connectWalletBtn");
  const address = sessionStorage.getItem("userAddress");
  const username = sessionStorage.getItem("username");
  if (!btn) return;

  if (address) {
    // 🔹 Show ENS or username, else short wallet
    btn.innerText = username || `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  } else {
    btn.innerText = "Connect Wallet";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const addr = sessionStorage.getItem("userAddress");
      if (addr) {
        if (confirm("Disconnect wallet?")) {
          sessionStorage.removeItem("userAddress");
          sessionStorage.removeItem("username");
          updateConnectButton();
          location.reload();
        }
      } else connectWallet();
    });
    updateConnectButton();
  }
});

// -------- LocalStorage Helpers --------
function getListedItems() {
  return JSON.parse(localStorage.getItem("listedItems") || "[]");
}

function saveListedItems(items) {
  localStorage.setItem("listedItems", JSON.stringify(items));
}

function addListedItem(item) {
  const items = getListedItems();
  items.push(item);
  saveListedItems(items);
}

function updateListedItemById(id, updatedFields) {
  const items = getListedItems();
  const newItems = items.map(it => (it.id === id ? { ...it, ...updatedFields } : it));
  saveListedItems(newItems);
}

function deleteListedItemById(id) {
  const items = getListedItems();
  const newItems = items.filter(it => it.id !== id);
  saveListedItems(newItems);
}

// -------- ENS Resolver --------
async function resolveENS(address) {
  try {
    if (!provider) return null;
    const ens = await provider.lookupAddress(address);
    return ens || null;
  } catch {
    return null;
  }
}

// -------- Buy Item (Mock) --------
function buyItem(name, price) {
  alert(`🛒 Simulated purchase:\nItem: ${name}\nPrice: ${price} ETH`);
}

// -------- Scanner Modal --------
function openScannerForOwner(ownerAddress) {
  const modal = document.getElementById("scannerModal");
  const ownerInfo = document.getElementById("ownerInfo");
  const scannerText = document.getElementById("scannerText");

  if (!modal) return;

  ownerInfo.style.display = "none";
  scannerText.textContent = "🔍 Scanning item...";
  modal.style.display = "flex";

  setTimeout(async () => {
    const ens = await resolveENS(ownerAddress);
    ownerInfo.innerHTML = `
      <h3>✅ Scan Complete</h3>
      <p><strong>Owner Wallet:</strong> ${ownerAddress}</p>
      <p><strong>ENS:</strong> ${ens || "Not available"}</p>
    `;
    ownerInfo.style.display = "block";
    scannerText.textContent = "🔎 Scan complete";
  }, 900);
}

function closeScanner() {
  const modal = document.getElementById("scannerModal");
  if (modal) modal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("scannerModal");
  if (e.target === modal) closeScanner();
});

// Export globals for inline usage
window.buyItem = buyItem;
window.openScannerForOwner = openScannerForOwner;
window.closeScanner = closeScanner;
window.getListedItems = getListedItems;
window.addListedItem = addListedItem;
window.updateListedItemById = updateListedItemById;
window.deleteListedItemById = deleteListedItemById;
window.resolveENS = resolveENS;
