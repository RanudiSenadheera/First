function showSection(id) {
  document.querySelectorAll(".calc-section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function clearAll() {
  document.querySelectorAll("input").forEach(inp => inp.value = "");
  document.querySelectorAll(".result").forEach(res => res.innerHTML = "");
}

//  Withholding Tax
function calcWithholding() {
  const type = document.getElementById("withholdType").value;
  const amount = parseFloat(document.getElementById("withholdAmount").value);
  if (isNaN(amount) || amount <= 0) {
    return alert("Enter a valid amount greater than 0");
  }
  let tax = 0;
  if (type === "rent" && amount > 100000) tax = amount * 0.10;
  else if (type === "bank") tax = amount * 0.05;
  else if (type === "dividend" && amount > 100000) tax = amount * 0.14;

  document.getElementById("withholdResult").innerHTML = `
    Tax Type: ${type}<br>
    Tax Amount: Rs.${tax.toFixed(2)}<br>
    Net After Tax: Rs.${(amount - tax).toFixed(2)}
  `;
}

//  Payable Tax
function calcPayable() {
  const salary = parseFloat(document.getElementById("salary").value);
  if (isNaN(salary) || salary <= 0) return alert("Enter a valid salary");

  let taxRate = 0;
  if (salary <= 100000) taxRate = 0;
  else if (salary <= 141667) taxRate = 6;
  else if (salary <= 183333) taxRate = 12;
  else if (salary <= 225000) taxRate = 18;
  else if (salary <= 266667) taxRate = 24;
  else if (salary <= 308333) taxRate = 30;
  else taxRate = 36;

  const taxAmount = (salary * taxRate) / 100;
  const net = salary - taxAmount;

  document.getElementById("payableResult").innerHTML = `
    Tax Rate: ${taxRate}%<br>
    Tax Amount: Rs.${taxAmount.toFixed(2)}<br>
    Net Salary: Rs.${net.toFixed(2)}
  `;
}

//  Income Tax
function calcIncome() {
  const income = parseFloat(document.getElementById("annualIncome").value);
  if (isNaN(income) || income <= 0) return alert("Enter valid income");

  let rate = 0;
  if (income <= 1200000) rate = 0;
  else if (income <= 1700000) rate = 6;
  else if (income <= 2200000) rate = 12;
  else if (income <= 2700000) rate = 18;
  else if (income <= 3200000) rate = 24;
  else if (income <= 3700000) rate = 30;
  else rate = 36;

  const tax = (income * rate) / 100;
  const net = income - tax;

  document.getElementById("incomeResult").innerHTML = `
    Tax Rate: ${rate}%<br>
    Tax Amount: Rs.${tax.toFixed(2)}<br>
    Net Income: Rs.${net.toFixed(2)}
  `;
}

//  SSCL Tax
function calcSSCL() {
  const val = parseFloat(document.getElementById("ssclValue").value);
  if (isNaN(val) || val <= 0) return alert("Enter valid value");

  const saleTax = val * 0.025;
  const afterSale = val + saleTax;
  const vat = afterSale * 0.15;
  const sscl = saleTax + vat;

  document.getElementById("ssclResult").innerHTML = `
    Sale Tax: Rs.${saleTax.toFixed(2)}<br>
    After Sale Tax: Rs.${afterSale.toFixed(2)}<br>
    VAT: Rs.${vat.toFixed(2)}<br>
    Final SSCL: Rs.${sscl.toFixed(2)}
  `;
}

//  Leasing
function calcLeasing() {
  const A = parseFloat(document.getElementById("loanAmount").value);
  const r = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
  const years = parseInt(document.getElementById("years").value);

  if (isNaN(A) || isNaN(r) || isNaN(years) || A <= 0 || r <= 0 || years > 5)
    return alert("Enter valid inputs: A>0, rate>0, years<=5");

  const n = years * 12;
  const emi = (A * r) / (1 - Math.pow(1 + r, -n));

  let compare = "";
  [3,4,5].forEach(y => {
    const n2 = y * 12;
    const emi2 = (A * r) / (1 - Math.pow(1 + r, -n2));
    compare += `${y}-Year Plan: Rs.${emi2.toFixed(2)} / month<br>`;
  });

  document.getElementById("leasingResult").innerHTML = `
    Monthly Installment: Rs.${emi.toFixed(2)}<br>
    ${compare}
  `;
}
