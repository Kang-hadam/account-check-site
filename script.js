// 여기에 실제 데이터를 입력해서 사용하시면 됩니다.
// 금액 단위: 원

const payments = [
  // 1층
  { unit: "101호", floor: 1, amount: 0, note: "이사" },
  { unit: "102호", floor: 1, amount: 150000, note: "" },
  { unit: "103호", floor: 1, amount: 200000, note: "" },
  { unit: "104호", floor: 1, amount: 200000, note: "" },
  // 2층
  { unit: "201호", floor: 2, amount: 0, note: "공실" },
  { unit: "202호", floor: 2, amount: 0, note: "김영숙 에어비엔비" },
  { unit: "203호", floor: 2, amount: 0, note: "공실" },
  { unit: "204호", floor: 2, amount: 200000, note: "" },
  // 3층
  { unit: "301호", floor: 3, amount: 200000, note: "" },
  { unit: "302호", floor: 3, amount: 0, note: "공실" },
  { unit: "303호", floor: 3, amount: 200000, note: "" },
  { unit: "304호", floor: 3, amount: 200000, note: "" },
  // 4층
  { unit: "401호", floor: 4, amount: 200000, note: "" },
  { unit: "402호", floor: 4, amount: 200000, note: "" },
  { unit: "403호", floor: 4, amount: 200000, note: "" },
  { unit: "404호", floor: 4, amount: 200000, note: "" },
  { unit: "405호", floor: 4, amount: 200000, note: "" },
];

// 지출 내역 예시
const expenses = [
  { date: "2026-02-20", title: "누수 보수", description: "누수 탐지 및 301호 누수보수", amount: 600000 },
  { date: "2026-03-04", title: "누수 보수", description: "집수정 펌프 설치 및 물 유도도", amount: 700000 },
];

function formatCurrency(amount) {
  return amount.toLocaleString("ko-KR") + "원";
}

function renderSummary() {
  const totalIncome = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const currentBalance = totalIncome - totalExpense;

  document.getElementById("totalIncome").textContent = formatCurrency(totalIncome);
  document.getElementById("totalExpense").textContent = formatCurrency(totalExpense);
  document.getElementById("currentBalance").textContent = formatCurrency(currentBalance);
}

function renderPaymentsTable(filterFloor = "all") {
  const tbody = document.getElementById("paymentsTableBody");
  tbody.innerHTML = "";

  const rows = payments.filter((p) => filterFloor === "all" || p.floor === filterFloor);

  rows.forEach((p) => {
    const tr = document.createElement("tr");

    const tdUnit = document.createElement("td");
    tdUnit.textContent = p.unit;

    const tdAmount = document.createElement("td");
    tdAmount.className = "amount";
    tdAmount.textContent = p.amount ? formatCurrency(p.amount) : "-";

    const tdNote = document.createElement("td");
    tdNote.className = "note";
    if (p.note) {
      tdNote.textContent = p.note;
    } else if (!p.amount) {
      const chip = document.createElement("span");
      chip.className = "chip-danger";
      chip.textContent = "미납";
      tdNote.appendChild(chip);
    } else {
      tdNote.textContent = "";
    }

    tr.appendChild(tdUnit);
    tr.appendChild(tdAmount);
    tr.appendChild(tdNote);
    tbody.appendChild(tr);
  });
}

function renderExpensesTable() {
  const tbody = document.getElementById("expensesTableBody");
  tbody.innerHTML = "";

  if (expenses.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.style.textAlign = "center";
    td.style.color = "#9ca3af";
    td.textContent = "아직 등록된 지출 내역이 없습니다.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  expenses.forEach((e) => {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = e.date;

    const tdTitle = document.createElement("td");
    tdTitle.textContent = e.title;

    const tdDesc = document.createElement("td");
    tdDesc.textContent = e.description || "";

    const tdAmount = document.createElement("td");
    tdAmount.className = "amount";
    tdAmount.textContent = formatCurrency(e.amount);

    tr.appendChild(tdDate);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAmount);
    tbody.appendChild(tr);
  });
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const floorAttr = btn.getAttribute("data-floor");
      const floor = floorAttr === "all" ? "all" : Number(floorAttr);
      renderPaymentsTable(floor);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderPaymentsTable("all");
  renderExpensesTable();
  setupTabs();
});

