document.addEventListener('DOMContentLoaded', () => {
    const showCreditFormBtn = document.getElementById('showCreditFormBtn');
    const showSalesFormBtn = document.getElementById('showSalesFormBtn');
    const showProduceFormBtn = document.getElementById('showProduceFormBtn');
   
    
    const creditFormContainer = document.getElementById('credit-form-container');
    const salesFormContainer = document.getElementById('sales-form-container');
    const produceFormContainer = document.getElementById('produce-form-container');
    

    showCreditFormBtn.addEventListener('click', () => {
        creditFormContainer.style.display = 'block'; // Show credit form
        salesFormContainer.style.display = 'none';   // Hide sales form
        produceFormContainer.style.display = 'none'; // Hide produce form
      
    });

    showSalesFormBtn.addEventListener('click', () => {
        salesFormContainer.style.display = 'block';  // Show sales form
        creditFormContainer.style.display = 'none';   // Hide credit form
        produceFormContainer.style.display = 'none'; // Hide produce form
       
    });

    showProduceFormBtn.addEventListener('click', () => {
        produceFormContainer.style.display = 'block'; // Show produce form
        creditFormContainer.style.display = 'none';   // Hide credit form
        salesFormContainer.style.display = 'none';    // Hide sales form
     
    });
    // Example of handling form submission with validation for produce form
    const form = document.getElementById('produce-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Produce entry request submitted successfully!');
    });

    // Helper function to show error
    // Function to validate alphanumeric fields
function isValidAlphanumeric(input, minLength = 2) {
    const alphanumericPattern = /^[a-zA-Z0-9\s]+$/;
    return input.length >= minLength && alphanumericPattern.test(input);
}

// Function to validate numeric fields
function isValidNumeric(input, minLength = 5) {
    return input.length >= minLength && !isNaN(input);
}

// Function to validate phone number format
function isValidPhoneNumber(input) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(input);
}

// Function to validate NIN format (example pattern)
function isValidNIN(input) {
    const ninPattern = /^[A-Z0-9]{14}$/; // Adjust pattern according to your NIN format
    return ninPattern.test(input);
}

// Function to clear the form fields
function clearForm(formId) {
    document.getElementById(formId).reset();
}


// Sales Form Validation
document.getElementById('sales-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const produceName = document.getElementById('produce-name').value.trim();
    const tonnage = document.getElementById('tonnage').value.trim();
    const amountPaid = document.getElementById('amount-paid').value.trim();
    const buyerName = document.getElementById('buyer-name').value.trim();
    const agentName = document.getElementById('agent-name').value.trim();

    if (!isValidAlphanumeric(produceName)) {
        alert("Produce Name must be alphanumeric and at least 2 characters long.");
        return;
    }

    if (!isValidNumeric(tonnage, 3)) {
        alert("Tonnage must be numeric and at least 3 characters long.");
        return;
    }

    if (!isValidNumeric(amountPaid)) {
        alert("Amount Paid must be numeric and at least 5 characters long.");
        return;
    }

    if (!isValidAlphanumeric(buyerName)) {
        alert("Buyer's Name must be alphanumeric and at least 2 characters long.");
        return;
    }

    if (!isValidAlphanumeric(agentName)) {
        alert("Sales Agent's Name must be alphanumeric and at least 2 characters long.");
        return;
    }

    alert("Sales recorded successfully!");
    clearForm('sales-form');
});

// Credit Sales Form Validation
document.getElementById('credit-sales-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const creditBuyerName = document.getElementById('credit-buyer-name').value.trim();
    const nin = document.getElementById('nin').value.trim();
    const location = document.getElementById('location').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const amountDue = document.getElementById('amount-due').value.trim();
    const creditAgentName = document.getElementById('credit-agent-name').value.trim();
    const produce = document.getElementById('produce').value.trim();

    if (!isValidAlphanumeric(creditBuyerName)) {
        alert("Credit Buyer's Name must be alphanumeric and at least 2 characters long.");
        return;
    }

    if (!isValidNIN(nin)) {
        alert("National ID (NIN) must be valid.");
        return;
    }

    if (!isValidAlphanumeric(location)) {
        alert("Location must be alphanumeric and at least 2 characters long.");
        return;
    }

    if (!isValidPhoneNumber(contact)) {
        alert("Contact must be a valid phone number.");
        return;
    }

    if (!isValidNumeric(amountDue)) {
        alert("Amount Due must be numeric and at least 5 characters long.");
        return;
    }

    if (!isValidAlphanumeric(creditAgentName)) {
        alert("Sales Agent's Name must be alphanumeric and at least 2 characters long.");
        return;
    }

    if (!isValidAlphanumeric(produce)) {
        alert("Produce Name must be alphanumeric and at least 2 characters long.");
        return;
    }

  
    alert("Credit sale recorded successfully!");
    clearForm('credit-sales-form');
});


 });
