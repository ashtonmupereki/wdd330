//Initialize expense list and total amount
let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBttn = document.getElementById('add-button');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBttn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Hey pal, Please select a category');
        return
    }
    if(isNaN(amount) || amount <=0){
        alert('Hey pal, enter a valid amount')
        return;
    }
    if(date === ''){
        alert('Hey Pal, select the date')
        return;
    }
    expenses.push({category, amount, date});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense),1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense),1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
});

categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

window.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const loggedInMessage = document.getElementById('loggedInMessage');
    const usernameDisplay = document.getElementById('usernameDisplay');
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevents the form from submitting and refreshing the page
  
      const username = usernameInput.value;
      usernameDisplay.textContent = username;
  
      loginForm.style.display = 'none';
      loggedInMessage.style.display = 'block';
    });
  });

  // Initialize income and expense arrays
let incomeData = [];
let expenseData = [];

// Load data from localStorage (if available)
if (localStorage.getItem('incomeData')) {
  incomeData = JSON.parse(localStorage.getItem('incomeData'));
}

if (localStorage.getItem('expenseData')) {
  expenseData = JSON.parse(localStorage.getItem('expenseData'));
}

// Get references to HTML elements
const incomeForm = document.getElementById('incomeForm');
const incomeInput = document.getElementById('incomeInput');
const balanceAmount = document.getElementById('balanceAmount');

// Add event listener for income form submission
incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the entered income value
  const income = parseFloat(incomeInput.value);

  // Save the income to the income array
  incomeData.push(income);

  // Save the incomeData array to localStorage
  localStorage.setItem('incomeData', JSON.stringify(incomeData));

  // Display the income
  balanceAmount.textContent = `$${income}`;

  // Reset the income input field
  incomeInput.value = '';

  // Show the balance element
  balance.style.display = 'block';

  // Calculate and display the balance
  calculateBalance();
});

// Calculate and display the balance
function calculateBalance() {
  const expenseTable = document.getElementById('expense-table-body');
  const totalAmount = document.getElementById('total-amount');

  let totalExpense = 0;

  // Loop through each row in the expense table
  for (let i = 0; i < expenseTable.rows.length; i++) {
    const expenseAmount = parseFloat(expenseTable.rows[i].cells[1].textContent);
    totalExpense += expenseAmount;
  }

  // Calculate the balance
  const income = incomeData.reduce((total, income) => total + income, 0);
  const balance = income - totalExpense;

  // Display the balance
  balanceAmount.textContent = `US$${balance.toFixed(2)}`;
}

// Add event listener for expense form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Your existing code to add the expense

  // Save the expenseData array to localStorage
  localStorage.setItem('expenseData', JSON.stringify(expenseData));

  // Calculate and display the balance
  calculateBalance();
});

// Call the calculateBalance function initially to hide the balance element
calculateBalance();

// Get references to the menu icon and navigation menu
const menuIcon = document.querySelector('.menu-icon');
const navigationMenu = document.querySelector('.navigation-menu');

// Add event listener to toggle the visibility of the navigation menu
menuIcon.addEventListener('click', () => {
  navigationMenu.classList.toggle('show');
});