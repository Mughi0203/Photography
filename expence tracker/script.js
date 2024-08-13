let budget = 0;
let expenses = [];
nse
function addExpense() {
    const description = document.getElementById('expenseDescription').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please provide valid expense details.');
        return;
    }

    const expense = { description, amount, category };
    expenses.push(expense);
    updateUI();
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}


function setBudget() {
    const inputBudget = parseFloat(document.getElementById('budgetInput').value);
    if (isNaN(inputBudget) || inputBudget <= 0) {
        alert('Please provide a valid budget.');
        return;
    }
    budget = inputBudget;
    updateUI();
}


function updateUI() {

    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description} - ₹${expense.amount.toFixed(2)} (${expense.category})</span>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
        expenseList.appendChild(li);
    });


    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = budget - totalExpenses;
    document.getElementById('totalExpenses').textContent = `Total Expenses: ₹${totalExpenses.toFixed(2)}`;
    document.getElementById('remainingBudget').textContent = `Remaining Budget: ₹${remainingBudget.toFixed(2)}`;
}


function loadFromLocalStorage() {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const savedBudget = parseFloat(localStorage.getItem('budget')) || 0;

    expenses = savedExpenses;
    budget = savedBudget;
    updateUI();
}

function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('budget', budget);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    window.addEventListener('beforeunload', saveToLocalStorage);
});
