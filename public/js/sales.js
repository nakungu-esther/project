document.addEventListener('DOMContentLoaded', () => {
    const showCreditFormBtn = document.getElementById('showCreditFormBtn');
    const showSalesFormBtn = document.getElementById('showSalesFormBtn');
    const showProduceFormBtn = document.getElementById('showProduceFormBtn');
    const showUpdateStocksBtn = document.getElementById('showUpdateStockBtn');
    
    const creditFormContainer = document.getElementById('credit-form-container');
    const salesFormContainer = document.getElementById('sales-form-container');
    const produceFormContainer = document.getElementById('produce-form-container');
    const updateStockContainer = document.getElementById('update-stock-container');

    showCreditFormBtn.addEventListener('click', () => {
        creditFormContainer.style.display = 'block'; // Show credit form
        salesFormContainer.style.display = 'none';   // Hide sales form
        produceFormContainer.style.display = 'none'; // Hide produce form
        updateStockContainer.style.display = 'none'; // Hide update stock
    });

    showSalesFormBtn.addEventListener('click', () => {
        salesFormContainer.style.display = 'block';  // Show sales form
        creditFormContainer.style.display = 'none';   // Hide credit form
        produceFormContainer.style.display = 'none'; // Hide produce form
        updateStockContainer.style.display = 'none'; // Hide update stock
    });

    showProduceFormBtn.addEventListener('click', () => {
        produceFormContainer.style.display = 'block'; // Show produce form
        creditFormContainer.style.display = 'none';   // Hide credit form
        salesFormContainer.style.display = 'none';    // Hide sales form
        updateStockContainer.style.display = 'none';  // Hide update stock
    });

    showUpdateStocksBtn.addEventListener('click', () => {
        updateStockContainer.style.display = 'block'; // Show update stock
        creditFormContainer.style.display = 'none';   // Hide credit form
        salesFormContainer.style.display = 'none';    // Hide sales form
        produceFormContainer.style.display = 'none';  // Hide produce form
    });




    // Example of handling form submission with validation for produce form
    const form = document.getElementById('produce-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Produce entry request submitted successfully!');
    });

    // Helper function to show error
    function showError(inputId, errorId, message) {
        document.getElementById(errorId).textContent = message;
        document.getElementById(errorId).style.display = 'block';
        isValid = false;
    }


        // Clear previous errors
        const errorElements = document.querySelectorAll('span[id$="-error"]');
        errorElements.forEach(el => el.style.display = 'none');

        // Validate Buyer's Name
        const buyerName = document.getElementById('credit-buyer-name').value;
        if (!/^[a-zA-Z0-9]{2,}$/.test(buyerName)) {
            showError('credit-buyer-name', 'credit-buyer-name-error', 'Name must be alphanumeric and at least 2 characters long');
        }

        // Validate National ID (NIN)
        const nin = document.getElementById('nin').value;
        if (!/^[A-Z0-9]{7,}$/.test(nin)) { // Adjust regex for NIN format
            showError('nin', 'nin-error', 'Invalid National ID format');
        }

        // Validate Location
        const location = document.getElementById('location').value;
        if (!/^[a-zA-Z0-9\s]{2,}$/.test(location)) {
            showError('location', 'location-error', 'Location must be alphanumeric and at least 2 characters long');
        }

        // Validate Contact
        const contact = document.getElementById('contact').value;
        if (!/^\+?\d{10,15}$/.test(contact)) { // Adjust regex for phone number format
            showError('contact', 'contact-error', 'Invalid phone number format');
        }

        // Validate Amount Due
        const amountDue = document.getElementById('amount-due').value;
        if (amountDue.length < 5) {
            showError('amount-due', 'amount-due-error', 'Amount Due must be at least 5 characters long');
        }

        // Validate Sales Agent's Name
        const agentName = document.getElementById('credit-agent-name').value;
        if (!/^[a-zA-Z0-9]{2,}$/.test(agentName)) {
            showError('credit-agent-name', 'credit-agent-name-error', 'Sales Agent\'s Name must be alphanumeric and at least 2 characters long');
        }

        // Validate Produce Name
        const produceName = document.getElementById('produce').value;
        if (!/^[a-zA-Z0-9\s]+$/.test(produceName)) {
            showError('produce', 'produce-error', 'Produce Name must be alphanumeric and not empty');
        }

        // Validate Other Fields (Type of Produce, Tonnage, Date of Dispatch)
        // These fields are usually simpler but you can add validation if needed.

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }


    });

//displays forms



function clearForm(){
    document.getElementById("form").reset();
 
    

}

 