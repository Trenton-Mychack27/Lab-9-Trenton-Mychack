const BASE_URL = "https://webhook-test.com/962f3e7cef1355dc2a3d5191fb29320d";

function validateFinances() {
    let isValid = true; // Assume valid unless an error occurs
    let financeError = document.getElementById("incomeError");
    financeError.textContent = ""; // Clear previous error messages

    const incomeSourceName = document.getElementById("incomeSource").value.trim();
    let incomeAmount = document.getElementById("incomeAmount").value.trim();

    // Validate income source
    if (incomeSourceName === "" || incomeSourceName.length < 3) {
        financeError.textContent = "Please enter a valid income source (at least 3 characters).";
        isValid = false;
    }

    // Validate income amount
    let amountNumber = parseFloat(incomeAmount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
        financeError.textContent = "Please enter a valid income amount greater than 0.";
        isValid = false;
    } else {
        document.getElementById("incomeAmount").value = amountNumber.toFixed(2); // Format input field
    }

    if (isValid) {
        submitRequest();
    }
}

function validateExpenses() {
    let isValid = true;
    let expenseError = document.getElementById("expenseError");
    expenseError.textContent = ""; // Clear previous error messages

    const placeOfExpense = document.getElementById("placeOfExpense").value.trim();
    let expenseDate = document.getElementById("expenseDate").value.trim();
    let expenseAmount = document.getElementById("expenseAmount").value.trim();

    // Validate place of expense
    if (placeOfExpense === "" || placeOfExpense.length < 3) {
        expenseError.textContent += " Please enter a valid place of expense (at least 3 characters).";
        isValid = false;
    }

    // Validate expense date (should not be in the future)
    if (expenseDate === "" || new Date(expenseDate) > new Date()) {
        expenseError.textContent += " Please enter a valid expense date.";
        isValid = false;
    }

    // Validate expense amount
    let amountNumber = parseFloat(expenseAmount);
    if (isNaN(amountNumber) || amountNumber < 0) {
        expenseError.textContent += " Please enter a valid expense amount.";
        isValid = false;
    }

    if (isValid) {
        submitRequest();
    }
}

function validateCheckPayment() {
    let isValid = true;
    let checkError = document.getElementById("checkError");
    checkError.textContent = ""; // Clear previous error messages

    let checkName = document.getElementById("nameOfCheck").value.trim();
    let checkDate = document.getElementById("checkDate").value.trim();
    let checkAmount = document.getElementById("checkAmount").value.trim();

    // Validate check name
    if (checkName === "" || checkName.length < 5) {
        checkError.textContent += " Please enter a valid check name (at least 5 characters).";
        isValid = false;
    }

    // Validate check date (should not be in the future)
    if (checkDate === "" || new Date(checkDate) > new Date()) {
        checkError.textContent += " Please enter a valid check date.";
        isValid = false;
    }

    // Validate check amount
    let amountNumber = parseFloat(checkAmount);
    if (isNaN(amountNumber) || amountNumber < 0) {
        checkError.textContent += " Please enter a valid check amount.";
        isValid = false;
    } else {
        document.getElementById("checkAmount").value = amountNumber.toFixed(2);
    }

    if (isValid) {
        submitRequest();
    }
}

// Form submission event listeners
document.getElementById("finance-input-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    validateFinances();
});

document.getElementById("expense-input-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    validateExpenses();
});

document.getElementById("check-payment-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    validateCheckPayment();
});

// Format income amount on blur/mouseout
document.getElementById("incomeAmount").addEventListener("blur", formatAmount);
document.getElementById("incomeAmount").addEventListener("mouseout", formatAmount);

function formatAmount() {
    let input = document.getElementById("incomeAmount");
    let value = parseFloat(input.value);
    if (!isNaN(value) && value > 0) {
        input.value = value.toFixed(2);
    }
}

function submitRequest() {
    makeRequest();
}

function makeRequest() {
    let url = BASE_URL;

    // Create a new FormData object (adjust field names based on actual use)
    let financeInputFormParams = new FormData(document.getElementById("finance-input-form"));
    let expenseInputFormParams = new FormData(document.getElementById("expense-input-form"));
    let checkPaymentFormParams = new FormData(document.getElementById("check-payment-form"));
    
    //financeInputFormParams.append("Income Source", incomeSource); // Replace with actual form field data

    // Send a POST request with the form data
    if (incomeSourceName != null) {
    fetch(url, { method: "POST", body: financeInputFormParams,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(statusCheck)
    .then(response => response.json()) // Convert the response to JSON
    .then(data => updateResults(data)) // Handle the response data
    .catch(handleError); // Handle errors

}
else if(placeOfExpense != null) {
    fetch(url, { method: "POST", body: expenseInputFormParams,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(statusCheck)
    .then(response => response.json()) // Convert the response to JSON
    .then(data => updateResults(data)) // Handle the response data
    .catch(handleError); // Handle errors
}
else if(nameOfCheck != null) {
    fetch(url, { method: "POST", body: checkPaymentFormParams,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(statusCheck)
    .then(response => response.json()) // Convert the response to JSON
    .then(data => updateResults(data)) // Handle the response data
    .catch(handleError); // Handle errors
}
}

// Helper function to update results (to be implemented)
function updateResults(data) {
    console.log("Response received:", data);
}

// Error handler function
function handleError(error) {
    console.error("Error:", error);
}

// Helper function to check response status
async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}