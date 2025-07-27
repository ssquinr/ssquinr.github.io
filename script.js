let list = document.getElementById("list");
let form = document.getElementById("form");
let desc = document.getElementById("desc");
let amount = document.getElementById("amount");
let income = document.getElementById("income");
let expense = document.getElementById("expense");
let balance = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const totalIncome = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const totalExpense = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);
  income.textContent = totalIncome.toLocaleString();
  expense.textContent = Math.abs(totalExpense).toLocaleString();
  balance.textContent = (totalIncome + totalExpense).toLocaleString();
}

function addTransactionDOM(t) {
  const sign = t.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(t.amount < 0 ? "expense" : "");
  item.innerHTML = `
    ${t.desc} <span>${sign}${Math.abs(t.amount).toLocaleString()} บาท</span>
    <button onclick="removeTransaction(${t.id})">x</button>
  `;
  list.appendChild(item);
}

function updateDOM() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = desc.value.trim();
  const amt = +amount.value;
  if (text && amt !== 0) {
    const transaction = {
      id: Date.now(),
      desc: text,
      amount: amt
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateDOM();
    form.reset();
  }
});

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDOM();
}

updateDOM();
