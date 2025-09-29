let balance = 0;
let transactions = [];

function showSection(sectionId) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("addSection").classList.add("hidden");
  document.getElementById("withdrawSection").classList.add("hidden");
  document.getElementById("historySection").classList.add("hidden");
  document.getElementById(sectionId).classList.remove("hidden");
}

function updateBalance() {
  document.getElementById("balance").innerText = `$${balance}`;
}

function logTransaction(type, amount) {
  const date = new Date().toLocaleString();
  transactions.push({ date, type, amount, balance });
  updateHistory();
}

function updateHistory() {
  const historyBody = document.getElementById("historyBody");
  historyBody.innerHTML = "";
  transactions.forEach(txn => {
    const row = `<tr>
      <td class="p-2 border">${txn.date}</td>
      <td class="p-2 border">${txn.type}</td>
      <td class="p-2 border">$${txn.amount}</td>
      <td class="p-2 border">$${txn.balance}</td>
    </tr>`;
    historyBody.innerHTML += row;
  });
}

function addMoney() {
  const amount = parseFloat(document.getElementById("addAmount").value);
  const errorEl = document.getElementById("addError");
  errorEl.textContent = "";

  if (isNaN(amount) || amount <= 0) {
    errorEl.textContent = "Please enter a valid positive amount.";
    return;
  }

  balance += amount;
  updateBalance();
  logTransaction("Add", amount);
  document.getElementById("addAmount").value = "";
  showSection("dashboard");
}

function withdrawMoney() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const errorEl = document.getElementById("withdrawError");
  errorEl.textContent = "";

  if (isNaN(amount) || amount <= 0) {
    errorEl.textContent = "Please enter a valid positive amount.";
    return;
  }

  if (amount > balance) {
    errorEl.textContent = "Insufficient balance.";
    return;
  }

  balance -= amount;
  updateBalance();
  logTransaction("Withdraw", amount);
  document.getElementById("withdrawAmount").value = "";
  showSection("dashboard");
}
