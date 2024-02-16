
// Initialize income and expense arrays
let incomeData = [];
let expenseData = [];

// Get references to HTML elements
const incomeForm = document.getElementById('incomeForm');
const incomeInput = document.getElementById('incomeInput');
const expenseForm = document.getElementById('expenseForm');
const expenseInput = document.getElementById('expenseInput');
const balanceAmount = document.getElementById('balanceAmount');
const pieChartCanvas = document.getElementById('pieChart');

// Add event listener for income form submission
incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the entered income value
  const income = parseFloat(incomeInput.value);

  // Save the income to the income array
  incomeData.push(income);

  // Calculate and display the balance
  calculateBalance();

  // Reset the income input field
  incomeInput.value = '';
});

// Add event listener for expense form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the entered expense value
  const expense = parseFloat(expenseInput.value);

  // Save the expense to the expense array
  expenseData.push(expense);

  // Calculate and display the balance
  calculateBalance();

  // Reset the expense input field
  expenseInput.value = '';
});

// Calculate and display the balance
function calculateBalance() {
  const totalIncome = incomeData.reduce((total, income) => total + income, 0);
  const totalExpense = expenseData.reduce((total, expense) => total + expense, 0);
  const balance = totalIncome - totalExpense;

  // Display the balance
  balanceAmount.textContent = `$${balance.toFixed(2)}`;

  // Update the pie chart
  updatePieChart();
}

// Update the pie chart
let chart; // Declare the chart variable outside the function

// Update the pie chart
function updatePieChart() {
  const totalIncome = incomeData.reduce((total, income) => total + income, 0);
  const totalExpense = expenseData.reduce((total, expense) => total + expense, 0);
  const remainingBalance = totalIncome - totalExpense;

  // Create the data for the pie chart
  const data = {
    labels: ['Expenses', 'Money Left'],
    datasets: [
      {
        data: [totalExpense, remainingBalance],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Check if the chart instance already exists
  if (chart) {
    // Update the existing chart with new data
    chart.data = data;
    chart.update();
  } else {
    // Create a new chart
    chart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Money Left in the Account',
        },
      },
    });
  }
}

// Call the calculateBalance function initially to update the balance and pie chart
calculateBalance();

(function() {
    // Get DOM elements
    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const addBtn = document.getElementById('add-btn');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmount = document.getElementById('total-amount');
  
    // Initialize expenses array
    let expenses = [];
  
    // Function to add expense
    function addExpense() {
      // Get user input values
      const category = categorySelect.value;
      const amount = parseFloat(amountInput.value);
      const date = dateInput.value;
  
      // Validate input
      if (!category || !amount || !date) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Create expense object
      const expense = { category, amount, date };
  
      // Add expense to array
      expenses.push(expense);
  
      // Clear input fields
      categorySelect.value = '';
      amountInput.value = '';
      dateInput.value = '';
  
      // Render expenses
      renderExpenses();
    }
  
    // Function to delete expense
    function deleteExpense(index) {
      // Remove expense from array
      expenses.splice(index, 1);
  
      // Render expenses
      renderExpenses();
    }
  
    // Function to render expenses
    function renderExpenses() {
      // Clear expense table body
      expenseTableBody.innerHTML = '';
  
      // Initialize total amount
      let total = 0;
  
      // Loop through expenses array
      expenses.forEach((expense, index) => {
        // Create table row
        const row = document.createElement('tr');
  
        // Create table cells
        const categoryCell = document.createElement('td');
        const amountCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const deleteCell = document.createElement('td');
  
        // Set cell values
        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
  
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteExpense(index));
  
        // Append cells to the row
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);
  
        // Append row to the table body
        expenseTableBody.appendChild(row);
  
        // Update total amount
        total += expense.amount;
      });
  
      // Update total amount display
      totalAmount.textContent = total.toFixed(2);
    }
  
    // Add event listener to Add button
    addBtn.addEventListener('click', addExpense);
  })();